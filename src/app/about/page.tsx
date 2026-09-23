import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "About Gabi — Skokie Family Photographer",
  description:
    "Gabi Tovy is a Skokie-based family, newborn and maternity photographer. Natural light, gently guided sessions at home or on location across the North Shore.",
  alternates: {
    canonical: "https://tovyphotography.com/about",
  },
  openGraph: {
    title: "About Gabi — Tovy Photography",
    description:
      "Meet the photographer behind Tovy Photography. Skokie-based family & newborn photographer capturing real moments with natural light.",
    url: "https://tovyphotography.com/about",
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gabi Tovy",
    jobTitle: "Photographer",
    worksFor: {
      "@type": "LocalBusiness",
      name: "Tovy Photography",
    },
    description:
      "Skokie-based family and newborn photographer specializing in authentic lifestyle photography.",
    url: "https://tovyphotography.com/about",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Skokie",
      addressRegion: "IL",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — rose pink background */}
      <section className="bg-rose px-6 pt-32 pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-6xl text-white">
            About Gabi
          </h1>
        </div>
      </section>

      {/* Bio Section */}
      <section className="px-6 py-20 md:py-32 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-2 items-start">
          <div className="relative aspect-[3/4] overflow-hidden md:sticky md:top-24">
            <Image
              src="/photos/gabi-portrait.jpg"
              alt="Gabi Tovy photographer portrait — Tovy Photography"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
            />
          </div>
          <div>
            <ScrollReveal animation="fade-up">
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-8 text-charcoal">
                Hi! I&apos;m Gabi
              </h2>
            </ScrollReveal>
            <div className="space-y-6 text-charcoal-light leading-relaxed">
              <ScrollReveal animation="fade-up" delay={100}>
                <p>
                  I&apos;ve always been the one trailing behind on family walks,
                  too busy capturing moments to keep up.
                </p>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={200}>
                <p>
                  Becoming a mom only made it worse (better?). Watching my son
                  grow, I started feeling how fast it all moves. Then one day he
                  said one of his very first phrases: &ldquo;Do it, do it,
                  do it!&rdquo; I laughed, but honestly? It hit me. He was right.
                  So I did it. I picked up my camera for real and never looked back.
                </p>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={300}>
                <p>
                  Now I get to point the camera at what I love most: real families,
                  real mess, real love. I photograph in people&apos;s homes where
                  life actually happens, and when Chicago gives us one of those
                  golden evenings, we take it outside and soak it in.
                </p>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={400}>
                <p>
                  My sessions are calm, a little playful, and always guided by what
                  makes your family <em className="italic">you.</em> I want you
                  laughing, snuggling, being yourselves, and I&apos;ll be there
                  catching the moments you&apos;ll be so glad you have.
                </p>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={500}>
                <p>
                  It&apos;s about slowing down for the moments that move too fast,
                  so that years from now, one look pulls you right back in and you
                  feel every bit of it all over again.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-white px-6 py-20 md:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal animation="fade-in">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl mb-8 text-charcoal">
              My Philosophy
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="scale-in" delay={200}>
            <blockquote className="text-lg md:text-xl italic leading-relaxed text-charcoal-light">
              &ldquo;I&apos;m here to notice what you&apos;re too busy living to
              see — the quiet looks, the real laughs, the love that fills your
              home. Those are the moments worth keeping.&rdquo;
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* What to Expect */}
      <section className="px-6 py-20 md:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl mb-12 text-center text-charcoal">
            What to Expect
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              { title: "Before Your Session", text: "We\u2019ll chat about what matters to you, pick the perfect location (or plan an in-home session), and I\u2019ll share tips on wardrobe, timing, and how to prep the kids \u2014 hint: just let them be themselves." },
              { title: "During the Session", text: "Expect a relaxed, playful atmosphere. I gently guide without over-posing. The best shots come from real interactions \u2014 a tickle fight, a whispered secret, a spontaneous hug. I\u2019m there to capture it all." },
              { title: "After the Session", text: "Your gallery of beautifully edited images will be ready within 2-3 weeks. Each photo is carefully edited to feel warm, natural, and timeless \u2014 exactly how you remember the moment." },
              { title: "The Result", text: "Images you\u2019ll want to frame, share, and come back to again and again. Photos that remind you of how it felt \u2014 the warmth, the laughter, the love that fills your everyday." },
            ].map((item, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 150}>
                <div className="space-y-4">
                  <h3 className="font-[family-name:var(--font-cormorant)] text-2xl text-charcoal">
                    {item.title}
                  </h3>
                  <p className="text-charcoal-light leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sage/10 px-6 py-20 md:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal animation="scale-in">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl mb-6 text-charcoal">
              Ready to capture your moments?
            </h2>
            <p className="mb-8 text-charcoal-light">
              I&apos;d love to hear about your family and what you&apos;re looking for.
            </p>
            <Link
              href="/contact"
              className="inline-block border border-sage bg-sage px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-sage-dark hover:border-sage-dark"
            >
              Let&apos;s Connect
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
