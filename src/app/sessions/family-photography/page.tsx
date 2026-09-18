import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import StickyBookingBar from "@/components/StickyBookingBar";

export const metadata: Metadata = {
  title: "Family Photography in Skokie & Chicago's North Shore | Tovy Photography",
  description:
    "Natural, relaxed family photography in Skokie, Evanston, and Chicago's North Shore. Outdoor and in-home sessions that capture real connection. Sessions from $200.",
  alternates: {
    canonical: "https://tovyphotography.com/sessions/family-photography",
  },
  openGraph: {
    title: "Family Photography in Skokie & Chicago's North Shore | Tovy Photography",
    description:
      "Natural, relaxed family photography in Skokie, Evanston, and Chicago's North Shore. Outdoor and in-home sessions that capture real connection.",
    url: "https://tovyphotography.com/sessions/family-photography",
  },
};

const faqs = [
  {
    q: "What should we wear for family photos?",
    a: "Coordinate, don't match. Pick 2 to 3 complementary colors in soft, warm tones: cream, olive, rust, navy, mustard. Avoid logos, neon, and all-white (it reflects light and washes everyone out). I provide wardrobe guidance with Classic and Full sessions.",
  },
  {
    q: "My kids won't sit still. Is that okay?",
    a: "That's the best-case scenario. I don't need kids to sit still. I need them to be themselves. Running, climbing, laughing, refusing to cooperate and then suddenly hugging their sibling? That's the good stuff.",
  },
  {
    q: "When is the best time for outdoor family photos?",
    a: "Golden hour, about 60 to 90 minutes before sunset. The light is warm, soft, and flattering for everyone. I'll suggest the ideal time based on the season and your session date.",
  },
  {
    q: "How far in advance should I book?",
    a: "For fall sessions (the most popular), I recommend booking in August or early September. For other seasons, 2 to 3 weeks ahead usually works. Holiday card sessions should be booked by early October.",
  },
  {
    q: "Where do you shoot family sessions?",
    a: "Throughout Skokie, Evanston, Wilmette, Lincolnwood, and the broader North Shore. I have favorite spots in each area, but I'm also happy to photograph at a location that's meaningful to your family.",
  },
  {
    q: "Can I include our dog?",
    a: "Yes! Pets are absolutely welcome. They're part of the family.",
  },
];

export default function FamilyPhotographyPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Family Photography",
    provider: {
      "@type": "LocalBusiness",
      name: "Tovy Photography",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Skokie",
        addressRegion: "IL",
        addressCountry: "US",
      },
      url: "https://tovyphotography.com",
      priceRange: "$200-$500",
    },
    areaServed: [
      "Skokie",
      "Evanston",
      "Wilmette",
      "Lincolnwood",
      "Winnetka",
      "Highland Park",
      "Northbrook",
      "Glencoe",
    ],
    description:
      "Natural, relaxed family photography in Skokie, Evanston, and Chicago's North Shore. Outdoor and in-home sessions.",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero — image left, text right */}
      <section
        className="pt-28 pb-16 md:pt-36 md:pb-20 px-6 lg:px-8"
        style={{ backgroundColor: "#E8D5CE" }}
      >
        <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2 items-center">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/photos/family-hero-park-laughing.jpg"
              alt="family photography Skokie IL — parents laughing with their two kids during a relaxed outdoor session on Chicago's North Shore"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              quality={85}
            />
          </div>
          <div className="text-center md:text-left">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-charcoal/50">
              Skokie &amp; Chicago North Shore
            </p>
            <h1 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl lg:text-7xl text-charcoal mb-6">
              Family Photography
            </h1>
            <p className="text-charcoal/70 text-lg mb-10">
              Real moments with the people who matter most.
            </p>
            <Link
              href="/contact"
              className="inline-block border border-charcoal bg-charcoal px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-charcoal"
            >
              Book Your Family Session
            </Link>
          </div>
        </div>
      </section>

      {/* Section 1: The Experience */}
      <section className="px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-2 items-center">
          <ScrollReveal animation="fade-right">
            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-6 text-charcoal">
                What a family session actually looks like
              </h2>
              <div className="space-y-4 text-charcoal-light leading-relaxed">
                <p>Nobody stands in a line and says cheese.</p>
                <p>
                  A session with me looks like your family being your family:
                  walking through a park, sitting on a blanket, kids running
                  ahead, someone tickling someone, everyone laughing. I guide you
                  gently (&ldquo;walk toward me,&rdquo; &ldquo;whisper something
                  silly to each other&rdquo;) but I never force a pose that
                  doesn&apos;t feel like you.
                </p>
                <p>
                  I photograph families throughout Skokie, Evanston, Wilmette, and
                  the North Shore. At parks you already love, in your own backyard,
                  or inside your home where the real life happens. The location
                  should feel natural to your family, not like a backdrop you
                  drove an hour to find.
                </p>
                <p>
                  The photos you get back? They look like your family on your best
                  day.
                </p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-left" delay={150}>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/photos/family-kids-walking-path.jpg"
                alt="family photography session in Skokie park — four siblings walking hand in hand during golden hour"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 2: Who It's For */}
      <section className="bg-white px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal animation="fade-up">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-6 text-charcoal">
              Every kind of family
            </h2>
            <p className="text-charcoal-light leading-relaxed mb-6">
              Whether it&apos;s just the three of you or a four-generation
              gathering at grandma&apos;s house, family sessions are designed to
              be flexible. I regularly photograph:
            </p>
            <ul className="space-y-3 text-charcoal-light leading-relaxed mb-6">
              {[
                "Growing families with young kids",
                "Extended families and multigenerational groups",
                "Couples without kids who want beautiful portraits together",
                "Siblings — chaotic energy included",
                "Families going through transitions who want to freeze a moment in time",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <svg
                    className="h-5 w-5 shrink-0 mt-0.5 text-sage"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-charcoal-light leading-relaxed">
              Your family doesn&apos;t need to be &ldquo;picture perfect.&rdquo;
              They need to be present. I&apos;ll handle the rest.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 3: Session Options */}
      <section className="px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-2 items-center">
          <ScrollReveal animation="fade-right">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/photos/hero-mom-lift-kiss-bw.jpg"
                alt="family photographer Evanston — mom lifting and kissing her laughing daughter during outdoor session"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
              />
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-left" delay={150}>
            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-6 text-charcoal">
                How family sessions work
              </h2>
              <div className="space-y-5 text-charcoal-light leading-relaxed">
                <p>
                  <strong className="text-charcoal font-medium">Outdoor sessions</strong>:
                  Parks throughout the North Shore offer incredible backdrops. I
                  know the best spots in Skokie (Emily Oaks Nature Center, Laramie
                  Park), Evanston, Wilmette, and beyond. Golden hour, that warm
                  light about an hour before sunset, makes everything glow.
                </p>
                <p>
                  <strong className="text-charcoal font-medium">In-home sessions</strong>:
                  Some of my favorite family photos happen on the couch, in the
                  kitchen, or on the front porch. These sessions capture the
                  everyday moments that feel ordinary now and priceless later.
                </p>
                <p>
                  <strong className="text-charcoal font-medium">Wardrobe guidance</strong>:
                  For Classic and Full sessions, I&apos;ll help you coordinate
                  outfits before the session so everything looks intentional
                  without looking overdone. Think warm neutrals, soft textures,
                  nothing too matchy.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 4: Pricing */}
      <section className="bg-white px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-6 text-charcoal">
              Family session pricing
            </h2>
            <p className="text-charcoal-light leading-relaxed mb-8">
              Sessions start at $200 for a 30-minute mini session, perfect for
              seasonal updates and quick family portraits. The Classic session
              ($325, 60 minutes) is the most popular choice for families who want
              more relaxed coverage and time to capture real moments. The Full
              session ($500, 90 minutes) is ideal for extended families and
              multigenerational groups.
            </p>
            <Link
              href="/sessions#pricing"
              className="inline-block border border-sage px-6 py-2.5 text-sm font-medium uppercase tracking-widest text-sage transition-all hover:bg-sage hover:text-white"
            >
              View Full Pricing
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 5: FAQ */}
      <section className="px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal animation="fade-up">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-10 text-charcoal text-center">
              Common questions about family photography
            </h2>
          </ScrollReveal>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 50}>
                <details className="group border border-charcoal/10 bg-white">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-4 text-charcoal font-medium list-none [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <svg
                      className="h-4 w-4 shrink-0 text-sage transition-transform duration-200 group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="px-6 pb-5 text-charcoal-light leading-relaxed">{f.a}</p>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section className="bg-sage/15 px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal animation="scale-in">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl mb-6 text-charcoal">
              Let&apos;s plan your family session
            </h2>
            <p className="mb-8 text-charcoal-light leading-relaxed">
              Tell me about your family and what kind of session feels right.
              I&apos;ll help you pick the perfect time, location, and package.
            </p>
            <Link
              href="/contact"
              className="inline-block border border-sage bg-sage px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-sage-dark hover:border-sage-dark"
            >
              Get in Touch
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Related links */}
      <section className="px-6 py-14 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-charcoal/50 mb-5">
            Keep Exploring
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
            <Link href="/sessions/newborn-photography" className="text-sage-dark hover:underline underline-offset-4">
              Newborn Photography &rarr;
            </Link>
            <Link href="/gallery/family" className="text-sage-dark hover:underline underline-offset-4">
              View the Family Gallery &rarr;
            </Link>
            <Link href="/blog/what-to-wear-family-photo-session" className="text-sage-dark hover:underline underline-offset-4">
              What to Wear for Family Photos &rarr;
            </Link>
            <Link href="/blog/best-family-photo-locations-skokie-north-shore" className="text-sage-dark hover:underline underline-offset-4">
              Family Photo Locations in Skokie &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Spacer so the sticky bar never covers the footer content */}
      <div className="h-14" />

      <StickyBookingBar />
    </>
  );
}
