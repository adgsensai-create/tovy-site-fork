"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Thin fixed bar at the bottom of the viewport for service landing pages.
// Appears only after the visitor scrolls past the hero (where a CTA is
// already visible), and can be dismissed.
export default function StickyBookingBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 border-t border-charcoal/10 bg-white/95 backdrop-blur-sm transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5 sm:justify-center sm:gap-6">
        <p className="text-sm text-charcoal">
          Ready to book?{" "}
          <span className="hidden sm:inline text-charcoal-light">
            Sessions start at $200
          </span>
        </p>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/contact"
            className="shrink-0 bg-sage px-5 py-1.5 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-sage-dark"
          >
            Book Now
          </Link>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss booking bar"
            className="flex h-8 w-8 shrink-0 items-center justify-center text-charcoal/40 transition-colors hover:text-charcoal"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
