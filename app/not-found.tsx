import Link from "next/link";
import { ArrowLeft, Compass } from "@phosphor-icons/react/dist/ssr";
import AppLogoWhite from "@/components/branding/AppLogoWhite";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-stretch bg-foreground px-6 py-8 text-white md:px-12 md:py-12 lg:px-24">
      <section className="mx-auto flex w-full max-w-7xl flex-col">
        <Link href="/" aria-label="Kembali ke beranda" className="inline-flex w-fit">
          <AppLogoWhite size={145} />
        </Link>

        <div className="my-auto max-w-5xl py-24">
          <div aria-hidden="true" className="mb-6 h-1 w-16 bg-primary" />
          <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
            Halaman tidak ditemukan
          </p>
          <p className="mb-4 text-[clamp(5rem,18vw,13rem)] font-black leading-[0.7] tracking-[-0.12em] text-primary">
            404
          </p>
          <h1 className="max-w-4xl text-5xl font-medium leading-[0.95] tracking-[-0.07em] sm:text-6xl lg:text-8xl">
            Rute ini belum ada di <span className="text-primary">peta.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-white/65 md:text-lg">
            Alamat yang Anda buka mungkin sudah dipindahkan atau belum tersedia.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link href="https://app.gardajakarta.my.id/login" className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-red-700">
              <Compass size={19} /> Buka portal
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 font-semibold text-white/80 transition-colors hover:text-white">
              <ArrowLeft size={18} /> Kembali ke beranda
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
