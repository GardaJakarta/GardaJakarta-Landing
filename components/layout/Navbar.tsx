"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppLogo from "../branding/AppLogo";
import AppLogoWhite from "../branding/AppLogoWhite";
import { ArrowRight, User } from "@phosphor-icons/react";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Peta Interaktif", href: "/maps" },
  { label: "Tentang Kami", href: "/about" },
  { label: "Cara Kerja", href: "/how-it-works" },
  { label: "Bantuan", href: "/help" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isDefaultMode = isScrolled || isHovered || isOpen;

  return (
    <header
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed top-0 z-50 w-full transition-all duration-300  ${
        isDefaultMode ? " bg-white shadow-sm" : "bg-transparent "
      }`}
      style={
        !isDefaultMode
          ? {
              background:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.10) 45%, transparent 100%)",
            }
          : undefined
      }
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" aria-label="Beranda" className="shrink-0">
          {isDefaultMode ? <AppLogo size={125} /> : <AppLogoWhite size={125} />}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-base font-semibold transition-colors duration-300
                after:absolute after:-bottom-3 after:left-1/2 after:h-0.5 after:w-0
                after:-translate-x-1/2 after:rounded-full after:bg-primary
                after:transition-all after:duration-300 after:ease-out
                hover:after:w-full ${
                  isDefaultMode ? "text-foreground" : "text-white"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            className={`group rounded-2xl border-[1.5px] bg-transparent py-2 pl-4 pr-6 font-semibold transition-colors duration-300 hover:bg-primary hover:text-white cursor-pointer ${
              isDefaultMode
                ? "border-primary text-primary"
                : "border-white text-white"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <User
                className="text-current transition-colors duration-300"
                size={20}
              />
              Portal Admin
            </div>
          </button>

          <button className="rounded-2xl bg-primary py-2 pl-6 pr-4 font-semibold text-white transition-colors hover:bg-red-700 cursor-pointer">
            <div className="flex items-center justify-center gap-2">
              Buat Laporan
              <ArrowRight className="text-white" size={20} weight="bold" />
            </div>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={isOpen}
          className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-gray-100 md:hidden ${
            isDefaultMode ? "text-gray-700" : "text-white hover:bg-white/10"
          }`}
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
