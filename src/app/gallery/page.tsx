import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllShoots, categories } from "@/lib/gallery-data";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Gallery — Family, Newborn & Event Photography Portfolio",
  description:
    "Browse the Tovy Photography portfolio. Family, newborn, milestone, and event photography in Skokie, IL and Chicago's North Shore. See real sessions and real moments.",
  alternates: {
    canonical: "https://tovyphotography.com/gallery",
  },
  openGraph: {
    title: "Gallery — Tovy Photography",
    description:
      "Explore our portfolio of family, newborn, milestone, and event photography sessions.",
    url: "https://tovyphotography.com/gallery",
  },
};

export default function GalleryPage() {
  const allShoots = getAllShoots();

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-6xl mb-6 text-charcoal">
            Gallery
          </h1>
          <p className="text-charcoal-light text-lg leading-relaxed mb-8">
            Every session tells a unique story. Browse through real moments from
            families who trusted me to capture their most meaningful memories.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/gallery/${cat.toLowerCase()}`}
                className="border border-charcoal/20 px-4 py-2 text-charcoal hover:bg-charcoal hover:text-white transition-all uppercase tracking-wider"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Shoots */}
      <section className="px-6 pb-20 md:pb-32 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {allShoots.map((shoot, index) => (
              <ScrollReveal key={shoot.slug} animation="fade-up" delay={(index % 3) * 100}>
                <Link
                  href={`/gallery/${shoot.category.toLowerCase()}/${shoot.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[3/4] overflow-hidden mb-4">
                    <Image
                      src={shoot.coverImage!}
                      alt={`${shoot.title} — ${shoot.category} Photography by Tovy Photography`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={80}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                  </div>
                  <p className="text-xs font-medium uppercase tracking-wider text-sage mb-1">
                    {shoot.category}
                  </p>
                  <h2 className="font-[family-name:var(--font-cormorant)] text-xl md:text-2xl text-charcoal group-hover:text-sage-dark transition-colors">
                    {shoot.title}
                  </h2>
                  <p className="text-charcoal-light text-sm mt-1">
                    {shoot.description}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sage/10 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal animation="scale-in">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl mb-6 text-charcoal">
              Love what you see?
            </h2>
            <p className="mb-8 text-charcoal-light">
              Let&apos;s create something beautiful for your family.
            </p>
            <Link
              href="/contact"
              className="inline-block border border-sage bg-sage px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-sage-dark hover:border-sage-dark"
            >
              Book Your Session
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
