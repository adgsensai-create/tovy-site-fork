"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const heroSlides = [
  {
    src: "/photos/boy-curtain-window.jpg",
    alt: "Little boy peeking out from window blinds — candid childhood photography",
  },
  {
    src: "/photos/hero-engagement-lift.jpg",
    alt: "Engaged couple embracing beneath hanging flowers at Garfield Park Conservatory in Chicago",
  },
  {
    src: "/photos/hero-family-baby-smile.jpg",
    alt: "Smiling baby held toward the camera by parents during an in-home family session",
    objectPosition: "50% top",
  },
  {
    src: "/photos/parents-newborn-window.jpg",
    alt: "Parents holding newborn baby by window — natural light newborn photography",
  },
  {
    src: "/photos/newborn-skyline.jpg",
    alt: "Newborn baby held by parents with city skyline — newborn photography session",
  },
  {
    src: "/photos/kids-kiss-couch.jpg",
    alt: "Brother kissing sister on the couch — candid lifestyle family photography",
  },
  {
    src: "/photos/family-walking-playful.jpg",
    alt: "Family walking together, parents swinging toddler — playful family photography",
  },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ——— DESKTOP HERO ——— */}
      <section className="relative hidden md:block">
        {/* Pink background — fixed height, image overflows BELOW it */}
        <div
          className="relative"
          style={{ backgroundColor: "#E8D5CE" }}
        >
          <div className="relative mx-auto max-w-7xl px-8 lg:px-12">
            <div className="grid grid-cols-2 items-start min-h-[75vh]">
              
              {/* Text — left side */}
              <div className="relative z-20 py-28 lg:py-36 pr-8">
                <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-charcoal/50">
                  Skokie &amp; Chicago North Shore
                </p>
                
                <h1 className="font-[family-name:var(--font-cormorant)] text-5xl lg:text-6xl xl:text-7xl leading-[0.95] text-white mb-10">
                  Seeing the good in <em className="italic">your</em> world
                </h1>

                <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-charcoal/60">
                  Families. Newborns.
                </p>
                <p className="mb-8 text-sm font-medium uppercase tracking-[0.2em] text-charcoal/60">
                  Milestones. Events.
                </p>

                <Link
                  href="/contact"
                  className="inline-block border border-charcoal bg-charcoal px-8 py-3 text-sm font-medium uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-charcoal"
                >
                  Book Your Session
                </Link>
              </div>

              {/* Image carousel — starts below the top of the pink, overflows past the bottom */}
              <div className="relative z-10 pt-12 lg:pt-16">
                <div 
                  className="relative aspect-[2/3] w-full overflow-hidden"
                  style={{ marginBottom: "-18%" }}
                >
                  {heroSlides.map((slide, i) => (
                    <div
                      key={i}
                      className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
                        i === current ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        className="object-cover"
                        style={{ objectPosition: slide.objectPosition ?? "center top" }}
                        sizes="50vw"
                        priority={i === 0}
                        quality={85}
                      />
                    </div>
                  ))}

                  {/* Slide indicators */}
                  <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 flex gap-2">
                    {heroSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-2 rounded-full transition-all duration-500 ${
                          i === current
                            ? "w-8 bg-white/80"
                            : "w-2 bg-white/40 hover:bg-white/60"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer below pink to accommodate the image overflow */}
        <div className="h-48 bg-[#FAF9F6]" />
      </section>

      {/* ——— MOBILE HERO ——— */}
      <section className="relative md:hidden">
        {/* Pink background behind image */}
        <div style={{ backgroundColor: "#E8D5CE" }}>
          {/* Pink padding above image */}
          <div className="pt-10" />
          
          {/* Image area */}
          <div className="relative w-full aspect-[5/7]">
            {heroSlides.map((slide, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
                  i === current ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  style={{ objectPosition: slide.objectPosition ?? "center top" }}
                  sizes="100vw"
                  priority={i === 0}
                  quality={80}
                />
              </div>
            ))}

            {/* Slide indicators */}
            <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 flex gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === current
                      ? "w-6 bg-white/80"
                      : "w-1.5 bg-white/40"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Text content below image on mobile */}
        <div className="px-6 py-12 text-center" style={{ backgroundColor: "#E8D5CE" }}>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-charcoal/50">
            Skokie &amp; Chicago North Shore
          </p>
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl leading-[1.05] text-charcoal mb-5">
            Seeing the good in <em className="italic">your</em> world
          </h1>
          <p className="mb-8 text-xs font-medium uppercase tracking-[0.2em] text-charcoal/60">
            Families · Newborns · Milestones · Events
          </p>
          <Link
            href="/contact"
            className="inline-block border border-charcoal bg-charcoal px-7 py-3 text-xs font-medium uppercase tracking-widest text-white transition-all hover:bg-transparent hover:text-charcoal"
          >
            Book Your Session
          </Link>
        </div>
      </section>
    </>
  );
}
