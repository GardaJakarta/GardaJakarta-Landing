"use client";

import { CaretDoubleDown } from "@phosphor-icons/react";

export default function Hero() {
  const scrollToNextSection = () => {
    document.getElementById("next-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-black">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero-footage.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Bottom Gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent" />

      {/* Headline */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 lg:px-8 lg:pb-32">
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
          Bersama Wujudkan Jakarta yang Lebih{" "}
          <span className="font-bold! relative z-0 inline-block">
            <span className="absolute inset-x-0 bottom-[5%] -z-10 h-[60%] bg-primary/90" />
            Aman.
          </span>
        </h1>
      </div>

      {/* Scroll to Next Section */}
      <button
        type="button"
        onClick={scrollToNextSection}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/30 px-5 py-3 text-sm font-regular text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-black/50 sm:bottom-8 sm:text-base cursor-pointer"
      >
        Pelajari Selengkapnya
        <CaretDoubleDown size={16} />
      </button>
    </section>
  );
}
