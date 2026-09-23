import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import StickyBookingBar from "@/components/StickyBookingBar";
import { services } from "@/lib/services";
import { locationPages } from "@/lib/locations";
import { site, breadcrumbJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Newborn Photographer in Skokie and the North Shore",
  description:
    "Gentle, in-home newborn photography in Skokie and Chicago's North Shore. Relaxed sessions for babies 5 to 14 days new. Naturally posed, beautifully lit, stress-free.",
  alternates: {
    canonical: "https://tovyphotography.com/sessions/newborn-photography",
  },
  openGraph: {
    title: "Newborn Photography in Skokie & Chicago's North Shore | Tovy Photography",
    description:
      "Gentle, in-home newborn photography in Skokie and Chicago's North Shore. Relaxed sessions for babies 5 to 14 days new.",
    url: "https://tovyphotography.com/sessions/newborn-photography",
  },
};

const faqs = [
  {
    q: "When should I book my newborn session?",
    a: "Book during your third trimester, ideally around 30 to 34 weeks. We'll set a tentative date based on your due date, then confirm once your baby arrives. The best window for photos is 5 to 14 days old.",
  },
  {
    q: "Do I need to have a clean house?",
    a: "No. I only need a small area near a window with good natural light. I'll move things around if needed. Your home doesn't need to be magazine-ready. It needs to be yours.",
  },
  {
    q: "What if my baby won't sleep or is fussy?",
    a: "That's completely normal and expected. We go at your baby's pace. If they need to eat, we pause. If they need to be held, we adjust. Some of my favorite images come from those wide-awake, curious moments.",
  },
  {
    q: "Can we include siblings and family photos?",
    a: "Absolutely. I always build in ample time for family shots and sibling photos. These are some of the most meaningful images from a newborn session.",
  },
  {
    q: "How long does the session last?",
    a: "Newborn sessions typically run 1.5 to 2 hours depending on the baby's mood. There's no clock running. We take whatever time we need.",
  },
  {
    q: "Where do you photograph newborn sessions?",
    a: "Primarily in-home throughout Skokie, Evanston, Wilmette, Lincolnwood, and the greater North Shore. Your baby is most comfortable at home, and the photos feel more personal and authentic.",
  },
];

export default function NewbornPhotographyPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Newborn Photography",
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
      "Gentle, in-home newborn photography in Skokie and Chicago's North Shore. Relaxed sessions for babies 5 to 14 days new.",
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

  const why = services["newborn-photography"].why;
  const towns = Object.values(locationPages);
  const breadcrumbLd = breadcrumbJsonLd([
    { name: "Home", url: site.url },
    { name: "Sessions and Pricing", url: `${site.url}/sessions` },
    { name: "Newborn Photographer", url: `${site.url}/sessions/newborn-photography` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
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
              src="/photos/hero-newborn-window-floral.jpg"
              alt="newborn photography Skokie IL — parents cradling their newborn in soft window light during an in-home session"
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
              Newborn Photography
            </h1>
            <p className="text-charcoal/70 text-lg mb-10">
              The tiny details you&apos;ll want to remember forever.
            </p>
            <Link
              href="/contact"
              className="inline-block border border-charcoal bg-charcoal px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-charcoal"
            >
              Book Your Newborn Session
            </Link>
          </div>
        </div>
      </section>

      {/* Citable summary */}
      <section className="px-6 pt-16 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4 text-lg md:text-xl leading-relaxed text-charcoal">
          <p>Tovy Photography offers in-home newborn photography in Skokie, Evanston, Wilmette, Lincolnwood and across Chicago's North Shore. Sessions are lifestyle style in natural window light, photographed at your home when your baby is about 5 to 14 days old, and start at $200 with edited images and full print rights included.</p>
          <p>I am Gabi, a Skokie-based photographer. I come to you, follow your baby's cues, and photograph siblings and the whole family in the same visit, so the first days at home are the photos you keep.</p>
        </div>
      </section>

      {/* Section 1: The Experience */}
      <section className="px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-2 items-center">
          <ScrollReveal animation="fade-right">
            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-6 text-charcoal">
                What a newborn session feels like
              </h2>
              <div className="space-y-4 text-charcoal-light leading-relaxed">
                <p>
                  Your baby just got here. Everything is new, a little chaotic, and
                  completely beautiful. The last thing you need is to pack a diaper
                  bag and drive across town for photos.
                </p>
                <p>That&apos;s why I come to you.</p>
                <p>
                  I&apos;ll show up at your home in Skokie, Evanston, Wilmette, or
                  anywhere on the North Shore with everything I need. You stay in
                  your pajamas if you want. Your baby stays comfortable in the space
                  they already know. And I work around their schedule: feeding
                  breaks, diaper changes, nap time. None of it is a problem. All of
                  it is expected.
                </p>
                <p>
                  The result? Photos that feel exactly like those first days
                  actually feel. Quiet, warm, and full of a love so big it
                  surprises you.
                </p>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-left" delay={150}>
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/photos/newborn-mom-siblings-window.jpg"
                alt="newborn photography session in Skokie home — mom holding newborn in natural window light with big brother beside her"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 2: When to Book */}
      <section className="bg-white px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal animation="fade-up">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-6 text-charcoal">
              The best time for newborn photos
            </h2>
            <div className="space-y-4 text-charcoal-light leading-relaxed">
              <p>
                The sweet spot is 5 to 14 days old. During this window, babies are
                sleepier, curlier, and still have that brand-new softness that
                disappears faster than you&apos;d think. I can gently pose them in
                those tucked, cozy positions that look so natural because they just
                spent nine months like that.
              </p>
              <p>
                That said, if your baby is three weeks old and you haven&apos;t
                booked yet, don&apos;t panic. We can absolutely still do a beautiful
                session. It just might look a little different, and that&apos;s
                perfectly fine.
              </p>
              <p>
                I recommend reaching out during your third trimester so we can get a
                tentative date on the calendar. Once your baby arrives, we&apos;ll
                confirm the real date together.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 3: What's Included */}
      <section className="px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-2 items-center">
          <ScrollReveal animation="fade-right">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src="/photos/newborn-parents-hands-skyline.jpg"
                alt="in-home newborn photographer Skokie — parents' hands cradling sleeping baby by the window with city skyline"
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
                What you get
              </h2>
              <p className="text-charcoal-light mb-4">Every newborn session includes:</p>
              <ul className="space-y-3 text-charcoal-light leading-relaxed">
                {[
                  ["In-home session", "I come to you, no studio needed"],
                  ["Baby-led timing", "we follow your newborn's cues, not a shot list"],
                  ["Gentle, natural posing", "no props, no forced positions, just your baby being brand new"],
                  ["Family and sibling photos", "we'll capture the whole crew together"],
                  ["Detail shots", "tiny toes, curled fingers, that impossibly soft skin"],
                  ["Professionally edited images", "delivered in a private online gallery"],
                  ["Full print rights", "print whatever you want, wherever you want"],
                ].map(([title, desc], i) => (
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
                    <span>
                      <strong className="text-charcoal font-medium">{title}</strong>: {desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 4: Pricing */}
      <section className="bg-white px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-6 text-charcoal">
              Newborn session pricing
            </h2>
            <p className="text-charcoal-light leading-relaxed mb-8">
              Sessions start at $200 for a mini session and go up to $500 for a full
              session with extended coverage and more edited images. Every package
              includes an online gallery and full print rights.
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
      {/* What makes it work */}
      <section className="bg-white px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-8 text-charcoal">
            What makes in-home newborn photos work
          </h2>
          <ul className="space-y-6">
            {why.items.map((item, i) => (
              <li key={i} className="border-l-2 border-sage pl-5">
                <p className="text-charcoal leading-relaxed">
                  <strong className="font-semibold">{item.title}</strong> {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-20 md:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <ScrollReveal animation="fade-up">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-10 text-charcoal text-center">
              Common questions about newborn photography
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
              Ready to capture these first days?
            </h2>
            <p className="mb-8 text-charcoal-light leading-relaxed">
              I&apos;d love to hear about your growing family and start planning your
              session. Reach out during your pregnancy or after delivery so we can
              save your spot.
            </p>
            <Link
              href="/contact"
              className="inline-block border border-sage bg-sage px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-sage-dark hover:border-sage-dark"
            >
              Let&apos;s Talk
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
            <Link href="/gallery/newborn" className="text-sage-dark hover:underline underline-offset-4">
              View the Newborn Gallery &rarr;
            </Link>
            <Link href="/blog/when-to-book-newborn-photos-what-to-expect" className="text-sage-dark hover:underline underline-offset-4">
              When to Book Newborn Photos &rarr;
            </Link>
            <Link href="/sessions" className="text-sage-dark hover:underline underline-offset-4">
              Sessions &amp; Pricing &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Spacer so the sticky bar never covers the footer content */}
      <div className="h-14" />

      {/* Service areas */}
      <section className="px-6 pb-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
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
      </section>

      <StickyBookingBar />
    </>
  );
}
