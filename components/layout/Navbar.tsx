"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AppLogo from "../branding/AppLogo";
import AppLogoWhite from "../branding/AppLogoWhite";
import { ArrowRight, SignOut, User } from "@phosphor-icons/react";

type SessionUser = { name: string; email: string; image?: string | null; role: "warga" | "polisi" | "admin" };

const navLinks = [
  { label: "Beranda", href: "#hero", icon: "home" },
  { label: "Peta Interaktif", href: "https://app.gardajakarta.my.id/map", icon: "map" },
  { label: "Tentang Kami", href: "#about-us", icon: "info" },
  { label: "Cara Kerja", href: "#how-it-works", icon: "steps" },
  { label: "Bantuan", href: "#help", icon: "help" },
];

function MobileNavIcon({ kind }: { kind: string }) {
  const path = kind === "home" ? <><path d="m4 10 8-6 8 6" /><path d="M6.5 9.5V20h11V9.5M10 20v-5h4v5" /></> : kind === "map" ? <><path d="m4 6 5-2 6 2 5-2v14l-5 2-6-2-5 2V6Z" /><path d="M9 4v14M15 6v14" /></> : kind === "info" ? <><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5M12 8h.01" /></> : kind === "steps" ? <><path d="M5 6h14M5 12h10M5 18h6" /><path d="m16 16 2 2 3-4" /></> : <><circle cx="12" cy="12" r="8.5" /><path d="M9.5 9a2.6 2.6 0 1 1 4.2 2c-1.2.9-1.7 1.3-1.7 2.5M12 16h.01" /></>;
  return <svg className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{path}</svg>;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSignOutOpen, setIsSignOutOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setIsAccountOpen(false);
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
    if (!isAccountOpen) return;
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, [isAccountOpen]);

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
      <nav className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-3 py-0 sm:min-h-0 sm:px-6 sm:py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" aria-label="Beranda" className="shrink-0">
          {isDefaultMode ? <AppLogo size={162} className="h-[26px] w-auto sm:h-10" /> : <AppLogoWhite size={162} className="h-[26px] w-auto sm:h-10" />}
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
            <div ref={accountRef} className="relative">
              <button
                type="button"
                onClick={() => setIsAccountOpen((open) => !open)}
                aria-expanded={isAccountOpen}
                aria-label={`Buka menu akun ${sessionUser.name}`}
                className={`flex items-center gap-2 rounded-full px-1.5 py-1.5 font-semibold transition-colors hover:bg-black/5 ${isDefaultMode ? "text-foreground" : "text-white"}`}
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-sm text-white shadow-sm">
                  {sessionUser.image ? <Image className="h-9 w-9 rounded-full object-cover" src={sessionUser.image} alt={`Foto profil ${sessionUser.name}`} width={36} height={36} unoptimized /> : sessionUser.name.slice(0, 1).toUpperCase()}
                </span>
                <span className="hidden max-w-28 truncate sm:inline">
                  {sessionUser.name}
                </span>
              </button>
              {isAccountOpen && (
                <div className="absolute right-0 top-[calc(100%+0.75rem)] z-50 min-w-52 rounded-2xl bg-white p-2 text-foreground shadow-xl ring-1 ring-black/5">
                  <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Akun aktif</p>
                  <a href="https://app.gardajakarta.my.id/profile" className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-orange-50 hover:text-primary"><User size={18} weight="bold" aria-hidden="true" />Profile</a>
                  <a href="https://app.gardajakarta.my.id/dashboard" className="block rounded-xl px-3 py-2 text-sm font-semibold transition-colors hover:bg-orange-50 hover:text-primary">Dashboard {sessionUser.role === "warga" ? "Warga" : sessionUser.role === "polisi" ? "Polisi" : "Admin"}</a>
                  <button type="button" onClick={() => { setIsAccountOpen(false); setIsSignOutOpen(true); }} className="mt-2 block w-full rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-red-700">Keluar</button>
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
        <div className="flex items-center gap-1 md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={isOpen}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100 ${
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
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-5 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-orange-50 hover:text-[#FF3E17]"
              >
                <MobileNavIcon kind={link.icon} />
                {link.label}
              </Link>
            ))}
            {sessionUser ? (
              <>
                <div className="mt-2 flex items-center gap-3 border-t border-gray-100 px-3 pb-2 pt-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-primary text-sm font-bold text-white shadow-sm">
                    {sessionUser.image ? <Image className="h-10 w-10 object-cover" src={sessionUser.image} alt={`Foto profil ${sessionUser.name}`} width={40} height={40} unoptimized /> : sessionUser.name.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="min-w-0"><strong className="block truncate text-sm font-bold text-gray-900">{sessionUser.name}</strong><small className="mt-0.5 block truncate text-xs text-gray-400">{sessionUser.email}</small></span>
                </div>
                <a href="https://app.gardajakarta.my.id/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-orange-50 hover:text-[#FF3E17]"><User size={18} weight="bold" aria-hidden="true" />Profile</a>
                <a
                  href="https://app.gardajakarta.my.id/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="mt-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-orange-50 hover:text-[#FF3E17]"
                >
                  <MobileNavIcon kind="home" />
                  Dashboard {sessionUser.role === "warga" ? "Warga" : sessionUser.role === "polisi" ? "Polisi" : "Admin"}
                </a>
                <button
                  type="button"
                  onClick={() => { setIsOpen(false); setIsSignOutOpen(true); }}
                  className="my-2 flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  <SignOut size={18} weight="bold" />
                  Keluar
                </button>
              </>
            ) : (
              <>
                <a
                  href="https://app.gardajakarta.my.id/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 rounded-full border border-primary px-4 py-3 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  <User size={18} weight="bold" />
                  Portal Admin
                </a>
                <a
                  href="https://app.gardajakarta.my.id/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-red-700"
                >
                  <ArrowRight size={18} weight="bold" />
                  Buat laporan
                </a>
              </>
            )}
          </div>
        </div>
      )}

      {isSignOutOpen && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black/35 px-6 backdrop-blur-sm" role="presentation">
          <section className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl" role="alertdialog" aria-modal="true" aria-labelledby="landing-signout-title">
            <h2 id="landing-signout-title" className="text-xl font-bold tracking-tight text-foreground">Keluar dari akun?</h2>
            <p className="mt-2 text-xs leading-relaxed text-gray-500">Sesi di perangkat ini akan ditutup.</p>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setIsSignOutOpen(false)} className="rounded-lg px-4 py-2.5 text-xs font-bold text-gray-600 transition-colors hover:bg-gray-50">Batal</button>
              <button type="button" disabled={isSigningOut} onClick={() => void handleSignOut()} className="rounded-lg bg-primary px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-red-700 disabled:opacity-60">{isSigningOut ? "Keluar..." : "Keluar"}</button>
            </div>
          </section>
        </div>
      )}
    </header>
  );
}
