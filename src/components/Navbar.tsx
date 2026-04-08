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

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { label: 'HOME', path: '/' },
    { label: 'THE ARCHIVE', path: '/store' },
    { label: 'WHERE TO BEGIN', path: '/where-to-begin' },
    { label: 'READ', path: '/read' },
    { label: 'BLOG', path: '/blog' },
    { label: 'WATCH', path: '/watch' },
    { label: 'PUBLICATIONS', path: '/publications' },
    { label: 'ABOUT', path: '/about' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0a0a0a]/90 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3 md:gap-4">
            <Image
              src="/images/logo.png"
              alt="Dead Hidden"
              width={40}
              height={40}
              className="md:w-12 md:h-12"
            />
            <span
              className="text-sm md:text-base tracking-[0.15em] uppercase font-bold text-[#e8e0d0]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              DEAD HIDDEN
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`text-sm tracking-[0.12em] uppercase transition-colors ${
                  isActive(link.path)
                    ? 'text-[#a50000]'
                    : 'text-[#888] hover:text-[#e8e0d0]'
                }`}
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/support"
              className={`text-sm tracking-[0.12em] uppercase font-bold px-4 py-1.5 border transition-colors ${
                isActive('/support')
                  ? 'bg-[#8b0000] border-[#8b0000] text-[#e8e0d0]'
                  : 'border-[#8b0000] text-[#8b0000] hover:bg-[#8b0000] hover:text-[#e8e0d0]'
              }`}
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              SUPPORT
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 w-6 h-6"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-[#e8e0d0] transition-all ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#e8e0d0] transition-all ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#e8e0d0] transition-all ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur border-t border-[#222] py-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 text-sm tracking-[0.12em] uppercase transition-colors ${
                    isActive(link.path)
                      ? 'text-[#a50000]'
                      : 'text-[#888] hover:text-[#e8e0d0]'
                  }`}
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/support"
                onClick={() => setIsOpen(false)}
                className="mx-4 text-center text-sm tracking-[0.12em] uppercase font-bold px-4 py-2 border border-[#8b0000] text-[#8b0000] hover:bg-[#8b0000] hover:text-[#e8e0d0] transition-colors"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                SUPPORT THE MISSION
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
