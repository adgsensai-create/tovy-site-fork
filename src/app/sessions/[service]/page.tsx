import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ScrollReveal";
import { getService, services, dynamicServiceSlugs } from "@/lib/services";
import { locationPages } from "@/lib/locations";
import { getShootBySlug } from "@/lib/gallery-data";
import { site, serviceAreaNames, faqJsonLd, breadcrumbJsonLd } from "@/lib/site";

interface Props {
  params: Promise<{ service: string }>;
}

export function generateStaticParams() {
  return dynamicServiceSlugs.map((service) => ({ service }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { service } = await params;
  const data = getService(service);
  if (!data || data.hasOwnPage) return {};
  const url = `${site.url}/sessions/${service}`;
  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${data.title} | ${site.name}`,
      description: data.description,
      url,
      images: [{ url: data.heroImage }],
    },
  };
}

function proofImage(href: string): string | null {
  const parts = href.split("/");
  const shoot = getShootBySlug(parts[2], parts[3]);
  return shoot?.coverImage || shoot?.images?.[0]?.src || null;
}

export default async function ServicePage({ params }: Props) {
  const { service } = await params;
  const data = getService(service);
  if (!data || data.hasOwnPage) notFound();

  const url = `${site.url}/sessions/${service}`;
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.h1,
    serviceType: data.serviceType,
    url,
    description: data.description,
    provider: {
      "@type": ["LocalBusiness", "Photographer"],
      "@id": `${site.url}/#business`,
      name: site.name,
      url: site.url,
      telephone: site.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.locality,
        addressRegion: site.region,
        addressCountry: site.country,
      },
      priceRange: site.priceRange,
    },
    areaServed: serviceAreaNames.map((name) => ({ "@type": "City", name })),
    offers:
      service === "bar-mitzvah-photography"
        ? undefined
        : {
            "@type": "Offer",
            priceCurrency: "USD",
            price: String(site.pricing.mini),
            description: "Sessions start at the mini session price.",
          },
  };
  const faq = faqJsonLd(data.faqs);
  const crumbs = breadcrumbJsonLd([
    { name: "Home", url: site.url },
    { name: "Sessions and Pricing", url: `${site.url}/sessions` },
    { name: data.h1, url },
  ]);
  const otherServices = Object.values(services).filter((s) => s.slug !== service);
  const towns = Object.values(locationPages);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
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
      <section className="pt-28 md:pt-32 pb-12 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl grid gap-10 md:grid-cols-2 items-center">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-charcoal/60">
              {data.eyebrow}
            </p>
            <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-6xl mb-5 text-charcoal">
              {data.h1}
            </h1>
            <p className="text-lg text-charcoal-light leading-relaxed mb-8">
              {data.tagline}
            </p>
            <Link
              href="/contact"
              className="inline-block bg-charcoal px-8 py-3 text-sm font-medium tracking-wider uppercase text-white transition-colors hover:bg-sage-dark"
            >
              {data.cta.button}
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-[#D5D0CB]">
            <Image
              src={data.heroImage}
              alt={data.heroAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={80}
            />
          </div>
        </div>
      </section>

      {/* Intro sections */}
      <section className="px-6 py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-14">
          {data.intro.map((block, i) => (
            <ScrollReveal key={i} animation="fade-up">
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-6 text-charcoal">
                {block.heading}
              </h2>
              <div className="space-y-5 text-charcoal-light leading-relaxed">
                {block.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Includes */}
      {data.includes && (
        <section className="bg-white px-6 py-16 md:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-8 text-charcoal">
              {data.includes.heading}
            </h2>
            <ul className="space-y-4">
              {data.includes.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-charcoal-light leading-relaxed">
                  <svg className="mt-1.5 h-4 w-4 shrink-0 text-sage" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    <strong className="font-semibold text-charcoal">{item.label}:</strong>{" "}
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Why */}
      <section className="px-6 py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-8 text-charcoal">
            {data.why.heading}
          </h2>
          <ul className="space-y-6">
            {data.why.items.map((item, i) => (
              <li key={i} className="border-l-2 border-sage pl-5">
                <p className="text-charcoal leading-relaxed">
                  <strong className="font-semibold">{item.title}</strong> {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-rose/15 px-6 py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-6 text-charcoal">
            {data.pricing.heading}
          </h2>
          <p className="text-charcoal-light leading-relaxed mb-6">{data.pricing.text}</p>
          <Link
            href="/sessions"
            className="inline-block border border-charcoal px-6 py-3 text-sm font-medium tracking-wider uppercase text-charcoal transition-colors hover:bg-charcoal hover:text-white"
          >
            View Full Pricing
          </Link>
        </div>
      </section>

      {/* Proof */}
      <section className="px-6 py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-10 text-center text-charcoal">
            Recent sessions
          </h2>
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

      {/* FAQ */}
      <section className="bg-white px-6 py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-10 text-charcoal">
            Common questions about {data.h1.toLowerCase()}
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

      {/* Areas + related */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-10">
          <div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl mb-4 text-charcoal">
              Where I photograph
            </h2>
            <div className="flex flex-wrap gap-3">
              {towns.map((t) => (
                <Link
                  key={t.slug}
                  href={`/locations/${t.slug}`}
                  className="border border-charcoal/15 px-4 py-2 text-sm text-charcoal hover:border-sage hover:text-sage-dark transition-colors"
                >
                  {t.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-2xl mb-4 text-charcoal">
              Keep exploring
            </h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {data.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="text-sage-dark hover:text-charcoal transition-colors">
                    {r.label}
                  </Link>
                </li>
              ))}
              {otherServices.map((s) => (
                <li key={s.slug}>
                  <Link href={`/sessions/${s.slug}`} className="text-sage-dark hover:text-charcoal transition-colors">
                    {s.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-rose px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl mb-6 text-charcoal">
            {data.cta.heading}
          </h2>
          <p className="text-charcoal/80 mb-8 leading-relaxed">{data.cta.text}</p>
          <Link
            href="/contact"
            className="inline-block bg-charcoal px-8 py-3 text-sm font-medium tracking-wider uppercase text-white transition-colors hover:bg-white hover:text-charcoal"
          >
            {data.cta.button}
          </Link>
        </div>
      </section>
    </>
  );
}
