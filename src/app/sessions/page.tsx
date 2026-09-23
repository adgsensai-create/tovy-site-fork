import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Sessions and Pricing",
  description:
    "Family, newborn, maternity, milestone, mini session and event photography from $200. In-home and on-location sessions in Skokie and the North Shore.",
  alternates: {
    canonical: "https://tovyphotography.com/sessions",
  },
  openGraph: {
    title: "Sessions & Pricing — Tovy Photography",
    description:
      "Photography packages starting at $200. Family, newborn, milestone, and event sessions in Skokie, IL.",
    url: "https://tovyphotography.com/sessions",
  },
};

const sessions: {
  name: string;
  description: string;
  alt: string;
  src: string;
  learnMoreHref?: string;
  learnMoreLabel?: string;
}[] = [
  {
    name: "Newborn Session",
    description:
      "I'll come right to your door so you can stay cozy with your new little one. No packing up the diaper bag, no stress. Just calm, gentle, naturally guided moments — all the tiny details and deep love you'll want to remember forever.",
    alt: "In-home newborn photographer Skokie IL — peaceful sleeping baby with headband in natural light",
    src: "/photos/newborn-sleeping-headband.jpg",
    learnMoreHref: "/sessions/newborn-photography",
  },
  {
    name: "Family Session",
    description:
      "I'll come to you — at home in Skokie, at a favorite park in Evanston, wherever your family feels most like yourselves. Expect gentle guidance, a lot of laughing, and real connection captured in natural light.",
    alt: "Skokie family photographer — parents swinging toddler on brick plaza during outdoor family session",
    src: "/photos/family-plaza-swinging.jpg",
    learnMoreHref: "/sessions/family-photography",
  },
  {
    name: "Milestone Session",
    description:
      "Engagements, birthdays, maternity, first steps, graduations — the moments that mark how far you've come. Same playful, relaxed energy whether I'm at your kitchen table or meeting you at your favorite North Shore spot.",
    alt: "Garfield Park Conservatory engagement photography in Chicago — milestone session portrait on bench",
    src: "/photos/garfield-park-conservatory-engagement/cover-bench.jpg",
    learnMoreHref: "/sessions/engagement-photography",
    learnMoreLabel: "learn more about engagement sessions",
  },
  {
    name: "Event Session",
    description:
      "Bar Mitzvahs, Upshirins, celebrations big and small. I blend in, keep the energy fun, and capture every detail and real feeling so when you look back, it all comes rushing right back.",
    alt: "Bar Mitzvah photographer Skokie — boy putting on tallit prayer shawl during ceremony",
    src: "/photos/stolberg-bar-mitzvah/10-putting-on-tallit.jpg",
    learnMoreHref: "/sessions/bar-mitzvah-photography",
    learnMoreLabel: "learn more about bar and bat mitzvah coverage",
  },
];

const packages = [
  {
    name: "Mini Session",
    price: "$200",
    features: [
      { text: "30-minute session", highlight: true },
      { text: "One location" },
      { text: "10 edited digital images", highlight: true },
      { text: "Online gallery" },
      { text: "Full rights to print and share" },
    ],
    description:
      "Perfect for seasonal updates, quick family portraits, or a short and sweet session.",
  },
  {
    name: "Classic Session",
    price: "$325",
    features: [
      { text: "60-minute session", highlight: true },
      { text: "One location" },
      { text: "20 edited digital images", highlight: true },
      { text: "Online gallery" },
      { text: "Full rights to print and share" },
      { text: "Wardrobe guidance", highlight: true },
      { text: "Pre-session planning call", highlight: true },
    ],
    popular: true,
    description:
      "The sweet spot \u2014 enough time to relax into the session and capture real moments, plus a quick call beforehand so we can plan everything together.",
  },
  {
    name: "Full Session",
    price: "$500",
    features: [
      { text: "90-minute session", highlight: true },
      { text: "One location" },
      { text: "30 edited digital images", highlight: true },
      { text: "Online gallery" },
      { text: "Full rights to print and share" },
      { text: "Wardrobe guidance" },
      { text: "Pre-session planning call" },
      { text: "Location scouting", highlight: true },
      { text: "Extended family and multi-generational groupings welcome", highlight: true },
      { text: "One complimentary 8x10 fine art print", highlight: true },
    ],
    description:
      "The full experience \u2014 extra time, more variety, room for the whole crew, and a beautiful print to take home.",
  },
  {
    name: "Tailored Session",
    price: "Custom",
    features: [
      { text: "Events and special occasions", highlight: true },
      { text: "Custom duration and timeline", highlight: true },
      { text: "Multiple locations", highlight: true },
      { text: "Custom gallery" },
      { text: "Full rights to print and share" },
    ],
    description:
      "Bar Mitzvahs, Upshirins, celebrations big and small \u2014 let\u2019s chat about your vision.",
  },
];

export default function SessionsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "LocalBusiness",
      name: "Tovy Photography",
    },
    serviceType: "Photography",
    areaServed: [
      { "@type": "City", name: "Skokie" },
      { "@type": "City", name: "Evanston" },
      { "@type": "City", name: "Lincolnwood" },
      { "@type": "City", name: "Wilmette" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photography Sessions",
      itemListElement: packages.map((pkg) => ({
        "@type": "Offer",
        name: pkg.name,
        price: pkg.price.replace("$", ""),
        priceCurrency: "USD",
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-6xl mb-6 text-charcoal">
            Sessions &amp; Pricing
          </h1>
          <p className="text-charcoal-light text-lg leading-relaxed mb-8">
            Every session is designed to feel relaxed, natural, and fun. Whether
            it&apos;s your growing family, a new baby, or a milestone moment —
            I&apos;m here to capture it beautifully.
          </p>
          <a
            href="#pricing"
            className="inline-block border border-sage px-6 py-2.5 text-sm font-medium uppercase tracking-widest text-sage transition-all hover:bg-sage hover:text-white"
          >
            Jump to Pricing
          </a>
        </div>
      </section>

      {/* Session Types */}
      <section className="px-6 pb-20 md:pb-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-12 text-center text-charcoal">
            Session Types
          </h2>
          <div className="space-y-16">
            {sessions.map((session, i) => (
              <ScrollReveal key={i} animation="fade-up">
                <div className="grid gap-8 md:gap-12 md:grid-cols-2 items-center">
                  <ScrollReveal animation={i % 2 === 0 ? "fade-right" : "fade-left"} delay={100}>
                    <div
                      className={`relative aspect-[4/3] overflow-hidden ${
                        i % 2 === 1 ? "md:order-2" : ""
                      }`}
                    >
                      <Image
                        src={session.src}
                        alt={session.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={80}
                      />
                    </div>
                  </ScrollReveal>
                  <ScrollReveal animation={i % 2 === 0 ? "fade-left" : "fade-right"} delay={250}>
                    <div className={i % 2 === 1 ? "md:order-1" : ""}>
                      <h3 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl mb-4 text-charcoal">
                        {session.name}
                      </h3>
                      <p className="text-charcoal-light leading-relaxed mb-6">
                        {session.description}
                      </p>
                      <Link
                        href="/contact"
                        className="inline-block border border-sage bg-sage px-6 py-2.5 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-sage-dark hover:border-sage-dark"
                      >
                        Book Now
                      </Link>
                      {session.learnMoreHref && (
                        <Link
                          href={session.learnMoreHref}
                          className="mt-3 block text-sm italic lowercase tracking-wide text-charcoal-light transition-colors hover:text-sage-dark"
                        >
                          {session.learnMoreLabel ?? "learn more"} &rarr;
                        </Link>
                      )}
                    </div>
                  </ScrollReveal>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-white px-6 py-20 md:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl mb-4 text-charcoal">
              Pricing
            </h2>
            <p className="text-charcoal-light">
              Simple, transparent pricing. No hidden fees.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 100}>
              <div
                className={`relative border p-8 text-left ${
                  pkg.popular
                    ? "border-sage bg-sage/5"
                    : "border-charcoal/10"
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sage px-4 py-1 text-xs font-medium uppercase tracking-wider text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl mb-2 text-charcoal">
                  {pkg.name}
                </h3>
                <p className="font-[family-name:var(--font-cormorant)] text-4xl mb-6 text-sage">
                  {pkg.price}
                </p>
                <ul className="space-y-3 mb-8 text-sm text-charcoal-light">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className={`flex items-center gap-2 ${feature.highlight ? "font-semibold text-charcoal" : ""}`}>
                      <svg
                        className={`h-4 w-4 shrink-0 ${feature.highlight ? "text-sage-dark" : "text-sage"}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature.text}
                    </li>
                  ))}
                </ul>
                {pkg.description && (
                  <p className="text-xs text-charcoal-light leading-relaxed mb-8 italic">
                    {pkg.description}
                  </p>
                )}
                <Link
                  href="/contact"
                  className={`inline-block w-full py-3 text-center text-sm font-medium uppercase tracking-widest transition-all ${
                    pkg.popular
                      ? "bg-sage text-white hover:bg-sage-dark"
                      : "border border-charcoal text-charcoal hover:bg-charcoal hover:text-white"
                  }`}
                >
                  Book Now
                </Link>
              </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="mb-10">
            <p className="text-center text-sm uppercase tracking-wider text-charcoal/60 mb-4">
              Also offering
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { href: "/sessions/maternity-photography", label: "Maternity Sessions" },
                { href: "/sessions/milestone-photography", label: "Milestone Sessions" },
                { href: "/sessions/mini-sessions", label: "Mini Sessions" },
                { href: "/sessions/bar-mitzvah-photography", label: "Bar and Bat Mitzvahs" },
                { href: "/sessions/proposal-photography", label: "Proposal Photography" },
                { href: "/sessions/extended-family-photography", label: "Extended Family Sessions" },
                { href: "/sessions/maternity-and-newborn-photography", label: "Maternity + Newborn" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="border border-charcoal/15 px-4 py-2 text-sm text-charcoal hover:border-sage hover:text-sage-dark transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <p className="text-center text-sm text-charcoal-light mt-10">
            Based in Skokie. Sessions within 10 miles are included. A $50 travel fee applies for locations beyond that — just ask if you&apos;re not sure!
          </p>
          <p className="text-center text-sm text-charcoal-light mt-3">
            Additional time beyond your booked session is available at $100 per 15-minute block, subject to availability.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 md:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal animation="scale-in">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl mb-6 text-charcoal">
              Not sure which session is right?
            </h2>
            <p className="mb-8 text-charcoal-light leading-relaxed">
              Let&apos;s chat! I&apos;d love to help you figure out the perfect
              session for your family. No pressure, just a friendly conversation.
            </p>
            <Link
              href="/contact"
              className="inline-block border border-charcoal px-8 py-3 text-sm font-medium uppercase tracking-widest text-charcoal transition-all hover:bg-charcoal hover:text-white"
            >
              Book Now
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
