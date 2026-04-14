import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Reviews & Testimonials — Skokie Family & Newborn Photographer | Tovy Photography",
  description:
    "Read what families are saying about their experience with Tovy Photography. Real reviews from newborn, family, and event photography sessions in Skokie, Evanston, and Chicago's North Shore.",
  alternates: {
    canonical: "https://tovyphotography.com/testimonials",
  },
  openGraph: {
    title: "Reviews & Testimonials — Tovy Photography",
    description:
      "Real reviews from families who trusted Tovy Photography to capture their most meaningful moments.",
    url: "https://tovyphotography.com/testimonials",
  },
};

const testimonials = [
  {
    quote:
      "Our experience was truly amazing from start to finish. With small kids, I expected it to feel a bit chaotic, but it was the complete opposite. Gabi was incredibly patient, engaging, and knew exactly how to capture genuine moments. The photos turned out stunning — natural, joyful, and better than we could have imagined.",
    name: "Leah G.",
    location: "Skokie, IL",
    session: "Family Session",
  },
  {
    quote:
      "We had such an amazing experience working with Gabi for our family photos. She is incredibly artistic and has this special ability to capture genuine, joyful moments you didn't even realize were happening in real time. Looking through our gallery truly felt like reliving the day from the best possible perspective. Gabi is so patient and calm with the kids, which, in my opinion, can make or break a family photoshoot. At one point, our baby had a full blowout and needed a complete outfit change. Gabi didn't miss a beat. She kept everything relaxed and seamlessly shifted her focus to capturing the sweetest photos of our toddler. What really stood out is how she found the happiness within the chaos and made the entire experience, which is oftentimes stressful, genuinely enjoyable. Don't think twice — she's the best!",
    name: "Tal Schultz",
    location: "Chicago, IL",
    session: "Family Session",
  },
  {
    quote:
      "We had such an amazing experience with Gabi for our family photoshoot! From the moment she arrived, she made all of us\u2014especially my kids\u2014feel completely comfortable and at ease. She came so well prepared and even brought snacks for the kids, which made a huge difference in keeping everyone happy and engaged throughout the shoot. Gabi was incredibly patient and wonderful with the kids, managing to keep their attention and capture genuine smiles for much longer than I expected. The fact that the session took place in our home made everything feel even more relaxed and natural, and we loved that we didn\u2019t have to do any prep beforehand. I was also so impressed with how quickly we received our photos. When we got them, I was honestly blown away\u2014they were absolutely stunning. Gabi truly captured real, beautiful moments and emotions that we\u2019ll treasure forever. We couldn\u2019t be happier with the entire experience and would definitely use her again. Highly, highly recommend!",
    name: "Dena N.",
    location: "Skokie, IL",
    session: "In-Home Family Session",
  },
  {
    quote:
      "Gabi was amazing with our family. My kids are shy, but they were completely ok with taking photographs and doing all different poses and locations during our session \u2014 Gabi is great with kids and made them comfortable. She is fun to work with in that she comes with unique ideas of her own to showcase your family\u2019s character, but she\u2019s also open to any suggestions and modifications to the plan you might want. While we were excited to get our photos back because we looked at previews on her camera, we had no idea how much better they would look with her editing enhancements. We were blown away by the result and have multiple photos from our session enlarged throughout our home! Thank you Gabi for such amazing memories for our family!",
    name: "Abbie C.",
    location: "Skokie, IL",
    session: "Family Session",
  },
];

export default function TestimonialsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Tovy Photography",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: String(testimonials.length),
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
      },
      author: {
        "@type": "Person",
        name: t.name,
      },
      reviewBody: t.quote,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-6xl mb-6 text-charcoal">
            Kind Words
          </h1>
          <p className="text-charcoal-light text-lg leading-relaxed">
            Nothing means more than hearing how these moments made families feel.
            Here&apos;s what they had to say.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="px-6 pb-20 md:pb-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="space-y-12">
            {testimonials.map((t, i) => (
              <ScrollReveal key={i} animation="fade-up" delay={i * 200}>
                <div className="border-l-2 border-sage/30 pl-8 py-4">
                  <svg
                    className="mb-4 h-8 w-8 text-rose/60"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-lg md:text-xl italic leading-relaxed text-charcoal-light mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-charcoal">{t.name}</p>
                    <p className="text-sm text-charcoal-light">
                      {t.session} · {t.location}
                    </p>
                  </div>
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
              Ready to create your own experience?
            </h2>
            <p className="mb-8 text-charcoal-light">
              I&apos;d love to hear about your family and what you&apos;re looking for.
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
