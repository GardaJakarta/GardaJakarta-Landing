"use client";

import { CaretDoubleDown } from "@phosphor-icons/react";
import { motion } from "framer-motion";

export default function Hero() {
  const scrollToNextSection = () => {
    document.getElementById("about-us")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section id="hero" className="relative flex min-h-screen items-end overflow-hidden bg-black">
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
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl"
        >
          Bersama Wujudkan Jakarta yang Lebih{" "}
          <span className="font-bold! relative z-0 inline-block">
            <span className="absolute inset-x-0 bottom-[5%] -z-10 h-[60%] bg-primary/90" />
            Aman.
          </span>
        </motion.h1>
      </div>

      {/* Scroll to Next Section */}
      <motion.button
        type="button"
        onClick={scrollToNextSection}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/30 px-5 py-3 text-sm font-regular text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-black/50 sm:bottom-8 sm:text-base cursor-pointer"
      >
        Pelajari Selengkapnya
        <CaretDoubleDown size={16} />
      </motion.button>
    </section>
  );
}
