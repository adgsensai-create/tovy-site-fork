import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact — Book Your Photography Session",
  description:
    "Ready to capture your family's story? Contact Tovy Photography to book a family, newborn, milestone, or event session in Skokie, IL and Chicago's North Shore.",
  alternates: {
    canonical: "https://tovyphotography.com/contact",
  },
  openGraph: {
    title: "Contact — Tovy Photography",
    description:
      "Book your photography session with Tovy Photography. Serving Skokie, Evanston, Lincolnwood, Wilmette, and Chicago.",
    url: "https://tovyphotography.com/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-20 md:pb-32 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 md:grid-cols-5">
            {/* Form */}
            <div className="md:col-span-3">
              <ScrollReveal animation="fade-up">
                <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-6xl mb-6 text-charcoal">
                  Let&apos;s Connect
                </h1>
                <p className="text-charcoal-light leading-relaxed mb-10">
                  I&apos;d love to hear about your family and what you&apos;re
                  looking for. Fill out the form below and I&apos;ll get back to
                  you within 24-48 hours.
                </p>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={200}>
                <ContactForm />
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-2">
              <div className="sticky top-32 space-y-8">
                <div>
                  <h2 className="font-[family-name:var(--font-cormorant)] text-2xl mb-4 text-charcoal">
                    Get in Touch
                  </h2>
                  <div className="space-y-4 text-charcoal-light">
                    <div className="flex items-start gap-3">
                      <svg
                        className="mt-1 h-5 w-5 shrink-0 text-sage"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a
                        href="mailto:tovypics@gmail.com"
                        className="hover:text-sage transition-colors"
                      >
                        tovypics@gmail.com
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="mt-1 h-5 w-5 shrink-0 text-sage"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" />
                        <circle cx="12" cy="12" r="5" />
                        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                      </svg>
                      <a
                        href="https://www.instagram.com/tovyphotography?igsh=MWs3MnEzZXJ1bDY5ag%3D%3D&utm_source=qr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-sage transition-colors"
                      >
                        @tovyphotography
                      </a>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="mt-1 h-5 w-5 shrink-0 text-sage"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>
                        Skokie, IL — Serving Chicago&apos;s North Shore
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-[family-name:var(--font-cormorant)] text-xl mb-3 text-charcoal">
                    Areas Served
                  </h3>
                  <p className="text-sm text-charcoal-light leading-relaxed">
                    Skokie, Evanston, Lincolnwood, Wilmette, Morton Grove,
                    Niles, Glenview, Highland Park, and greater Chicago. Happy
                    to travel for the right session!
                  </p>
                </div>

                <div className="border border-sage/30 bg-sage/5 p-6">
                  <h3 className="font-[family-name:var(--font-cormorant)] text-xl mb-3 text-charcoal">
                    Quick Facts
                  </h3>
                  <ul className="space-y-2 text-sm text-charcoal-light">
                    <li>• Sessions start at $200</li>
                    <li>• 2-3 week turnaround</li>
                    <li>• In-home &amp; outdoor sessions</li>
                    <li>• Natural light photography</li>
                    <li>• Digital files included</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
