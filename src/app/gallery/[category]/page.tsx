import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import PlaceholderImage from "@/components/PlaceholderImage";
import { getShootsByCategory, categories } from "@/lib/gallery-data";

interface Props {
  params: Promise<{ category: string }>;
}

const categoryMeta: Record<
  string,
  { title: string; description: string; h1: string; intro: string }
> = {
  family: {
    title: "Family Photography Gallery — Skokie IL Family Photographer",
    description:
      "Browse family photography sessions by Tovy Photography. Natural, playful family portraits in Skokie, IL and Chicago's North Shore.",
    h1: "Family Photography",
    intro:
      "Real connections, real laughter, real love. Family sessions designed to capture your family exactly as you are.",
  },
  newborn: {
    title: "Newborn Photography Gallery — In-Home Newborn Sessions",
    description:
      "Gentle, natural newborn photography by Tovy Photography. In-home sessions in Skokie, IL capturing the first days with your new baby.",
    h1: "Newborn Photography",
    intro:
      "The tiniest toes, the softest yawns, the way they curl into you. Celebrating new life with calm, gentle photography.",
  },
  milestone: {
    title: "Milestone Photography Gallery — Maternity, Birthdays & More",
    description:
      "Milestone photography by Tovy Photography. Maternity, first birthdays, graduations, and more in Skokie, IL and Chicago's North Shore.",
    h1: "Milestone Photography",
    intro:
      "From maternity glow to first birthdays to graduations — every milestone deserves to be captured beautifully.",
  },
  event: {
    title: "Event Photography Gallery — Bar Mitzvahs, Celebrations & More",
    description:
      "Event photography by Tovy Photography. Bar Mitzvahs, celebrations, and special occasions captured with joy and authenticity.",
    h1: "Event Photography",
    intro:
      "The energy, the emotions, the details that make your event unforgettable. Relaxed, fun event photography for any occasion.",
  },
};

export async function generateStaticParams() {
  return categories.map((cat) => ({
    category: cat.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const meta = categoryMeta[category];
  if (!meta) return {};

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://tovyphotography.com/gallery/${category}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://tovyphotography.com/gallery/${category}`,
    },
  };
}

export default async function GalleryCategoryPage({ params }: Props) {
  const { category } = await params;
  const meta = categoryMeta[category];
  if (!meta) notFound();

  const shoots = getShootsByCategory(category);

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl">
          <nav className="mb-8 text-sm text-charcoal-light">
            <Link href="/gallery" className="hover:text-charcoal transition-colors">
              Gallery
            </Link>
            <span className="mx-2">›</span>
            <span className="text-charcoal">{meta.h1}</span>
          </nav>
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-6xl mb-6 text-charcoal">
            {meta.h1}
          </h1>
          <p className="text-charcoal-light text-lg leading-relaxed max-w-xl mx-auto">
            {meta.intro}
          </p>
        </div>
      </section>

      {/* Shoots Grid */}
      <section className="px-6 pb-20 md:pb-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {shoots.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-charcoal-light text-lg">
                Sessions coming soon. Check back!
              </p>
            </div>
          ) : (
            <div className="grid gap-10 md:grid-cols-2">
              {shoots.map((shoot) => (
                <Link
                  key={shoot.slug}
                  href={`/gallery/${category}/${shoot.slug}`}
                  className="group"
                >
                  {/* Cover Image */}
                  <div className="relative aspect-[3/4] overflow-hidden mb-5">
                    {shoot.coverImage ? (
                      <Image
                        src={shoot.coverImage}
                        alt={`${shoot.title} — ${meta.h1} by Tovy Photography`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={80}
                        priority
                      />
                    ) : (
                      <PlaceholderImage
                        alt={`${shoot.title} — ${meta.h1}`}
                        className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
                        label={shoot.title}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                  </div>

                  {/* Shoot Info */}
                  <h2 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-charcoal mb-2 group-hover:text-sage-dark transition-colors">
                    {shoot.title}
                  </h2>
                  <p className="text-charcoal-light text-sm leading-relaxed">
                    {shoot.description}
                  </p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-wider text-sage">
                    View Session · {shoot.images.length} photos →
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Other categories */}
      <section className="bg-white px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl mb-8 text-charcoal">
            Explore More
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories
              .filter((c) => c.toLowerCase() !== category)
              .map((cat) => (
                <Link
                  key={cat}
                  href={`/gallery/${cat.toLowerCase()}`}
                  className="border border-charcoal/20 px-6 py-2 text-sm uppercase tracking-wider text-charcoal hover:bg-charcoal hover:text-white transition-all"
                >
                  {cat}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl mb-6 text-charcoal">
            Ready to book?
          </h2>
          <Link
            href="/contact"
            className="inline-block border border-sage bg-sage px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-sage-dark hover:border-sage-dark"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
