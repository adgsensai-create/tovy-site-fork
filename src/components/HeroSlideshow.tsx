"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const heroSlides: { src: string; alt: string; objectPosition?: string }[] = [
  {
    src: "/photos/hero-engagement-lift.jpg",
    alt: "Engaged couple embracing beneath hanging flowers at Garfield Park Conservatory in Chicago",
  },
  {
    src: "/photos/boy-curtain-window.jpg",
    alt: "Little boy peeking out from window blinds — candid childhood photography",
  },
  {
    src: "/photos/hero-mom-lift-kiss-bw.jpg",
    alt: "Black and white photo of mom lifting and kissing her laughing curly-haired daughter by the pond — family photography",
  },
  {
    src: "/photos/hero-newborn-window-floral.jpg",
    alt: "Parents cradling their newborn baby in a floral romper by the window — natural light newborn photography",
  },
  {
    src: "/photos/hero-kids-lake-framed.jpg",
    alt: "Four kids by the lake framed through their parents holding hands — creative family photography",
  },
  {
    src: "/photos/hero-boy-laugh-mom-bw.jpg",
    alt: "Black and white photo of laughing boy sticking his tongue out on mom's lap — playful family photography",
  },
  {
    src: "/photos/hero-family-four-canopy-2.jpg",
    alt: "Family of four smiling under a green tree canopy — daughter on dad's shoulders, baby on mom's hip",
  },
  {
    src: "/photos/hero-family-kids-lift.jpg",
    alt: "Parents lifting their laughing toddler and daughter toward the camera in the park — playful family photography",
  },
  {
    src: "/photos/hero-yoga-lake-sunset.jpg",
    alt: "Dancer's pose yoga portrait by the lake at sunset — lifestyle photography",
  },
  {
    src: "/photos/hero-newborn-garden-tree.jpg",
    alt: "Parents cradling their newborn baby girl in the garden — outdoor newborn photography",
  },
  {
    src: "/photos/hero-family-baby-smile.jpg",
    alt: "Smiling baby held toward the camera by parents during an in-home family session",
    objectPosition: "50% top",
  },
  {
    src: "/photos/newborn-skyline.jpg",
    alt: "Newborn baby held by parents with city skyline — newborn photography session",
  },
  {
    src: "/photos/parents-newborn-window.jpg",
    alt: "Parents holding newborn baby by window — natural light newborn photography",
  },
  {
    src: "/photos/hero-lakeside-hug-2.jpg",
    alt: "Two women hugging lakeside in white dresses at golden hour — candid photography",
  },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  // Depending on `current` resets the 4s timer whenever the slide changes,
  // so a manual swipe gets a full 4 seconds before auto-advance resumes.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [current]);

  // Touch swipe support
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current || e.changedTouches.length === 0) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;
    // Only treat as a swipe when clearly horizontal (don't hijack page scroll)
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx < 0) setCurrent((prev) => (prev + 1) % heroSlides.length);
      else setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    }
  };

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
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
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
          <div
            className="relative w-full aspect-[5/7]"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
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
