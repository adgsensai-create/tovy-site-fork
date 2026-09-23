import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import PlaceholderImage from "@/components/PlaceholderImage";
import { getShootsByCategory, categories } from "@/lib/gallery-data";
import { faqJsonLd } from "@/lib/site";

interface Props {
  params: Promise<{ category: string }>;
}

const categoryMeta: Record<
  string,
  {
    title: string;
    description: string;
    h1: string;
    intro: string;
    serviceHref: string;
    serviceLabel: string;
    about: string[];
    faqs: { question: string; answer: string }[];
  }
> = {
  family: {
    title: "Family Photo Gallery, Skokie North Shore",
    description:
      "Browse family photography sessions by Tovy Photography. Natural, playful family portraits in Skokie, IL and Chicago's North Shore.",
    h1: "Family Photography",
    intro:
      "Real connections, real laughter, real love. Family sessions designed to capture your family exactly as you are.",
    serviceHref: "/sessions/family-photography",
    serviceLabel: "Family Photography",
    about: [
      "Every session here was photographed in natural light, at a North Shore park, in a family's home, or in their backyard. Nothing is staged in a studio. Families in these galleries are from Skokie, Wilmette, West Rogers Park and nearby.",
      "If you like what you see, family sessions start at $200 and include edited images with full print rights.",
    ],
    faqs: [
      { question: "Where were these family sessions photographed?", answer: "At real North Shore locations: the Skokie Public Library grounds, the Keay Nature Center in Wilmette, and a family's home in West Rogers Park. Every gallery page names its location." },
      { question: "How many photos do you deliver from a family session?", answer: "10 edited images from a 30-minute mini, 20 from a 60-minute Classic, and 30 from a 90-minute Full session, all in a private online gallery with print rights." },
      { question: "Can we book a session like one of these?", answer: "Yes. Tell me which gallery you liked and I will suggest a similar location, time of day and package." },
    ],
  },
  newborn: {
    title: "Newborn Photo Gallery, In-Home Sessions",
    description:
      "Gentle, natural newborn photography by Tovy Photography. In-home sessions in Skokie, IL capturing the first days with your new baby.",
    h1: "Newborn Photography",
    intro:
      "The tiniest toes, the softest yawns, the way they curl into you. Celebrating new life with calm, gentle photography.",
    serviceHref: "/sessions/newborn-photography",
    serviceLabel: "Newborn Photography",
    about: [
      "Every newborn session here happened at home, in window light, with no props and no studio. The families are in Skokie and downtown Chicago, and siblings and parents are part of every gallery.",
      "In-home newborn sessions start at $200 and include edited images with full print rights.",
    ],
    faqs: [
      { question: "Are these newborn photos taken at home or in a studio?", answer: "At home. I photograph newborns in the family's own space by the brightest window, which keeps the baby comfortable and makes the photos feel like their first days really felt." },
      { question: "How old were the babies in these sessions?", answer: "Most newborn sessions happen when the baby is about 5 to 14 days old. Older newborns photograph beautifully too, the session just looks a little more awake." },
      { question: "How do I book a newborn session?", answer: "Reach out during your third trimester so we can hold a tentative date, then confirm once your baby arrives." },
    ],
  },
  milestone: {
    title: "Milestone Photo Gallery, Skokie",
    description:
      "Milestone photography by Tovy Photography. Maternity, first birthdays, graduations, and more in Skokie, IL and Chicago's North Shore.",
    h1: "Milestone Photography",
    intro:
      "From maternity glow to first birthdays to graduations — every milestone deserves to be captured beautifully.",
    serviceHref: "/sessions/milestone-photography",
    serviceLabel: "Milestone Photography",
    about: [
      "Birthdays, first haircuts, engagements and the small moments in between. These sessions were photographed at home, at a family celebration, and at the Garfield Park Conservatory.",
      "Milestone sessions start at $200 and include edited images with full print rights.",
    ],
    faqs: [
      { question: "What counts as a milestone session?", answer: "Baby milestones at 3, 6, 9 and 12 months, first birthdays and cake smashes, upsherins and first haircuts, graduations, engagements and holiday sessions." },
      { question: "Do you photograph engagement sessions?", answer: "Yes. The Garfield Park Conservatory session in this gallery is one, and engagement sessions have their own page with locations and pricing." },
      { question: "Can milestone photos be taken at home?", answer: "Yes, and for babies I usually recommend it. Naps stay on schedule and the photos happen in the space they are growing up in." },
    ],
  },
  event: {
    title: "Event Gallery, Bar Mitzvahs and Celebrations",
    description:
      "Event photography by Tovy Photography. Bar Mitzvahs, celebrations, and special occasions captured with joy and authenticity.",
    h1: "Event Photography",
    intro:
      "The energy, the emotions, the details that make your event unforgettable. Relaxed, fun event photography for any occasion.",
    serviceHref: "/sessions/bar-mitzvah-photography",
    serviceLabel: "Bar and Bat Mitzvah Photography",
    about: [
      "Bar and Bat Mitzvahs, upsherins, brises and family celebrations in Skokie and Chicago's North Shore, photographed quietly during the ceremony and joyfully at the party.",
      "Events are quoted per celebration based on hours of coverage. Pre-event portrait sessions start at $200.",
    ],
    faqs: [
      { question: "Do you photograph Bar and Bat Mitzvahs?", answer: "Yes. The gallery here is a Bar Mitzvah at the synagogue, from putting on the tallit through the celebration. I photograph ceremonies where photography is permitted and cover the party afterward." },
      { question: "What if the service is on Shabbat?", answer: "Then we do a portrait session earlier in the week, sometimes on the bimah with the rabbi's permission, and I cover the celebration afterward." },
      { question: "How do I get a quote for an event?", answer: "Send the date, the venue and a rough schedule through the contact page and I will reply with a quote and a plan for the photos." },
    ],
  },
};

export async function generateStaticParams() {
  return categories.map((cat) => ({
    category: cat.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const meta = categoryMeta[category];
  if (!meta) return {};

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://tovyphotography.com/gallery/${category}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://tovyphotography.com/gallery/${category}`,
    },
  };
}

export default async function GalleryCategoryPage({ params }: Props) {
  const { category } = await params;
  const meta = categoryMeta[category];
  if (!meta) notFound();

  const shoots = getShootsByCategory(category);

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl">
          <nav className="mb-8 text-sm text-charcoal-light">
            <Link href="/gallery" className="hover:text-charcoal transition-colors">
              Gallery
            </Link>
            <span className="mx-2">›</span>
            <span className="text-charcoal">{meta.h1}</span>
          </nav>
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-6xl mb-6 text-charcoal">
            {meta.h1}
          </h1>
          <p className="text-charcoal-light text-lg leading-relaxed max-w-xl mx-auto">
            {meta.intro}
          </p>
        </div>
      </section>

      {/* Shoots Grid */}
      <section className="px-6 pb-20 md:pb-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {shoots.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-charcoal-light text-lg">
                Sessions coming soon. Check back!
              </p>
            </div>
          ) : (
            <div className="grid gap-10 md:grid-cols-2">
              {shoots.map((shoot) => (
                <Link
                  key={shoot.slug}
                  href={`/gallery/${category}/${shoot.slug}`}
                  className="group"
                >
                  {/* Cover Image */}
                  <div className="relative aspect-[3/4] overflow-hidden mb-5">
                    {shoot.coverImage ? (
                      <Image
                        src={shoot.coverImage}
                        alt={`${shoot.title} — ${meta.h1} by Tovy Photography`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={80}
                        priority
                      />
                    ) : (
                      <PlaceholderImage
                        alt={`${shoot.title} — ${meta.h1}`}
                        className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
                        label={shoot.title}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                  </div>

                  {/* Shoot Info */}
                  <h2 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-charcoal mb-2 group-hover:text-sage-dark transition-colors">
                    {shoot.title}
                  </h2>
                  <p className="text-charcoal-light text-sm leading-relaxed">
                    {shoot.description}
                  </p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-wider text-sage">
                    View Session · {shoot.images.length} photos →
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About these sessions */}
      <section className="bg-white px-6 py-16 md:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-6 text-charcoal">
            About these {meta.h1.toLowerCase()} sessions
          </h2>
          <div className="space-y-4 text-charcoal-light leading-relaxed">
            {meta.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <Link
            href={meta.serviceHref}
            className="mt-8 inline-block border border-charcoal px-6 py-3 text-sm font-medium tracking-wider uppercase text-charcoal transition-colors hover:bg-charcoal hover:text-white"
          >
            {meta.serviceLabel}: details and pricing
          </Link>
          <div className="mt-12 space-y-8">
            {meta.faqs.map((f, i) => (
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

      {/* Other categories */}
      <section className="bg-white px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl mb-8 text-charcoal">
            Explore More
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories
              .filter((c) => c.toLowerCase() !== category)
              .map((cat) => (
                <Link
                  key={cat}
                  href={`/gallery/${cat.toLowerCase()}`}
                  className="border border-charcoal/20 px-6 py-2 text-sm uppercase tracking-wider text-charcoal hover:bg-charcoal hover:text-white transition-all"
                >
                  {cat}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-5xl mb-6 text-charcoal">
            Ready to book?
          </h2>
          <Link
            href="/contact"
            className="inline-block border border-sage bg-sage px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-sage-dark hover:border-sage-dark"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
