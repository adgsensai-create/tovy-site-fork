import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocation, locationPages, locationSlugs } from "@/lib/locations";
import { services } from "@/lib/services";
import { getShootBySlug } from "@/lib/gallery-data";
import {
  site,
  localBusinessJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
} from "@/lib/site";

interface Props {
  params: Promise<{ location: string }>;
}

const heroImages: Record<string, string> = {
  skokie: "/photos/glickman-family/05-family-walking-plaza.jpg",
  evanston: "/photos/family-walking-playful.jpg",
  lincolnwood: "/photos/kids-kiss-couch.jpg",
  wilmette: "/photos/family-plaza-swinging.jpg",
  "west-rogers-park": "/photos/west-rogers-park-9-month-family/cover-home.jpg",
};
const defaultHero = "/photos/hero-family-baby-smile.jpg";

export function generateStaticParams() {
  return locationSlugs.map((location) => ({ location }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { location } = await params;
  const data = getLocation(location);
  if (!data) return {};
  const url = `${site.url}/locations/${location}`;
  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${data.title} | ${site.name}`,
      description: data.description,
      url,
      images: [{ url: heroImages[location] || defaultHero }],
    },
  };
}

function proofImage(href: string): string | null {
  const parts = href.split("/");
  const category = parts[2];
  const slug = parts[3];
  const shoot = getShootBySlug(category, slug);
  return shoot?.coverImage || shoot?.images?.[0]?.src || null;
}

export default async function LocationPage({ params }: Props) {
  const { location } = await params;
  const data = getLocation(location);
  if (!data) notFound();

  const url = `${site.url}/locations/${location}`;
  const business = localBusinessJsonLd({
    "@id": undefined,
    url,
    description: `Family, newborn, maternity and milestone photographer serving ${data.name}, IL. Natural light sessions at home or on location.`,
    areaServed: {
      "@type": "City",
      name: data.name,
      containedInPlace: { "@type": "State", name: "Illinois" },
    },
  });
  const faq = faqJsonLd(data.faqs);
  const crumbs = breadcrumbJsonLd([
    { name: "Home", url: site.url },
    { name: "Locations", url: `${site.url}/locations/${location}` },
    { name: data.name, url },
  ]);
  const hero = heroImages[location] || defaultHero;
  const serviceList = Object.values(services);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden bg-[#D5D0CB]">
        <Image
          src={hero}
          alt={`${data.name} family photographer, natural light family session by Tovy Photography`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={80}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full items-end pb-12 px-6">
          <div className="mx-auto max-w-7xl w-full">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-white/80">
              {data.name}, Illinois
            </p>
            <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-6xl text-white">
              {data.h1}
            </h1>
            <p className="mt-4 text-sm text-white/80">{data.driveNote}</p>
          </div>
        </div>
      </section>

      {/* Intro + body */}
      <section className="px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-4 text-lg md:text-xl leading-relaxed text-charcoal">
            {data.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-10 space-y-6 text-charcoal-light leading-relaxed">
            {data.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-block bg-charcoal px-8 py-3 text-sm font-medium tracking-wider uppercase text-white transition-colors hover:bg-sage-dark"
            >
              Book a {data.name} Session
            </Link>
            <Link
              href="/sessions"
              className="inline-block border border-charcoal px-8 py-3 text-sm font-medium tracking-wider uppercase text-charcoal transition-colors hover:bg-charcoal hover:text-white"
            >
              Sessions and Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* What makes it work */}
      <section className="bg-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-8 text-charcoal">
            What makes family photos in {data.name} work
          </h2>
          <ul className="space-y-6">
            {data.why.map((item, i) => (
              <li key={i} className="border-l-2 border-sage pl-5">
                <p className="text-charcoal leading-relaxed">
                  <strong className="font-semibold">{item.title}</strong>{" "}
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Proof */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-3 text-center text-charcoal">
            Recent sessions nearby
          </h2>
          <p className="text-center text-charcoal-light mb-12">
            Real families, real homes and parks in and around {data.name}.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            {data.proof.map((item) => {
              const img = proofImage(item.href);
              return (
                <Link key={item.href} href={item.href} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#D5D0CB]">
                    {img && (
                      <Image
                        src={img}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        quality={75}
                      />
                    )}
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-cormorant)] text-2xl text-charcoal group-hover:text-sage-dark transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-charcoal-light">{item.blurb}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-10 text-center text-charcoal">
            Photography sessions in {data.name}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceList.map((svc) => (
              <Link
                key={svc.slug}
                href={`/sessions/${svc.slug}`}
                className="block border border-charcoal/10 p-6 transition-colors hover:border-sage"
              >
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl mb-2 text-charcoal">
                  {svc.shortName}
                </h3>
                <p className="text-sm text-charcoal-light leading-relaxed">
                  {svc.cardBlurb.replace("{town}", data.name)}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Landmarks */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl mb-6 text-charcoal">
            Popular photo locations in {data.name}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {data.landmarks.map((landmark, i) => (
              <li key={i} className="flex items-center gap-2 text-charcoal-light">
                <svg className="h-4 w-4 shrink-0 text-sage" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                {landmark}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-10 text-charcoal">
            {data.name} family photos, answered
          </h2>
          <div className="space-y-8">
            {data.faqs.map((f, i) => (
              <div key={i}>
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl mb-2 text-charcoal">
                  {f.question}
                </h3>
                <p className="text-charcoal-light leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl mb-4 text-charcoal">
            Also serving nearby
          </h2>
          <div className="flex flex-wrap gap-3">
            {data.nearby.map((slug) => {
              const n = locationPages[slug];
              if (!n) return null;
              return (
                <Link
                  key={slug}
                  href={`/locations/${slug}`}
                  className="border border-charcoal/15 px-4 py-2 text-sm text-charcoal hover:border-sage hover:text-sage-dark transition-colors"
                >
                  {n.name} Family Photographer
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-rose px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl mb-6 text-charcoal">
            Ready to book your {data.name} session?
          </h2>
          <p className="text-charcoal/80 mb-8 leading-relaxed">
            Tell me about your family and what kind of session feels right. I will
            suggest a time, a location and a package. Sessions start at $
            {site.pricing.mini}.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-charcoal px-8 py-3 text-sm font-medium tracking-wider uppercase text-white transition-colors hover:bg-white hover:text-charcoal"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
