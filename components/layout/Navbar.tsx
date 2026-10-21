"use client";

import { useState } from "react";
import Link from "next/link";
import AppLogo from "../branding/AppLogo";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Peta Interaktif", href: "/peta-interaktif" },
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Cara Kerja", href: "/cara-kerja" },
  { label: "Bantuan", href: "/bantuan" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" aria-label="Beranda" className="shrink-0">
          <AppLogo size={125} />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-base font-semibold text-foreground 
                after:absolute after:-bottom-3 after:left-1/2 after:h-0.75 after:w-0
                after:-translate-x-1/2 after:rounded-full after:bg-primary
                after:transition-all after:duration-300 after:ease-out
                hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button className="px-6 py-2 rounded-full font-semibold text-white bg-primary hover:bg-red-600 transition-colors">
          Buat Laporan
        </button>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={isOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-700 transition-colors hover:bg-gray-100 md:hidden"
        >
          {isOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-6 py-3 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-orange-50 hover:text-[#FF3E17]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
