"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AppLogo from "../branding/AppLogo";
import AppLogoWhite from "../branding/AppLogoWhite";
import { ArrowRight, User } from "@phosphor-icons/react";

type SessionUser = { name: string; email: string; image?: string | null; role: "warga" | "polisi" | "admin" };

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
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

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
    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://api.gardajakarta.my.id";
    fetch(`${apiUrl}/api/me`, { credentials: "include" })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { data?: SessionUser } | null) =>
        setSessionUser(payload?.data ?? null),
      )
      .catch(() => setSessionUser(null));
  }, []);

  const isDefaultMode = isScrolled || isHovered || isOpen;

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.gardajakarta.my.id";
      await fetch(`${apiUrl}/api/auth/sign-out`, { method: "POST", credentials: "include" });
      setSessionUser(null);
      setIsSignOutOpen(false);
      setIsAccountOpen(false);
    } finally {
      setIsSigningOut(false);
    }
  };

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
      <nav className="mx-auto flex min-h-11 max-w-7xl items-center justify-between px-3 py-0.5 sm:min-h-0 sm:px-6 sm:py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" aria-label="Beranda" className="shrink-0">
          {isDefaultMode ? <AppLogo size={125} className="h-6 w-auto sm:h-10" /> : <AppLogoWhite size={125} className="h-6 w-auto sm:h-10" />}
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

        <div className="hidden items-center gap-4 md:flex">
          {sessionUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsAccountOpen((open) => !open)}
                aria-expanded={isAccountOpen}
                aria-label={`Buka menu akun ${sessionUser.name}`}
                className={`flex items-center gap-2 rounded-full px-1.5 py-1.5 font-semibold transition-colors hover:bg-black/5 ${isDefaultMode ? "text-foreground" : "text-white"}`}
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm text-white shadow-sm">
                  {sessionUser.image ? <img className="h-9 w-9 rounded-full object-cover" src={sessionUser.image} alt={`Foto profil ${sessionUser.name}`} referrerPolicy="no-referrer" /> : sessionUser.name.slice(0, 1).toUpperCase()}
                </span>
                <span className="hidden max-w-28 truncate sm:inline">
                  {sessionUser.name}
                </span>
              </button>
              {isAccountOpen && (
                <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 min-w-52 rounded-2xl bg-white p-2 text-foreground shadow-xl ring-1 ring-black/5">
                  <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Akun aktif</p>
                  {sessionUser.role === "warga" && <a href="https://app.gardajakarta.my.id/dashboard" className="block rounded-xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-orange-50 hover:text-primary">Buat Laporan</a>}
                  <a href="https://app.gardajakarta.my.id/dashboard" className="block rounded-xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-orange-50 hover:text-primary">Dashboard {sessionUser.role === "warga" ? "Warga" : sessionUser.role === "polisi" ? "Polisi" : "Admin"}</a>
                  <button type="button" onClick={() => { setIsAccountOpen(false); setIsSignOutOpen(true); }} className="mt-1 block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50">Keluar</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <a
                href="https://app.gardajakarta.my.id/admin/login"
                className={`group rounded-full border-[1.5px] bg-transparent px-4 py-2 text-sm font-semibold transition-colors duration-300 hover:bg-primary hover:text-white cursor-pointer ${
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

              <a
                href="https://app.gardajakarta.my.id/login"
                className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 cursor-pointer"
              >
                <div className="flex items-center justify-center gap-2">
                  Buat Laporan
                  <ArrowRight className="text-white" size={20} weight="bold" />
                </div>
              </a>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={isOpen}
          className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-gray-100 md:hidden ${
            isDefaultMode ? "text-gray-700" : "text-white hover:bg-white/10"
          }`}
        >
          {isOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
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
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-2.5 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-orange-50 hover:text-[#FF3E17]"
              >
                {link.label}
              </Link>
            ))}
            {sessionUser ? (
              <>
                <a
                  href="https://app.gardajakarta.my.id/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="mt-1 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-orange-50 hover:text-[#FF3E17]"
                >
                  Dashboard {sessionUser.role === "warga" ? "Warga" : sessionUser.role === "polisi" ? "Polisi" : "Admin"}
                </a>
                <button
                  type="button"
                  onClick={() => { setIsOpen(false); setIsSignOutOpen(true); }}
                  className="rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                >
                  Keluar
                </button>
              </>
            ) : (
              <>
                <a
                  href="https://app.gardajakarta.my.id/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="mt-1 rounded-full border border-primary px-4 py-2.5 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  Portal Admin
                </a>
                <a
                  href="https://app.gardajakarta.my.id/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  Buat laporan
                </a>
              </>
            )}
          </div>
        </div>
      )}

      {isSignOutOpen && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/35 px-6 backdrop-blur-sm" role="presentation">
          <section className="w-full max-w-sm bg-white p-7 shadow-2xl" role="alertdialog" aria-modal="true" aria-labelledby="landing-signout-title">
            <span className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-primary text-xl text-white" aria-hidden="true">↪</span>
            <h2 id="landing-signout-title" className="text-2xl font-extrabold tracking-tight text-foreground">Keluar dari akun?</h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">Session di perangkat ini akan ditutup.</p>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setIsSignOutOpen(false)} className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50">Batal</button>
              <button type="button" disabled={isSigningOut} onClick={() => void handleSignOut()} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60">{isSigningOut ? "Keluar..." : "Keluar"}</button>
            </div>
          </section>
        </div>
      )}
    </header>
  );
}
