"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { formatDateOnly } from "@/lib/date";

interface Photo { id: string; url: string; filename: string; }
interface GalleryData {
  clientName: string; sessionType: string; sessionDate: string;
  expiresAt: string; photos: Photo[]; coverPhotoId: string | null;
  coverPosition?: "top" | "center" | "bottom";
  message?: string;
}

// ——— Scroll reveal ———
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ——— Gallery Wall Carousel ———
const galleryWallSlides = [
  {
    src: "/photos/gallery-walls/wall-08.png",
    alt: "Gallery wall layout - seven image collage with rattan chair",
    description: "A ready-to-hang collection designed to turn your favorite moments into a display you'll see every day. Includes prints, hardware, and a hanging guide. No measuring, no guessing. The layout shown features 7 prints in a mix of sizes.",
    price: "$350",
  },
  {
    src: "/photos/gallery-walls/wall-02.png",
    alt: "Gallery wall layout - three panel horizontal display",
    description: "A clean, modern trio. Three frameless canvases that make a statement without taking over the room.",
    price: "$1,000",
  },
  {
    src: "/photos/gallery-walls/wall-03.png",
    alt: "Gallery wall layout - eight frame gallery arrangement",
    description: "The full gallery wall. Eight framed pieces in a curated layout that turns a blank wall into the favorite spot in your home.",
    price: "$1,750",
  },
  {
    src: "/photos/gallery-walls/wall-01.png",
    alt: "Gallery wall layout - five float frame arrangement",
    description: "Five float frames with a warm, layered feel. A premium arrangement that draws you in every time you walk by.",
    price: "$2,000",
  },
];

const galleryWallSlides5xbsrns6 = [
  {
    src: "/photos/gallery-walls-5xbsrns6/detail-frame.png",
    alt: "The Detail Frame - four newborn detail photos in one square gold frame",
    description: "4 photos in one square frame. Hands, nose, toes, all together in one place.",
    price: "$200",
  },
  {
    src: "/photos/gallery-walls-5xbsrns6/triptych.png",
    alt: "The Triptych - three matching red frames with pink mat",
    description: "3 matching frames, bold color, soft mat. A pop of personality for the nursery.",
    price: "$425",
  },
  {
    src: "/photos/gallery-walls-5xbsrns6/newborn-trio.png",
    alt: "The Newborn Trio - three mixed style frames with portrait and details",
    description: "3 frames, mixed styles. One big portrait paired with the tiny details.",
    price: "$500",
  },
  {
    src: "/photos/gallery-walls-5xbsrns6/column.png",
    alt: "The Column - four photos stacked in a single tall dark frame",
    description: "4 photos stacked in a single tall frame. Fits perfectly in a nursery or hallway.",
    price: "$125",
  },
];

const galleryWallSlides3myjm0yh = [
  {
    src: "/photos/gallery-walls-3myjm0yh/trio-v2.png",
    alt: "The Trio - three silver frames with black and white photos above a bench",
    description: "3 frames, clean and simple. Perfect above a bench, console, or bed.",
    price: "$350",
  },
  {
    src: "/photos/gallery-walls-3myjm0yh/staircase.png",
    alt: "The Staircase - eight frames following a staircase wall",
    description: "8 frames, designed to follow a staircase wall. A statement every time you walk by.",
    price: "$1,100",
  },
  {
    src: "/photos/gallery-walls-3myjm0yh/grid.png",
    alt: "The Grid - eight frames in a clean uniform layout above a sofa",
    description: "8 frames, clean, uniform layout. Bold and modern above a sofa or in a hallway.",
    price: "$1,150",
  },
  {
    src: "/photos/gallery-walls-3myjm0yh/mixed.png",
    alt: "The Mixed Gallery - nine mixed frames above a bench",
    description: "9 frames, mixed sizes and frame styles. The showstopper.",
    price: "$1,200",
  },
];

function GalleryWallCarousel({ slides = galleryWallSlides }: { slides?: typeof galleryWallSlides }) {
  const [current, setCurrent] = useState(0);
  const total = slides.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <div className="relative">
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg shadow-lg bg-white">
        {slides.map((slide, i) => (
          <img
            key={i}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      {/* Arrows */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center transition-colors"
            aria-label="Previous"
          >
            <svg className="w-5 h-5 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center transition-colors"
            aria-label="Next"
          >
            <svg className="w-5 h-5 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      {/* Details */}
      <div className="text-center mt-6 min-h-[6rem]">
        <p className="text-charcoal-light text-sm md:text-base leading-relaxed max-w-2xl mx-auto">{slides[current].description}</p>
        <p className="font-[family-name:var(--font-cormorant)] text-2xl text-sage mt-3">{slides[current].price}</p>
      </div>
      {/* Dots */}
      {total > 1 && (
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              i === current ? "bg-sage" : "bg-charcoal/20"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      )}
    </div>
  );
}

// ——— Album Flipbook (9gy4ze1g) ———
const albumPages9gy4ze1g = [
  "/photos/album-9gy4ze1g/00-cover.jpg",
  "/photos/album-9gy4ze1g/01-page-1.jpg",
  "/photos/album-9gy4ze1g/02-page-2.jpg",
  "/photos/album-9gy4ze1g/03-page-3.jpg",
  "/photos/album-9gy4ze1g/04-page-4.jpg",
  "/photos/album-9gy4ze1g/05-page-5.jpg",
  "/photos/album-9gy4ze1g/06-page-6.jpg",
  "/photos/album-9gy4ze1g/07-page-7.jpg",
  "/photos/album-9gy4ze1g/08-page-8.jpg",
  "/photos/album-9gy4ze1g/09-page-9.jpg",
  "/photos/album-9gy4ze1g/10-page-10.jpg",
  "/photos/album-9gy4ze1g/11-page-11.jpg",
  "/photos/album-9gy4ze1g/12-endleaf.jpg",
];

function AlbumFlipbook({ pages }: { pages: string[] }) {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState<null | "next" | "prev">(null);
  const total = pages.length;

  const go = (dir: "next" | "prev") => {
    if (flipping) return;
    if (dir === "next" && current >= total - 1) return;
    if (dir === "prev" && current <= 0) return;
    setFlipping(dir);
    setTimeout(() => {
      setCurrent((c) => (dir === "next" ? c + 1 : c - 1));
      setFlipping(null);
    }, 450);
  };

  const nextIndex = Math.min(current + 1, total - 1);
  const prevIndex = Math.max(current - 1, 0);

  return (
    <div className="relative">
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: "2400 / 1274", perspective: "2000px" }}
      >
        {/* Static back layer: the page we're flipping to */}
        <img
          src={pages[flipping === "next" ? nextIndex : flipping === "prev" ? prevIndex : current]}
          alt={`Album page ${current + 1}`}
          className="absolute inset-0 w-full h-full object-contain"
          draggable={false}
        />
        {/* Flipping layer: the current page rotating away */}
        {flipping && (
          <div
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              transformOrigin: flipping === "next" ? "left center" : "right center",
              animation: `${flipping === "next" ? "flipNext" : "flipPrev"} 0.45s ease-in-out forwards`,
            }}
          >
            <img
              src={pages[current]}
              alt={`Album page ${current + 1}`}
              className="absolute inset-0 w-full h-full object-contain"
              style={{ backfaceVisibility: "hidden" }}
              draggable={false}
            />
          </div>
        )}
        <style jsx>{`
          @keyframes flipNext {
            0% { transform: rotateY(0deg); box-shadow: 0 0 0 rgba(0,0,0,0); }
            100% { transform: rotateY(-180deg); box-shadow: -20px 0 40px rgba(0,0,0,0.15); }
          }
          @keyframes flipPrev {
            0% { transform: rotateY(0deg); box-shadow: 0 0 0 rgba(0,0,0,0); }
            100% { transform: rotateY(180deg); box-shadow: 20px 0 40px rgba(0,0,0,0.15); }
          }
        `}</style>
      </div>
      {/* Arrows */}
      <button
        onClick={() => go("prev")}
        disabled={current === 0 || !!flipping}
        className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <svg className="w-5 h-5 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => go("next")}
        disabled={current === total - 1 || !!flipping}
        className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <svg className="w-5 h-5 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {/* Page indicator */}
      <p className="text-center text-xs text-charcoal/60 mt-4 uppercase tracking-wider">
        {current === 0 ? "Cover" : `Spread ${current} of ${total - 1}`}
      </p>
    </div>
  );
}

// ——— Grid photo with favorites + share ———
function GridPhoto({ photo, index, onClick, isFav, onToggleFav, onShare }: {
  photo: Photo; index: number; onClick: () => void;
  isFav: boolean; onToggleFav: () => void; onShare: () => void;
}) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`overflow-hidden cursor-pointer group relative transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${(index % 5) * 60}ms` }}
    >
      <div className="aspect-square relative overflow-hidden" onClick={onClick}>
        <img
          src={photo.url}
          alt={`Photo ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      {/* Desktop overlay buttons */}
      <div className="absolute top-2 right-2 gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 hidden md:flex">
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFav(); }}
          className={`w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm transition-colors ${
            isFav ? "bg-rose/90 text-white" : "bg-black/30 text-white/70 hover:text-white"
          }`}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          {isFav ? "♥" : "♡"}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onShare(); }}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white/70 hover:text-white transition-colors"
          aria-label="Share photo"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/>
          </svg>
        </button>
      </div>

      {/* Mobile controls */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-2 bg-gradient-to-t from-black/45 to-transparent md:hidden">
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFav(); }}
          className={`w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-sm transition-colors ${
            isFav ? "bg-rose/90 text-white" : "bg-black/35 text-white"
          }`}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          {isFav ? "♥" : "♡"}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onShare(); }}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-black/35 backdrop-blur-sm text-white transition-colors"
          aria-label="Share photo"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ——— Slideshow ———
function Slideshow({ photos, onClose }: { photos: Photo[]; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [paused, setPaused] = useState(false);

  const advance = useCallback(() => {
    setLoaded(false);
    setIdx((i) => (i + 1) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(advance, 4000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [idx, paused, advance]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") advance();
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + photos.length) % photos.length);
      if (e.key === " ") { e.preventDefault(); setPaused((p) => !p); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, advance, photos.length]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center" onClick={() => setPaused((p) => !p)}>
      <img
        key={photos[idx].id}
        src={photos[idx].url}
        alt=""
        className={`max-h-screen max-w-full object-contain transition-opacity duration-1000 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
        <div
          className="h-full bg-white/40"
          style={{
            width: paused ? `${((idx + 1) / photos.length) * 100}%` : "100%",
            transition: paused ? "none" : "width 4s linear",
            animation: paused ? "none" : undefined,
          }}
          key={`${idx}-${paused}`}
        />
      </div>
      {/* Controls overlay */}
      <div className="absolute top-5 right-5 flex gap-3 z-10">
        <button onClick={(e) => { e.stopPropagation(); setPaused((p) => !p); }}
          className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white">
          {paused ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20"/></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="4" width="4" height="16"/><rect x="15" y="4" width="4" height="16"/></svg>
          )}
        </button>
        <button onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="4" y1="4" x2="16" y2="16"/><line x1="16" y1="4" x2="4" y2="16"/>
          </svg>
        </button>
      </div>
      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-sm">
        {idx + 1} / {photos.length}{paused ? " — paused" : ""}
      </div>
    </div>
  );
}

// ——— Main Page ———
export default function ClientGalleryPage() {
  const [gallery, setGallery] = useState<GalleryData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [lightboxLoaded, setLightboxLoaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFavOnly, setShowFavOnly] = useState(false);
  const [slideshow, setSlideshow] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const touchStart = useRef<{ x: number; y: number; fingers: number; dist: number } | null>(null);
  const panStart = useRef({ x: 0, y: 0 });
  const lastTap = useRef(0);
  const params = useParams();
  const galleryId = params.id as string;

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`gallery-favs-${galleryId}`);
      if (stored) setFavorites(new Set(JSON.parse(stored)));
    } catch { /* ignore */ }
  }, [galleryId]);

  function saveFavorites(newFavs: Set<string>) {
    setFavorites(newFavs);
    localStorage.setItem(`gallery-favs-${galleryId}`, JSON.stringify([...newFavs]));
  }

  function toggleFav(photoId: string) {
    const next = new Set(favorites);
    if (next.has(photoId)) next.delete(photoId); else next.add(photoId);
    saveFavorites(next);
  }

  useEffect(() => {
    fetch(`/api/galleries/${galleryId}`)
      .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
      .then((data) => {
        // Trust the server's sort order — it uses a smart order that puts
        // real camera filenames (IMG_*, DSC*) in numeric order and puts
        // generated blob-name photos at the end in upload time order.
        // (Re-sorting here would drop the upload-time secondary key.)
        setGallery(data);
        setLoading(false);
      })
      .catch(() => { setError(true); setLoading(false); });
  }, [galleryId]);

  function openLightbox(idx: number) { setLightboxLoaded(false); setZoom(1); setPan({ x: 0, y: 0 }); setLightbox(idx); }
  function resetZoom() { setZoom(1); setPan({ x: 0, y: 0 }); }
  function goToPhoto(idx: number) { resetZoom(); setLightboxLoaded(false); setLightbox(idx); }

  function handleDoubleTap(e: React.TouchEvent) {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      e.preventDefault();
      if (zoom > 1) resetZoom();
      else {
        setZoom(2.5);
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setPan({ x: -(e.changedTouches[0].clientX - rect.left - rect.width / 2), y: -(e.changedTouches[0].clientY - rect.top - rect.height / 2) });
      }
    }
    lastTap.current = now;
  }
  function getTouchDist(t: React.TouchList) { if (t.length < 2) return 0; const dx = t[0].clientX - t[1].clientX, dy = t[0].clientY - t[1].clientY; return Math.sqrt(dx*dx+dy*dy); }

  async function downloadPhoto(photo: Photo) {
    const res = await fetch(photo.url); const blob = await res.blob();
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = photo.filename; a.click(); URL.revokeObjectURL(a.href);
  }
  async function downloadPhotos(photos: Photo[]) {
    if (!photos.length) return;
    setDownloading(true);
    for (const photo of photos) {
      await downloadPhoto(photo);
      await new Promise((r) => setTimeout(r, 500));
    }
    setDownloading(false);
  }

  async function downloadAll() {
    if (!gallery) return;
    await downloadPhotos(gallery.photos);
  }

  async function downloadFavorites() {
    if (!gallery) return;
    const favoritePhotos = gallery.photos.filter((photo) => favorites.has(photo.id));
    await downloadPhotos(favoritePhotos);
  }

  async function sharePhoto(photo: Photo) {
    if (navigator.share) {
      try { await navigator.share({ title: "Check out this photo!", url: photo.url }); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(photo.url);
      alert("Photo link copied!");
    }
  }

  // Keyboard nav
  useEffect(() => {
    if (lightbox === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight" && gallery) setLightbox((p) => p !== null ? Math.min(p + 1, gallery.photos.length - 1) : null);
      if (e.key === "ArrowLeft") setLightbox((p) => p !== null ? Math.max(p - 1, 0) : null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, gallery]);

  useEffect(() => { document.body.style.overflow = (lightbox !== null || slideshow) ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [lightbox, slideshow]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-sage/30 border-t-sage rounded-full animate-spin mx-auto mb-4" />
        <p className="text-charcoal-light text-sm tracking-wider uppercase">Loading your gallery</p>
      </div>
    </div>
  );

  if (error || !gallery) return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-cream">
      <div className="text-center max-w-md">
        <h1 className="font-[family-name:var(--font-cormorant)] text-3xl text-charcoal mb-4">Gallery Not Available</h1>
        <p className="text-charcoal-light mb-6">This gallery may have expired or doesn&apos;t exist.</p>
        <Link href="/contact" className="inline-block px-6 py-2.5 bg-sage text-white text-sm uppercase tracking-wider hover:bg-sage-dark transition-colors">Contact Gabi</Link>
      </div>
    </div>
  );

  const daysLeft = Math.ceil((new Date(gallery.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const formattedDate = formatDateOnly(gallery.sessionDate, "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const displayPhotos = showFavOnly ? gallery.photos.filter((p) => favorites.has(p.id)) : gallery.photos;

  return (
    <>
      {/* Slideshow */}
      {slideshow && <Slideshow photos={gallery.photos} onClose={() => setSlideshow(false)} />}

      {/* Hero — rose banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 px-6 overflow-hidden" style={{ background: "linear-gradient(170deg, #C9ADA7 0%, #C4A39A 30%, #B8948A 70%, #C4A39A 100%)" }}>
        {/* Botanical line art — left (draws in + drifts up) */}
        <svg className="absolute left-0 top-0 h-full w-48 md:w-80 opacity-[0.14] animate-[botanicalDrift_20s_ease-in-out_infinite]" viewBox="0 0 220 400" fill="none" preserveAspectRatio="xMinYMid slice">
          {/* Main stem */}
          <path d="M130 400C130 300 60 280 40 200C20 120 80 80 100 0" stroke="white" strokeWidth="1.2" className="animate-[botanicalDraw_3s_ease-out_forwards]" style={{ strokeDasharray: 600, strokeDashoffset: 600 }}/>
          {/* Branches */}
          <path d="M40 200C65 188 95 165 82 130" stroke="white" strokeWidth="0.8" className="animate-[botanicalDraw_2s_ease-out_0.8s_forwards]" style={{ strokeDasharray: 200, strokeDashoffset: 200 }}/>
          <path d="M82 130C88 120 85 105 75 100" stroke="white" strokeWidth="0.6" className="animate-[botanicalDraw_1.5s_ease-out_1.2s_forwards]" style={{ strokeDasharray: 100, strokeDashoffset: 100 }}/>
          <path d="M40 200C15 175 8 145 30 110" stroke="white" strokeWidth="0.8" className="animate-[botanicalDraw_2s_ease-out_1s_forwards]" style={{ strokeDasharray: 200, strokeDashoffset: 200 }}/>
          <path d="M30 110C25 98 30 85 40 82" stroke="white" strokeWidth="0.6" className="animate-[botanicalDraw_1.5s_ease-out_1.5s_forwards]" style={{ strokeDasharray: 100, strokeDashoffset: 100 }}/>
          <path d="M65 260C90 248 115 225 100 190" stroke="white" strokeWidth="0.8" className="animate-[botanicalDraw_2s_ease-out_1.3s_forwards]" style={{ strokeDasharray: 200, strokeDashoffset: 200 }}/>
          <path d="M65 260C38 238 28 205 50 170" stroke="white" strokeWidth="0.8" className="animate-[botanicalDraw_2s_ease-out_1.5s_forwards]" style={{ strokeDasharray: 200, strokeDashoffset: 200 }}/>
          <path d="M85 325C112 312 130 288 118 255" stroke="white" strokeWidth="0.8" className="animate-[botanicalDraw_2s_ease-out_1.8s_forwards]" style={{ strokeDasharray: 200, strokeDashoffset: 200 }}/>
          <path d="M85 325C58 305 48 270 68 238" stroke="white" strokeWidth="0.8" className="animate-[botanicalDraw_2s_ease-out_2s_forwards]" style={{ strokeDasharray: 200, strokeDashoffset: 200 }}/>
          {/* Flower buds — bloom in with scale */}
          <g className="animate-[bloomIn_1s_ease-out_2.5s_forwards]" style={{ opacity: 0, transformOrigin: "75px 100px" }}>
            <ellipse cx="71" cy="96" rx="5" ry="8" fill="white" opacity="0.7" transform="rotate(-40 71 96)"/>
            <ellipse cx="79" cy="96" rx="5" ry="8" fill="white" opacity="0.6" transform="rotate(40 79 96)"/>
            <ellipse cx="75" cy="93" rx="4" ry="7" fill="white" opacity="0.6" transform="rotate(0 75 93)"/>
            <ellipse cx="69" cy="100" rx="4" ry="6" fill="white" opacity="0.5" transform="rotate(-70 69 100)"/>
            <ellipse cx="81" cy="100" rx="4" ry="6" fill="white" opacity="0.5" transform="rotate(70 81 100)"/>
            <circle cx="75" cy="99" r="2.5" fill="white" opacity="0.8"/>
          </g>
          <g className="animate-[bloomIn_1s_ease-out_2.8s_forwards]" style={{ opacity: 0, transformOrigin: "40px 82px" }}>
            <ellipse cx="36" cy="78" rx="4" ry="7" fill="white" opacity="0.65" transform="rotate(-30 36 78)"/>
            <ellipse cx="44" cy="78" rx="4" ry="7" fill="white" opacity="0.55" transform="rotate(30 44 78)"/>
            <ellipse cx="40" cy="76" rx="3.5" ry="6" fill="white" opacity="0.55" transform="rotate(0 40 76)"/>
            <circle cx="40" cy="80" r="2" fill="white" opacity="0.75"/>
          </g>
          <g className="animate-[bloomIn_1s_ease-out_3.1s_forwards]" style={{ opacity: 0, transformOrigin: "99px 189px" }}>
            <ellipse cx="95" cy="185" rx="5" ry="8" fill="white" opacity="0.65" transform="rotate(-35 95 185)"/>
            <ellipse cx="103" cy="185" rx="5" ry="8" fill="white" opacity="0.55" transform="rotate(35 103 185)"/>
            <ellipse cx="99" cy="183" rx="4" ry="7" fill="white" opacity="0.55" transform="rotate(0 99 183)"/>
            <circle cx="99" cy="188" r="2.5" fill="white" opacity="0.75"/>
          </g>
          <g className="animate-[bloomIn_1s_ease-out_3.4s_forwards]" style={{ opacity: 0, transformOrigin: "50px 168px" }}>
            <ellipse cx="46" cy="164" rx="4" ry="6.5" fill="white" opacity="0.6" transform="rotate(-35 46 164)"/>
            <ellipse cx="54" cy="164" rx="4" ry="6.5" fill="white" opacity="0.5" transform="rotate(35 54 164)"/>
            <circle cx="50" cy="167" r="2" fill="white" opacity="0.7"/>
          </g>
          <g className="animate-[bloomIn_1s_ease-out_3.7s_forwards]" style={{ opacity: 0, transformOrigin: "118px 255px" }}>
            <ellipse cx="114" cy="251" rx="4" ry="7" fill="white" opacity="0.6" transform="rotate(-30 114 251)"/>
            <ellipse cx="122" cy="251" rx="4" ry="7" fill="white" opacity="0.5" transform="rotate(30 122 251)"/>
            <circle cx="118" cy="254" r="2" fill="white" opacity="0.7"/>
          </g>
          <g className="animate-[bloomIn_1s_ease-out_4s_forwards]" style={{ opacity: 0, transformOrigin: "68px 236px" }}>
            <ellipse cx="64" cy="232" rx="4" ry="6.5" fill="white" opacity="0.6" transform="rotate(-30 64 232)"/>
            <ellipse cx="72" cy="232" rx="4" ry="6.5" fill="white" opacity="0.5" transform="rotate(30 72 232)"/>
            <circle cx="68" cy="235" r="2" fill="white" opacity="0.7"/>
          </g>
        </svg>
        {/* Botanical — right (mirrored, draws in + drifts) */}
        <svg className="absolute right-0 top-0 h-full w-48 md:w-80 opacity-[0.14] scale-x-[-1] animate-[botanicalDrift_20s_ease-in-out_1s_infinite]" viewBox="0 0 220 400" fill="none" preserveAspectRatio="xMinYMid slice">
          <path d="M130 400C130 300 60 280 40 200C20 120 80 80 100 0" stroke="white" strokeWidth="1.2" className="animate-[botanicalDraw_3s_ease-out_0.3s_forwards]" style={{ strokeDasharray: 600, strokeDashoffset: 600 }}/>
          <path d="M40 200C65 188 95 165 82 130" stroke="white" strokeWidth="0.8" className="animate-[botanicalDraw_2s_ease-out_1s_forwards]" style={{ strokeDasharray: 200, strokeDashoffset: 200 }}/>
          <path d="M82 130C88 120 85 105 75 100" stroke="white" strokeWidth="0.6" className="animate-[botanicalDraw_1.5s_ease-out_1.4s_forwards]" style={{ strokeDasharray: 100, strokeDashoffset: 100 }}/>
          <path d="M40 200C15 175 8 145 30 110" stroke="white" strokeWidth="0.8" className="animate-[botanicalDraw_2s_ease-out_1.2s_forwards]" style={{ strokeDasharray: 200, strokeDashoffset: 200 }}/>
          <path d="M30 110C25 98 30 85 40 82" stroke="white" strokeWidth="0.6" className="animate-[botanicalDraw_1.5s_ease-out_1.7s_forwards]" style={{ strokeDasharray: 100, strokeDashoffset: 100 }}/>
          <path d="M65 260C90 248 115 225 100 190" stroke="white" strokeWidth="0.8" className="animate-[botanicalDraw_2s_ease-out_1.5s_forwards]" style={{ strokeDasharray: 200, strokeDashoffset: 200 }}/>
          <path d="M65 260C38 238 28 205 50 170" stroke="white" strokeWidth="0.8" className="animate-[botanicalDraw_2s_ease-out_1.7s_forwards]" style={{ strokeDasharray: 200, strokeDashoffset: 200 }}/>
          <path d="M85 325C112 312 130 288 118 255" stroke="white" strokeWidth="0.8" className="animate-[botanicalDraw_2s_ease-out_2s_forwards]" style={{ strokeDasharray: 200, strokeDashoffset: 200 }}/>
          <path d="M85 325C58 305 48 270 68 238" stroke="white" strokeWidth="0.8" className="animate-[botanicalDraw_2s_ease-out_2.2s_forwards]" style={{ strokeDasharray: 200, strokeDashoffset: 200 }}/>
          {/* Flower buds — bloom in */}
          <g className="animate-[bloomIn_1s_ease-out_2.7s_forwards]" style={{ opacity: 0, transformOrigin: "75px 100px" }}>
            <ellipse cx="71" cy="96" rx="5" ry="8" fill="white" opacity="0.7" transform="rotate(-40 71 96)"/>
            <ellipse cx="79" cy="96" rx="5" ry="8" fill="white" opacity="0.6" transform="rotate(40 79 96)"/>
            <ellipse cx="75" cy="93" rx="4" ry="7" fill="white" opacity="0.6" transform="rotate(0 75 93)"/>
            <circle cx="75" cy="99" r="2.5" fill="white" opacity="0.8"/>
          </g>
          <g className="animate-[bloomIn_1s_ease-out_3s_forwards]" style={{ opacity: 0, transformOrigin: "40px 82px" }}>
            <ellipse cx="36" cy="78" rx="4" ry="7" fill="white" opacity="0.65" transform="rotate(-30 36 78)"/>
            <ellipse cx="44" cy="78" rx="4" ry="7" fill="white" opacity="0.55" transform="rotate(30 44 78)"/>
            <circle cx="40" cy="80" r="2" fill="white" opacity="0.75"/>
          </g>
          <g className="animate-[bloomIn_1s_ease-out_3.3s_forwards]" style={{ opacity: 0, transformOrigin: "99px 189px" }}>
            <ellipse cx="95" cy="185" rx="5" ry="8" fill="white" opacity="0.65" transform="rotate(-35 95 185)"/>
            <ellipse cx="103" cy="185" rx="5" ry="8" fill="white" opacity="0.55" transform="rotate(35 103 185)"/>
            <circle cx="99" cy="188" r="2.5" fill="white" opacity="0.75"/>
          </g>
          <g className="animate-[bloomIn_1s_ease-out_3.6s_forwards]" style={{ opacity: 0, transformOrigin: "118px 255px" }}>
            <ellipse cx="114" cy="251" rx="4" ry="7" fill="white" opacity="0.6" transform="rotate(-30 114 251)"/>
            <ellipse cx="122" cy="251" rx="4" ry="7" fill="white" opacity="0.5" transform="rotate(30 122 251)"/>
            <circle cx="118" cy="254" r="2" fill="white" opacity="0.7"/>
          </g>
        </svg>

        {/* Content */}
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-white/50 text-[10px] md:text-xs uppercase tracking-[0.4em] mb-6 animate-[fadeInUp_0.8s_ease-out]">
            {gallery.sessionType} Session &middot; {formattedDate}
          </p>

          {/* Ornament */}
          <div className="flex items-center justify-center gap-4 mb-7 animate-[fadeInUp_0.8s_ease-out_0.1s_both]">
            <div className="w-10 md:w-16 h-px bg-gradient-to-r from-transparent to-white/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="w-10 md:w-16 h-px bg-gradient-to-l from-transparent to-white/30" />
          </div>

          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-6xl lg:text-7xl text-white font-light leading-[1.1] animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
            {gallery.clientName}
          </h1>

          {/* Second ornament */}
          <div className="flex items-center justify-center gap-3 mt-7 mb-4 animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
            <div className="w-6 h-px bg-white/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="w-6 h-px bg-white/20" />
          </div>

          <p className="text-white/35 text-[10px] uppercase tracking-[0.35em] animate-[fadeInUp_0.8s_ease-out_0.4s_both]">
            Tovy Photography
          </p>
        </div>
      </section>

      {/* Message + Actions */}
      <section className="px-6 md:px-8 py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center">
          {gallery.message ? (
            <p className="font-[family-name:var(--font-cormorant)] text-xl md:text-2xl text-charcoal leading-relaxed italic mb-8">&ldquo;{gallery.message}&rdquo;</p>
          ) : (
            <p className="font-[family-name:var(--font-cormorant)] text-xl md:text-2xl text-charcoal leading-relaxed mb-8">Your gallery is ready. I loved every moment of this session.</p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button onClick={downloadAll} disabled={downloading}
              className="px-8 py-3 bg-charcoal text-white text-sm font-medium uppercase tracking-[0.2em] hover:bg-charcoal-light transition-colors disabled:opacity-50">
              {downloading ? "Downloading..." : `Download All — ${gallery.photos.length} Photos`}
            </button>
            {favorites.size > 0 && (
              <button onClick={downloadFavorites} disabled={downloading}
                className="px-8 py-3 border border-rose/30 text-rose text-sm font-medium uppercase tracking-[0.2em] hover:bg-rose hover:text-white transition-colors disabled:opacity-50">
                {downloading ? "Downloading..." : `Download Favorites — ${favorites.size}`}
              </button>
            )}
            <button onClick={() => setSlideshow(true)}
              className="px-8 py-3 border border-charcoal/20 text-charcoal text-sm font-medium uppercase tracking-[0.2em] hover:border-charcoal hover:bg-charcoal hover:text-white transition-colors">
              ▶ Slideshow
            </button>
          </div>

          {daysLeft <= 14 && (
            <p className="mt-6 text-amber-600 text-sm">This gallery expires in {daysLeft} {daysLeft === 1 ? "day" : "days"}. Make sure to download your photos!</p>
          )}
        </div>
      </section>

      <div className="max-w-24 mx-auto border-t border-charcoal/15" />

      {/* Filter bar */}
      <div className="max-w-7xl mx-auto px-3 md:px-6 pt-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={() => setShowFavOnly(false)}
            className={`text-xs uppercase tracking-wider px-3 py-1.5 transition-colors ${!showFavOnly ? "text-charcoal border-b-2 border-charcoal" : "text-charcoal-light hover:text-charcoal"}`}>
            All ({gallery.photos.length})
          </button>
          {favorites.size > 0 && (
            <button onClick={() => setShowFavOnly(true)}
              className={`text-xs uppercase tracking-wider px-3 py-1.5 transition-colors ${showFavOnly ? "text-rose border-b-2 border-rose" : "text-charcoal-light hover:text-rose"}`}>
              ♥ Favorites ({favorites.size})
            </button>
          )}
        </div>
        <p className="text-xs text-charcoal-light/50 hidden md:block">Hover to favorite or share</p>
        <p className="text-xs text-charcoal-light/50 md:hidden">Tap a photo to view, or use the ♥ on each image to favorite it</p>
      </div>

      {/* Photo Grid */}
      <section className="px-3 md:px-6 py-6 md:py-10">
        <div className="max-w-7xl mx-auto">
          {displayPhotos.length === 0 ? (
            <div className="text-center py-16 text-charcoal-light">
              <p>No favorites yet. Open a photo and tap ♥ to save your favorites!</p>
              <button onClick={() => setShowFavOnly(false)} className="mt-3 text-sage text-sm">View all photos</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 auto-rows-auto">
              {displayPhotos.map((photo, idx) => (
                <GridPhoto
                  key={photo.id}
                  photo={photo}
                  index={idx}
                  onClick={() => openLightbox(gallery.photos.indexOf(photo))}
                  isFav={favorites.has(photo.id)}
                  onToggleFav={() => toggleFav(photo.id)}
                  onShare={() => sharePhoto(photo)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products — shown by default on every client gallery.
          DEFAULTS: "Example Custom Photo Album" / "Example Gallery Walls" subtitles,
                    8x10 hardcover album, starting at $240.
          Excluded: galleries with their own specialized section
                    (5xbsrns6 album-only, 9gy4ze1g flipbook).
          Legacy overrides (keep older "Custom Photo Album" / 10x10 / different price):
                    mluj1gve ($325), 3myjm0yh ($160, different video), hvngbzt6 ($325). */}
      {!(galleryId === "5xbsrns6" || galleryId === "9gy4ze1g") && (() => {
        const isLegacy = galleryId === "mluj1gve" || galleryId === "3myjm0yh";
        const albumTitle = isLegacy ? "Custom Photo Album" : "Example Custom Photo Album";
        const wallsTitle = isLegacy ? "Gallery Walls" : "Example Gallery Walls";
        const albumDimensions = isLegacy ? "10x10" : "8x10";
        const albumPrice = galleryId === "3myjm0yh" ? "$160" : isLegacy ? "$325" : "$240";
        const albumVideo = galleryId === "3myjm0yh" ? "/photos/flipbook-album-2.mp4" : "/photos/flipbook-album.mp4";
        const wallsSlides = galleryId === "3myjm0yh" ? galleryWallSlides3myjm0yh : galleryWallSlides;
        return (
        <section className="px-6 py-16 md:py-24 bg-cream">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl text-charcoal text-center mb-16">
              Make your photos come to life
            </h2>

            {/* Photo Album */}
            <div className="mb-20">
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-charcoal text-center mb-8">
                {albumTitle}
              </h3>
              <video
                className="w-full rounded-lg shadow-lg"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={albumVideo} type="video/mp4" />
              </video>
              <p className="mt-8 text-charcoal-light text-sm md:text-base leading-relaxed">
                Starting at {albumPrice}. A beautiful {albumDimensions} hardcover album designed with your favorite images. Everything you see here is fully customizable. Add pages, swap photos, adjust the layout, change the cover. It&apos;s your story, designed your way. Final pricing depends on the pages and extras you choose.
              </p>
              <div className="text-center mt-6">
                <a
                  href="sms:8475422073"
                  className="inline-block px-8 py-3 bg-sage text-white text-sm font-medium uppercase tracking-[0.2em] hover:bg-sage-dark transition-colors"
                >
                  Order Today
                </a>
              </div>
            </div>

            {/* Gallery Walls */}
            <div>
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-charcoal text-center mb-2">
                {wallsTitle}
              </h3>
              <p className="text-sm text-center text-charcoal/60 mb-8">
                Everything you see here is fully customizable. These are just samples.
              </p>
              <GalleryWallCarousel slides={wallsSlides} />
              <div className="text-center mt-8">
                <a
                  href="sms:8475422073"
                  className="inline-block px-8 py-3 bg-sage text-white text-sm font-medium uppercase tracking-[0.2em] hover:bg-sage-dark transition-colors"
                >
                  Order Today
                </a>
              </div>
            </div>
          </div>
        </section>
        );
      })()}

      {/* Products — 5xbsrns6 */}
      {galleryId === "5xbsrns6" && (
        <section className="px-6 py-16 md:py-24 bg-cream">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl text-charcoal text-center mb-16">
              Make your photos come to life
            </h2>

            {/* Photo Album */}
            <div className="mb-20">
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-charcoal text-center mb-8">
                Custom Photo Album
              </h3>
              <video
                className="w-full rounded-lg shadow-lg"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/photos/flipbook-album-3.mp4" type="video/mp4" />
              </video>
              <p className="mt-8 text-charcoal-light text-sm md:text-base leading-relaxed">
                Starting at $180. A beautiful 10x10 hardcover album designed with your favorite images. Everything you see here is fully customizable. Add pages, swap photos, adjust the layout, change the cover. It&apos;s your story, designed your way. Final pricing depends on the pages and extras you choose.
              </p>
              <div className="text-center mt-6">
                <a
                  href="sms:8475422073"
                  className="inline-block px-8 py-3 bg-sage text-white text-sm font-medium uppercase tracking-[0.2em] hover:bg-sage-dark transition-colors"
                >
                  Order Today
                </a>
              </div>
            </div>

            {/* Gallery Walls */}
            <div>
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-charcoal text-center mb-2">
                Gallery Walls
              </h3>
              <p className="text-sm text-center text-charcoal/60 mb-8">
                Everything you see here is fully customizable. These are just samples.
              </p>
              <GalleryWallCarousel slides={galleryWallSlides5xbsrns6} />
              <div className="text-center mt-8">
                <a
                  href="sms:8475422073"
                  className="inline-block px-8 py-3 bg-sage text-white text-sm font-medium uppercase tracking-[0.2em] hover:bg-sage-dark transition-colors"
                >
                  Order Today
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Album-only — 9gy4ze1g (flipbook) */}
      {galleryId === "9gy4ze1g" && (
        <section className="px-6 py-16 md:py-24 bg-cream">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl text-charcoal text-center mb-16">
              Make your photos come to life
            </h2>
            <div>
              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-charcoal text-center mb-8">
                Custom Photo Album
              </h3>
              <AlbumFlipbook pages={albumPages9gy4ze1g} />
              <p className="mt-8 text-charcoal-light text-sm md:text-base leading-relaxed">
                Starting at $160. A beautiful 10x10 hardcover album designed with your favorite images. Everything you see here is fully customizable. Add pages, swap photos, adjust the layout, change the cover. It&apos;s your story, designed your way. Final pricing depends on the pages and extras you choose.
              </p>
              <div className="text-center mt-6">
                <a
                  href="sms:8475422073"
                  className="inline-block px-8 py-3 bg-sage text-white text-sm font-medium uppercase tracking-[0.2em] hover:bg-sage-dark transition-colors"
                >
                  Order Today
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <section className="px-6 py-16 md:py-24 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl text-charcoal mb-3">Love your photos?</p>
          <p className="text-charcoal-light text-sm mb-8">Your feedback means the world to me and helps other families find their photographer.</p>
          <a href="https://g.page/r/Cc8-Kj1UzD0UEAI/review" target="_blank" rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-sage text-white text-sm font-medium uppercase tracking-[0.2em] hover:bg-sage-dark transition-colors">
            Leave a Review ★
          </a>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && gallery.photos[lightbox] && (
        <div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center select-none touch-none"
          onClick={() => { if (zoom <= 1) setLightbox(null); else resetZoom(); }}
          onTouchStart={(e) => {
            touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, fingers: e.touches.length, dist: e.touches.length >= 2 ? getTouchDist(e.touches) : 0 };
            panStart.current = { x: pan.x, y: pan.y };
            handleDoubleTap(e);
          }}
          onTouchMove={(e) => {
            if (!touchStart.current) return;
            if (e.touches.length >= 2 && touchStart.current.dist > 0) {
              const d = getTouchDist(e.touches); const s = d / touchStart.current.dist;
              const nz = Math.max(1, Math.min(5, zoom * s)); setZoom(nz);
              touchStart.current.dist = d; if (nz <= 1) setPan({ x: 0, y: 0 }); return;
            }
            if (e.touches.length === 1 && zoom > 1) {
              setPan({ x: panStart.current.x + e.touches[0].clientX - touchStart.current.x, y: panStart.current.y + e.touches[0].clientY - touchStart.current.y });
            }
          }}
          onTouchEnd={(e) => {
            if (!touchStart.current) return;
            const { x, y, fingers } = touchStart.current;
            if (zoom <= 1 && fingers === 1 && e.changedTouches.length > 0) {
              const dx = e.changedTouches[0].clientX - x, dy = e.changedTouches[0].clientY - y;
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
                if (dx < 0 && lightbox < gallery.photos.length - 1) goToPhoto(lightbox + 1);
                else if (dx > 0 && lightbox > 0) goToPhoto(lightbox - 1);
                touchStart.current = null; return;
              }
            }
            if (zoom <= 1.05) resetZoom();
            touchStart.current = null;
          }}
        >
          <button className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white z-20"
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="4" y1="4" x2="16" y2="16"/><line x1="16" y1="4" x2="4" y2="16"/></svg>
          </button>

          {lightbox > 0 && zoom <= 1 && (
            <button className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white z-10"
              onClick={(e) => { e.stopPropagation(); goToPhoto(lightbox - 1); }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15,4 7,12 15,20"/></svg>
            </button>
          )}

          <div className="flex items-center justify-center overflow-hidden w-full h-full" onClick={(e) => e.stopPropagation()}>
            <img src={gallery.photos[lightbox].url} alt={`Photo ${lightbox + 1}`}
              className={`max-h-[90vh] max-w-[92vw] md:max-w-[85vw] object-contain transition-opacity duration-300 ${lightboxLoaded ? "opacity-100" : "opacity-0"}`}
              style={{ transform: `scale(${zoom}) translate(${pan.x/zoom}px, ${pan.y/zoom}px)`, transition: zoom <= 1 ? "transform 0.2s ease-out" : "none" }}
              onLoad={() => setLightboxLoaded(true)} draggable={false} />
          </div>
          {!lightboxLoaded && <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="w-6 h-6 border-2 border-white/20 border-t-white/60 rounded-full animate-spin"/></div>}

          {lightbox < gallery.photos.length - 1 && zoom <= 1 && (
            <button className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/40 hover:text-white z-10"
              onClick={(e) => { e.stopPropagation(); goToPhoto(lightbox + 1); }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9,4 17,12 9,20"/></svg>
            </button>
          )}

          {zoom > 1 && <div className="absolute top-5 left-5 px-3 py-1.5 bg-black/50 backdrop-blur-sm text-white/60 text-xs rounded-full z-10">{Math.round(zoom*100)}%</div>}

          <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between z-20">
            <span className="text-white/40 text-sm tabular-nums">{lightbox + 1} / {gallery.photos.length}</span>
            <div className="flex items-center gap-3">
              <button onClick={(e) => { e.stopPropagation(); toggleFav(gallery.photos[lightbox].id); }}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${favorites.has(gallery.photos[lightbox].id) ? "bg-rose/80 text-white" : "bg-white/10 text-white/60 hover:text-white"}`}>
                {favorites.has(gallery.photos[lightbox].id) ? "♥" : "♡"}
              </button>
              <button onClick={(e) => { e.stopPropagation(); sharePhoto(gallery.photos[lightbox]); }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white/60 hover:text-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
              </button>
              <button onClick={(e) => { e.stopPropagation(); downloadPhoto(gallery.photos[lightbox]); }}
                className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-xs uppercase tracking-wider hover:bg-white/20 transition-colors">↓ Download</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
