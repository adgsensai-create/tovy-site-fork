import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { site, breadcrumbJsonLd } from "@/lib/site";
import PlaceholderImage from "@/components/PlaceholderImage";
import { getAllShoots, getShootBySlug, getShootsByCategory } from "@/lib/gallery-data";

interface Props {
  params: Promise<{ category: string; slug: string }>;
}

const categoryLabels: Record<string, string> = {
  family: "Family Photography",
  newborn: "Newborn Photography",
  milestone: "Milestone Photography",
  event: "Event Photography",
};

export async function generateStaticParams() {
  return getAllShoots().map((shoot) => ({
    category: shoot.category.toLowerCase(),
    slug: shoot.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params;
  const shoot = getShootBySlug(category, slug);
  if (!shoot) return {};

  const title = {
    absolute: shoot.title.length > 45 ? shoot.title : `${shoot.title} | Tovy Photography`,
  };
  const description =
    shoot.description.length > 155
      ? shoot.description.slice(0, shoot.description.lastIndexOf(" ", 152)) + "."
      : shoot.description;

  return {
    title,
    description,
    alternates: {
      canonical: `https://tovyphotography.com/gallery/${category}/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://tovyphotography.com/gallery/${category}/${slug}`,
      ...(shoot.coverImage && { images: [shoot.coverImage] }),
    },
  };
}

export default async function ShootPage({ params }: Props) {
  const { category, slug } = await params;
  const shoot = getShootBySlug(category, slug);
  if (!shoot) notFound();

  const categoryShoots = getShootsByCategory(category);
  const currentIndex = categoryShoots.findIndex((s) => s.slug === slug);
  const prevShoot = currentIndex > 0 ? categoryShoots[currentIndex - 1] : null;
  const nextShoot =
    currentIndex < categoryShoots.length - 1
      ? categoryShoots[currentIndex + 1]
      : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: shoot.title,
    description: shoot.description,
    url: `https://tovyphotography.com/gallery/${category}/${slug}`,
    author: {
      "@type": "Person",
      name: "Gabi Tovy",
    },
    provider: {
      "@type": "Organization",
      name: "Tovy Photography",
    },
  };

  const serviceHref: Record<string, string> = {
    family: "/sessions/family-photography",
    newborn: "/sessions/newborn-photography",
    milestone: "/sessions/milestone-photography",
    event: "/sessions/bar-mitzvah-photography",
  };
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", url: site.url },
    { name: "Gallery", url: `${site.url}/gallery` },
    { name: categoryLabels[category] || category, url: `${site.url}/gallery/${category}` },
    { name: shoot.title, url: `${site.url}/gallery/${category}/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* Header */}
      <section className="pt-32 pb-12 px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl">
          <nav className="mb-8 text-sm text-charcoal-light">
            <Link href="/gallery" className="hover:text-charcoal transition-colors">
              Gallery
            </Link>
            <span className="mx-2">›</span>
            <Link
              href={`/gallery/${category}`}
              className="hover:text-charcoal transition-colors"
            >
              {categoryLabels[category] || category}
            </Link>
            <span className="mx-2">›</span>
            <span className="text-charcoal">{shoot.title}</span>
          </nav>
          <h1 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl lg:text-6xl mb-4 text-charcoal">
            {shoot.title}
          </h1>
          <p className="text-charcoal-light text-base md:text-lg">
            {shoot.description}
          </p>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="px-6 pb-20 md:pb-32 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="columns-1 md:columns-2 gap-4 md:gap-6">
            {shoot.images.map((image, i) => (
              <div key={i} className="mb-4 md:mb-6 break-inside-avoid">
                {image.src ? (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1200}
                    height={1600}
                    className="w-full h-auto"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                    priority={i === 0}
                  />
                ) : (
                  <div className="aspect-[4/5] bg-[#E0E0E0] flex items-center justify-center">
                    <span className="text-xs text-[#999] uppercase tracking-wider">
                      {image.label || `Photo ${i + 1}`}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Context */}
      <section className="bg-white px-6 py-14 lg:px-8">
        <div className="mx-auto max-w-3xl text-charcoal-light leading-relaxed">
          <p>
            This {(categoryLabels[category] || category).toLowerCase()} session was photographed
            by Tovy Photography, a natural light photographer based in Skokie, IL serving
            Chicago&apos;s North Shore. Sessions like this one start at $200 and include
            professionally edited images with full print rights.{" "}
            <Link href={serviceHref[category] || "/sessions"} className="text-sage-dark hover:text-charcoal">
              See how {(categoryLabels[category] || category).toLowerCase()} sessions work
            </Link>
            , or{" "}
            <Link href="/contact" className="text-sage-dark hover:text-charcoal">
              get in touch
            </Link>{" "}
            to plan your own.
          </p>
        </div>
      </section>

      {/* Prev/Next Shoot Navigation */}
      {(prevShoot || nextShoot) && (
        <section className="px-6 pb-16 lg:px-8">
          <div className="mx-auto max-w-6xl border-t border-charcoal/10 pt-10 grid grid-cols-2 gap-8">
            {prevShoot ? (
              <Link
                href={`/gallery/${category}/${prevShoot.slug}`}
                className="group"
              >
                <p className="text-xs uppercase tracking-wider text-charcoal-light mb-2">
                  ← Previous Session
                </p>
                <p className="font-[family-name:var(--font-cormorant)] text-xl md:text-2xl text-charcoal group-hover:text-sage-dark transition-colors">
                  {prevShoot.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {nextShoot ? (
              <Link
                href={`/gallery/${category}/${nextShoot.slug}`}
                className="group text-right"
              >
                <p className="text-xs uppercase tracking-wider text-charcoal-light mb-2">
                  Next Session →
                </p>
                <p className="font-[family-name:var(--font-cormorant)] text-xl md:text-2xl text-charcoal group-hover:text-sage-dark transition-colors">
                  {nextShoot.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#E8D5CE]/30 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl mb-4 text-charcoal">
            Love what you see?
          </h2>
          <p className="text-charcoal-light mb-8">
            I&apos;d love to create something like this for your family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block border border-charcoal bg-charcoal px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-charcoal"
            >
              Book Your Session
            </Link>
            <Link
              href={`/gallery/${category}`}
              className="inline-block border border-charcoal/30 px-8 py-3 text-sm font-medium uppercase tracking-widest text-charcoal transition-all hover:border-charcoal"
            >
              Back to {categoryLabels[category] || "Gallery"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
