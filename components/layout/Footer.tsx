"use client";

import Link from "next/link";
import AppLogo from "../branding/AppLogo";
import {
  ArrowUpRight,
  MapPin,
  EnvelopeSimple,
  InstagramLogo,
  LinkedinLogo,
  ArrowUp,
} from "@phosphor-icons/react";
import TagLine from "../branding/TagLine";

const navigation = [
  { label: "Beranda", href: "/" },
  { label: "Peta Interaktif", href: "/maps" },
  { label: "Tentang Kami", href: "/about" },
  { label: "Cara Kerja", href: "/how-it-works" },
  { label: "Bantuan", href: "/help" },
];

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="border-t border-gray-200 bg-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex flex-row gap-8 items-end">
              <Link
                href="/"
                aria-label="Garda Jakarta - Beranda"
                className="inline-flex"
              >
                <AppLogo size={140} className="mr-10" />
                <TagLine width={132} />
              </Link>
            </div>

            <p className="mt-8 max-w-sm text-base leading-7 text-foreground">
              Bersama mewujudkan Jakarta yang lebih aman melalui informasi
              keamanan berbasis lokasi dan partisipasi masyarakat.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider">
              Navigasi
            </h3>

            <ul className="mt-5 space-y-4">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-500 transition-colors hover:text-foreground hover:font-medium hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider">
              Hubungi Kami
            </h3>

            <p className="mt-6 text-sm leading-6 text-gray-500">
              Punya pertanyaan atau masukan untuk Garda Jakarta? Kami terbuka
              terhadap saran untuk membangun ruang publik yang lebih aman.
            </p>

            <a
              href="mailto:kontak@gardajakarta.id"
              className="mt-6 inline-flex items-center gap-3 text-sm font-medium text-gray-700 transition-colors hover:text-primary"
            >
              <EnvelopeSimple size={20} weight="duotone" />
              kontak@gardajakarta.id
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-dark-gray">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="text-xs text-white">
            © {currentYear} Garda Jakarta. Hak cipta dilindungi.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/privacy"
              className="text-xs text-white transition-colors hover:underline"
            >
              Kebijakan Privasi
            </Link>

            <Link
              href="/terms"
              className="text-xs text-white transition-colors hover:underline"
            >
              Ketentuan Penggunaan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
