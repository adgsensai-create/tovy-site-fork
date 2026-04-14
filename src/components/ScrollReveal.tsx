"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Animation = "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale-in";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: Animation;
  delay?: number; // ms
  duration?: number; // ms
  className?: string;
  once?: boolean; // only animate once (default true)
  threshold?: number; // 0-1
}

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 800,
  className = "",
  once = true,
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("scroll-revealed");
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.classList.remove("scroll-revealed");
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, once, threshold]);

  return (
    <div
      ref={ref}
      className={`scroll-reveal scroll-${animation} ${className}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
}
