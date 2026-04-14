"use client";

import { useState, useCallback, useEffect } from "react";

export interface GalleryImage {
  src?: string;
  alt: string;
  category?: string;
  label?: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  categories?: string[];
}

export default function GalleryGrid({ images, categories }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.classList.add("lightbox-open");
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.classList.remove("lightbox-open");
  }, []);

  const nextImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filtered.length);
    }
  }, [lightboxIndex, filtered.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filtered.length) % filtered.length
      );
    }
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  return (
    <>
      {/* Category Filters */}
      {categories && categories.length > 0 && (
        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 text-sm font-medium uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? "bg-charcoal text-white"
                  : "border border-charcoal/20 text-charcoal hover:border-charcoal"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((img, i) => (
          <button
            key={`${img.alt}-${i}`}
            onClick={() => openLightbox(i)}
            className="group relative aspect-square overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-sage bg-[#E0E0E0]"
          >
            <div
              className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:bg-[#D5D5D5]"
              role="img"
              aria-label={img.alt}
            >
              <div className="flex flex-col items-center gap-2 text-[#999] select-none">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-60"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                {img.label && (
                  <span className="text-xs font-medium tracking-wider uppercase opacity-50">
                    {img.label}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center text-white hover:text-white/70"
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center text-white hover:text-white/70"
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Placeholder in lightbox */}
          <div
            className="relative h-[80vh] w-[90vw] max-w-5xl bg-[#D5D5D5] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            role="img"
            aria-label={filtered[lightboxIndex].alt}
          >
            <div className="flex flex-col items-center gap-3 text-[#999] select-none">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-60"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span className="text-sm font-medium tracking-wider uppercase opacity-50">
                {filtered[lightboxIndex].label || "Photo"}
              </span>
              <p className="text-xs opacity-40 max-w-md text-center mt-2">
                {filtered[lightboxIndex].alt}
              </p>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center text-white hover:text-white/70"
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/70">
            {lightboxIndex + 1} / {filtered.length}
          </div>
        </div>
      )}
    </>
  );
}
