"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const navLinks: {
  href: string;
  label: string;
  noIndexPage?: boolean;
  dropdown?: { href: string; label: string }[];
}[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/sessions", label: "Sessions & Pricing" },
  // Service detail pages live under /sessions/* and are linked from the
  // Sessions & Pricing page ("learn more" links), NOT from the main nav.
  {
    href: "/gallery",
    label: "Gallery",
    dropdown: [
      { href: "/gallery/newborn", label: "Newborns" },
      { href: "/gallery/family", label: "Families" },
      { href: "/gallery/milestone", label: "Milestones" },
      { href: "/gallery/event", label: "Events" },
    ],
  },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
    setMobileOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link
            href="/"
            className="font-[family-name:var(--font-cormorant)] text-2xl tracking-wide text-charcoal md:text-3xl"
          >
            Tovy Photography
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.href} className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === link.href ? null : link.href)
                    }
                    onMouseEnter={() => setOpenDropdown(link.href)}
                    className={`text-sm font-medium tracking-wider uppercase transition-colors hover:text-sage-dark flex items-center gap-1 ${
                      pathname.startsWith(link.href)
                        ? "text-sage-dark"
                        : "text-charcoal"
                    }`}
                  >
                    {link.label}
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${
                        openDropdown === link.href ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  <div
                    onMouseEnter={() => setOpenDropdown(link.href)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                      openDropdown === link.href
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-1"
                    }`}
                  >
                    <div className="bg-white border border-charcoal/10 shadow-lg py-2 min-w-[160px]">
                      {!link.noIndexPage && (
                        <Link
                          href={link.href}
                          className="block px-5 py-2 text-sm font-medium tracking-wider uppercase text-charcoal hover:text-sage-dark hover:bg-cream/50 transition-colors"
                        >
                          All
                        </Link>
                      )}
                      {link.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className={`block px-5 py-2 text-sm font-medium tracking-wider uppercase whitespace-nowrap transition-colors hover:text-sage-dark hover:bg-cream/50 ${
                            pathname === sub.href
                              ? "text-sage-dark"
                              : "text-charcoal"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wider uppercase transition-colors hover:text-sage-dark ${
                    pathname === link.href ? "text-sage-dark" : "text-charcoal"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-60 flex h-11 w-11 items-center justify-center md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-6 bg-charcoal transition-all duration-300 ${
                  isOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-charcoal transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-charcoal transition-all duration-300 ${
                  isOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-50 bg-cream transition-all duration-500 md:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-6">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.href} className="flex flex-col items-center">
                <button
                  onClick={() =>
                    setMobileOpenDropdown(
                      mobileOpenDropdown === link.href ? null : link.href
                    )
                  }
                  className={`font-[family-name:var(--font-cormorant)] text-4xl transition-colors hover:text-sage-dark flex items-center gap-2 ${
                    pathname.startsWith(link.href)
                      ? "text-sage-dark"
                      : "text-charcoal"
                  }`}
                >
                  {link.label}
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${
                      mobileOpenDropdown === link.href ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`flex flex-col items-center gap-3 overflow-hidden transition-all duration-300 ${
                    mobileOpenDropdown === link.href
                      ? "max-h-60 mt-4 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {!link.noIndexPage && (
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-xl text-charcoal-light hover:text-sage-dark transition-colors"
                    >
                      All
                    </Link>
                  )}
                  {link.dropdown.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-xl transition-colors hover:text-sage-dark ${
                        pathname === sub.href
                          ? "text-sage-dark"
                          : "text-charcoal-light"
                      }`}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`font-[family-name:var(--font-cormorant)] text-4xl transition-colors hover:text-sage-dark ${
                  pathname === link.href ? "text-sage-dark" : "text-charcoal"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <div className="mt-8 text-center text-sm text-charcoal-light">
            <a
              href="https://www.instagram.com/tovyphotography?igsh=MWs3MnEzZXJ1bDY5ag%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sage-dark"
            >
              @tovyphotography
            </a>
          </div>
        </div>
        {/* Close button in mobile overlay */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-6 top-4 z-60 flex h-11 w-11 items-center justify-center"
          aria-label="Close menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-6 translate-y-2 rotate-45 bg-charcoal" />
            <span className="block h-0.5 w-6 opacity-0 bg-charcoal" />
            <span className="block h-0.5 w-6 -translate-y-2 -rotate-45 bg-charcoal" />
          </div>
        </button>
      </div>
    </>
  );
}
