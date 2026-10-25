import Link from "next/link";
import Image from "next/image";
import AppLogo from "@/components/branding/AppLogo";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center overflow-hidden bg-white px-8 py-10 md:px-16 lg:px-24">
      {/* Logo: Kiri Atas */}
      <Link
        href="/"
        aria-label="Kembali ke beranda"
        className="absolute left-8 top-8 z-10 inline-flex md:left-16 md:top-10 lg:left-24"
      >
        <AppLogo size={155} />
      </Link>

      {/* Konten Utama */}
      <section className="relative z-10 mx-auto w-full max-w-7xl ml-24">
        <div className="flex max-w-2xl flex-col items-start">
          {/* Error Code */}
          <p className="text-8xl font-bold leading-none tracking-tight text-primary md:text-[8rem]">
            404
          </p>

          {/* Title */}
          <h1 className="mt-6 text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl md:text-4xl">
            Halaman tidak ditemukan.
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-lg text-base leading-7 text-foreground/65 md:text-lg md:leading-8">
            Maaf, halaman yang Anda cari tidak tersedia atau mungkin telah
            dipindahkan. Periksa kembali alamatnya atau kembali ke halaman utama
            Garda Jakarta.
          </p>

          {/* Action */}
          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-red-700"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </section>

      {/* Ilustrasi: Kanan Bawah */}
      <div className="pointer-events-none absolute bottom-0 right-0 hidden w-[42%] max-w-[600px] sm:block md:w-[45%]">
        <Image
          src="/images/not_found_illust.svg"
          alt="Ilustrasi halaman tidak ditemukan"
          width={600}
          height={450}
          priority
          className="h-auto w-full object-contain object-bottom"
        />
      </div>
    </main>
  );
}
