'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === path;

  // Max 5 nav items — reflects the user journey: What → Why → How → Browse
  const navLinks = [
    { label: 'RESOURCES', path: '/store' },
    { label: 'READ', path: '/read' },
    { label: 'BLOG', path: '/blog' },
    { label: 'ABOUT', path: '/about' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-sm shadow-lg shadow-black/20' : 'bg-[#0a0a0a]/70 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo on the left */}
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/images/logo.png"
              alt="Dead Hidden"
              width={32}
              height={32}
              className="md:w-9 md:h-9"
            />
            <span
              className="text-sm tracking-[0.15em] uppercase font-bold text-[#e8e0d0]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              DEAD HIDDEN
            </span>
          </Link>

          {/* Desktop: nav links + primary CTA */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-xs tracking-[0.12em] uppercase transition-colors ${
                  isActive(link.path)
                    ? 'text-[#e8e0d0]'
                    : 'text-[#777] hover:text-[#e8e0d0]'
                }`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {link.label}
              </Link>
            ))}

            {/* Primary CTA — visually distinct filled button */}
            <Link
              href="/where-to-begin"
              className="bg-[#8b0000] text-[#e8e0d0] text-xs tracking-[0.12em] uppercase font-bold px-5 py-2 hover:bg-[#a50000] transition-colors ml-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              GET STARTED
            </Link>
          </div>

          {/* Mobile: CTA always visible + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            {/* Primary CTA stays outside hamburger on mobile */}
            <Link
              href="/where-to-begin"
              className="bg-[#8b0000] text-[#e8e0d0] text-[10px] tracking-[0.1em] uppercase font-bold px-3 py-1.5 hover:bg-[#a50000] transition-colors"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              GET STARTED
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col justify-center gap-1.5 w-6 h-6"
              aria-label="Toggle menu"
            >
              <span
                className={`w-5 h-0.5 bg-[#e8e0d0] transition-all duration-200 ${
                  isOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-[#e8e0d0] transition-all duration-200 ${
                  isOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-[#e8e0d0] transition-all duration-200 ${
                  isOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-[#222] py-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-1 text-sm tracking-[0.12em] uppercase transition-colors ${
                    isActive(link.path)
                      ? 'text-[#e8e0d0]'
                      : 'text-[#777] hover:text-[#e8e0d0]'
                  }`}
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {link.label}
                </Link>
              ))}

              {/* Secondary links in mobile drawer */}
              <div className="border-t border-[#222] mt-2 pt-3">
                <Link
                  href="/publications"
                  className="px-4 py-1 text-xs tracking-[0.12em] uppercase text-[#555] hover:text-[#888] transition-colors block"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  PUBLICATIONS
                </Link>
                <Link
                  href="/watch"
                  className="px-4 py-1 text-xs tracking-[0.12em] uppercase text-[#555] hover:text-[#888] transition-colors block"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  WATCH
                </Link>
                <Link
                  href="/support"
                  className="px-4 py-1 text-xs tracking-[0.12em] uppercase text-[#555] hover:text-[#888] transition-colors block"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  SUPPORT
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
