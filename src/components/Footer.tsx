import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/80">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="font-[family-name:var(--font-cormorant)] text-3xl text-white mb-4">
              Tovy Photography
            </h3>
            <p className="text-sm leading-relaxed">
              Seeing the good in your world. Family, newborn, and milestone
              photography in Skokie, IL and Chicago&apos;s North Shore.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-cormorant)] text-xl text-white mb-4">
              Explore
            </h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/about" className="hover:text-white transition-colors">
                About Gabi
              </Link>
              <Link href="/sessions" className="hover:text-white transition-colors">
                Sessions &amp; Pricing
              </Link>
              <Link href="/gallery" className="hover:text-white transition-colors">
                Gallery
              </Link>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-[family-name:var(--font-cormorant)] text-xl text-white mb-4">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-2 text-sm">
              <a
                href="mailto:tovypics@gmail.com"
                className="hover:text-white transition-colors"
              >
                tovypics@gmail.com
              </a>
              <a
                href="https://www.instagram.com/tovyphotography?igsh=MWs3MnEzZXJ1bDY5ag%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                @tovyphotography
              </a>
              <p>Skokie, IL — Serving Chicago&apos;s North Shore</p>
            </div>
          </div>
        </div>

        {/* Location links */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-wrap gap-4 text-xs">
            <Link href="/locations/skokie" className="hover:text-white transition-colors">
              Skokie Photographer
            </Link>
            <Link href="/locations/evanston" className="hover:text-white transition-colors">
              Evanston Photographer
            </Link>
            <Link href="/locations/lincolnwood" className="hover:text-white transition-colors">
              Lincolnwood Photographer
            </Link>
            <Link href="/locations/wilmette" className="hover:text-white transition-colors">
              Wilmette Photographer
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-xs">
          <p>© {new Date().getFullYear()} Tovy Photography. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
