"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppLogo from "../branding/AppLogo";
import AppLogoWhite from "../branding/AppLogoWhite";
import { ArrowRight, User } from "@phosphor-icons/react";

type SessionUser = { name: string; email: string; role: "warga" | "polisi" | "admin" };

const navLinks = [
  { label: "Beranda", href: "#hero" },
  { label: "Peta Interaktif", href: "https://app.gardajakarta.my.id/map" },
  { label: "Tentang Kami", href: "#about-us" },
  { label: "Cara Kerja", href: "#how-it-works" },
  { label: "Bantuan", href: "#help" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

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

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.gardajakarta.my.id";
    fetch(`${apiUrl}/api/me`, { credentials: "include" })
      .then((response) => response.ok ? response.json() : null)
      .then((payload: { data?: SessionUser } | null) => setSessionUser(payload?.data ?? null))
      .catch(() => setSessionUser(null));
  }, []);

  const isDefaultMode = isScrolled || isHovered || isOpen;

  return (
    <header
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed top-0 z-50 w-full transition-all duration-300  ${
        isDefaultMode
          ? " bg-white border-b border-light-gray"
          : "bg-transparent "
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

        <div className="flex items-center gap-4">
          {sessionUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsAccountOpen((open) => !open)}
                aria-expanded={isAccountOpen}
                aria-label={`Buka menu akun ${sessionUser.name}`}
                className={`flex items-center gap-2 rounded-2xl border-[1.5px] border-primary px-3 py-2 font-semibold transition-colors hover:bg-primary hover:text-white ${isDefaultMode ? "text-foreground" : "text-white"}`}
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-sm text-white">
                  {sessionUser.name.slice(0, 1).toUpperCase()}
                </span>
                <span className="hidden max-w-28 truncate sm:inline">{sessionUser.name}</span>
              </button>
              {isAccountOpen && (
                <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 min-w-52 rounded-2xl bg-white p-2 text-foreground shadow-xl ring-1 ring-black/5">
                  <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Akun aktif</p>
                  {sessionUser.role === "warga" && <a href="https://app.gardajakarta.my.id/report" className="block rounded-xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-orange-50 hover:text-primary">Buat Laporan</a>}
                  <a href={`https://app.gardajakarta.my.id/${sessionUser.role === "admin" ? "admin" : sessionUser.role === "polisi" ? "polisi" : "map"}`} className="block rounded-xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-orange-50 hover:text-primary">Portal {sessionUser.role === "warga" ? "Warga" : sessionUser.role === "polisi" ? "Polisi" : "Admin"}</a>
                </div>
              )}
            </div>
          ) : <>
          <a
            href="https://app.gardajakarta.my.id/admin/login"
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
          </a>

          <a href="https://app.gardajakarta.my.id/login" className="rounded-2xl bg-primary py-2 pl-6 pr-4 font-semibold text-white transition-colors hover:bg-red-700 cursor-pointer">
            <div className="flex items-center justify-center gap-2">
              Buat Laporan
              <ArrowRight className="text-white" size={20} weight="bold" />
            </div>
          </a></>}
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
