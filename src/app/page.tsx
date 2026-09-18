import type { Metadata } from "next";
import { localBusinessJsonLd } from "@/lib/site";
import Link from "next/link";
import Image from "next/image";
import HeroSlideshow from "@/components/HeroSlideshow";
import PlaceholderImage from "@/components/PlaceholderImage";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Tovy Photography | Skokie Family & Newborn Photographer",
  description:
    "Skokie family, newborn, maternity and milestone photographer. Natural light sessions at home or on location across Chicago's North Shore.",
  alternates: {
    canonical: "https://tovyphotography.com",
  },
  openGraph: {
    title: "Tovy Photography | Skokie Family & Newborn Photographer",
    description:
      "Authentic family, newborn, and milestone photography in Skokie, IL. Seeing the good in your world.",
    url: "https://tovyphotography.com",
  },
};

const portfolioImages = [
  {
    alt: "Family portrait photography session in Skokie IL",
    category: "Family",
  },
  {
    alt: "Newborn baby photography — gentle and natural",
    category: "Newborn",
  },
  {
    alt: "Family lifestyle photography outdoors",
    category: "Family",
  },
  {
    alt: "Baby milestone photography — first birthday celebration",
    category: "Milestone",
  },
  {
    alt: "Mother and child bonding moment — lifestyle photography",
    category: "Family",
  },
  {
    alt: "Children playing outdoors — candid family photography",
    category: "Family",
  },
];

const testimonials = [
  {
    quote:
      "My kids are shy, but they were completely ok with Gabi — she's great with kids and made them comfortable. We had no idea how much better the photos would look with her editing enhancements. We were blown away and have multiple photos enlarged throughout our home!",
    name: "Abbie C.",
    location: "Skokie, IL",
  },
  {
    quote:
      "She has this special ability to capture genuine, joyful moments you didn't even realize were happening in real time. Looking through our gallery truly felt like reliving the day from the best possible perspective.",
    name: "Tal Schultz",
    location: "Chicago, IL",
  },
  {
    quote:
      "She made all of us, especially my kids, feel completely comfortable and at ease. The photos were absolutely stunning \u2014 Gabi truly captured real, beautiful moments and emotions that we\u2019ll treasure forever.",
    name: "Dena N.",
    location: "Skokie, IL",
  },
];

export default function HomePage() {
  const jsonLd = localBusinessJsonLd({
    description:
      "Family, newborn, maternity and milestone photographer in Skokie, IL serving Chicago's North Shore. Natural light photography capturing authentic moments.",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <HeroSlideshow />

      {/* Intro */}
      <section className="px-6 py-20 md:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl mb-8 text-charcoal">
              Natural, gently guided photography for life&apos;s meaningful moments
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p className="text-base md:text-lg leading-relaxed text-charcoal-light mb-6">
              The way your baby curls into your chest. Your toddler&apos;s belly
              laugh that fills the whole room. The look between you and your
              partner that says <em className="italic">we built this.</em>
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={250}>
            <p className="text-base md:text-lg leading-relaxed text-charcoal-light mb-6">
              Moments like these deserve to be remembered exactly as they feel.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={350}>
            <p className="text-base md:text-lg leading-relaxed text-charcoal-light mb-10">
              My job is to see the <em className="italic">tov,</em> the good in
              your everyday life, and capture it so you can hold onto this feeling
              long after your kids have grown and these fleeting days become the
              memories you treasure most.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={450}>
            <Link
              href="/sessions"
              className="inline-block border border-sage bg-sage px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-sage-dark hover:border-sage-dark"
            >
              Start Here →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Session Type Previews */}
      <section className="bg-white px-6 py-20 md:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal animation="fade-up" className="mb-16 text-center">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl mb-4 text-charcoal">
              See the Options
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {[
              { name: "Newborns", href: "/gallery/newborn", alt: "In-home newborn photographer Skokie IL — sleeping baby natural light photography", src: "/photos/newborn-sleeping-headband.jpg" },
              { name: "Families", href: "/gallery/family", alt: "Skokie in-home family photographer — family portrait on bed with newborn and kids", src: "/photos/family-bed-portrait.jpg" },
              { name: "Milestones", href: "/gallery/milestone", alt: "Garfield Park Conservatory engagement photography in Chicago — milestone session portrait on bench", src: "/photos/garfield-park-conservatory-engagement/cover-bench.jpg" },
              { name: "Events", href: "/gallery/event", alt: "Bar Mitzvah photographer Skokie — boy putting on tallit during ceremony", src: "/photos/stolberg-bar-mitzvah/10-putting-on-tallit.jpg" },
            ].map((session, index) => (
              <ScrollReveal key={session.name} animation="scale-in" delay={index * 100}>
              <Link
                href={session.href}
                className="group relative aspect-[4/3] overflow-hidden block"
              >
                {session.src ? (
                  <Image
                    src={session.src}
                    alt={session.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    quality={80}
                  />
                ) : (
                  <PlaceholderImage
                    alt={session.alt}
                    className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
                    label={session.name}
                  />
                )}
                <div className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/35" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl text-white tracking-wide">
                    {session.name} →
                  </span>
                </div>
              </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-rose/15 px-6 py-20 md:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal animation="fade-up">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl mb-16 text-center text-charcoal">
              Kind Words
            </h2>
          </ScrollReveal>
          <div className="grid gap-12 md:grid-cols-3 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 200}>
                <div className="text-center">
                  <svg
                    className="mx-auto mb-6 h-8 w-8 text-rose"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="mb-6 text-charcoal-light italic leading-relaxed">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="text-sm font-semibold text-charcoal">{t.name}</p>
                  <p className="text-xs text-charcoal-light">{t.location}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal animation="fade-in" delay={400}>
            <div className="mt-12 text-center">
              <Link
                href="/testimonials"
                className="inline-block border border-charcoal/20 px-6 py-2.5 text-sm font-medium uppercase tracking-widest text-charcoal transition-all hover:bg-charcoal hover:text-white"
              >
                Read More Reviews
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Preview */}
      <section className="px-6 py-20 md:py-32 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <ScrollReveal animation="fade-right">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/photos/gabi-portrait.jpg"
                alt="Gabi Tovy — family and newborn photographer in Skokie IL"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
              />
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fade-left" delay={200}>
            <div>
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl mb-6 text-charcoal">
                Hi, I&apos;m Gabi
              </h2>
              <p className="mb-4 text-charcoal-light leading-relaxed">
                I&apos;ve always been the one trailing behind on family walks, too busy
                capturing moments to keep up. It took becoming a mom to finally pick
                up my camera for real — and I never looked back.
              </p>
              <p className="mb-4 text-charcoal-light leading-relaxed">
                My sessions are calm, a little playful, and always guided by what makes
                your family <em className="italic">you.</em> I want you laughing, snuggling, being
                yourselves, and I&apos;ll be there catching the moments you&apos;ll be so
                glad you have.
              </p>
              <p className="mb-8 text-charcoal-light leading-relaxed">
                It&apos;s about slowing down for the moments that move too fast, so
                that years from now, one look pulls you right back in and you feel
                every bit of it all over again.
              </p>
              <Link
                href="/about"
                className="inline-block border border-sage bg-sage px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-sage-dark hover:border-sage-dark"
              >
                Meet Gabi
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="px-6 py-20 md:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl mb-6 text-charcoal">
              Sessions &amp; Pricing
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <p className="mb-4 text-charcoal-light leading-relaxed">
              Sessions start at <span className="font-semibold text-charcoal">$200</span> and include
              professionally edited digital images.
            </p>
            <p className="mb-8 text-charcoal-light">
              Family, newborn, milestone, and event sessions available.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={300}>
            <Link
              href="/sessions"
              className="inline-block border border-charcoal px-8 py-3 text-sm font-medium uppercase tracking-widest text-charcoal transition-all hover:bg-charcoal hover:text-white"
            >
              View Sessions &amp; Pricing
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-rose px-6 py-20 md:py-32 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center text-white">
          <ScrollReveal animation="scale-in">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl lg:text-7xl mb-6">
              Let&apos;s capture your story
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={200}>
            <p className="mb-8 max-w-lg text-base md:text-lg font-light">
              Every family has a story worth telling. I&apos;d love to tell yours.
            </p>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={350}>
            <Link
              href="/contact"
              className="inline-block border border-white bg-white px-8 py-3 text-sm font-medium uppercase tracking-widest text-charcoal transition-all hover:bg-transparent hover:text-white"
            >
              Get in Touch
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
