"use client";

import Image from "next/image";
import { MapPinArea, UsersThree, ShieldCheck } from "@phosphor-icons/react";
import Reveal from "@/components/motion/Reveal";

const principles = [
  {
    icon: MapPinArea,
    title: "Berbasis Lokasi",
    subtitle:
      "Peta informasi keamanan yang relevan dengan lokasi dan lingkungan di seluruh kota Jakarta.",
  },
  {
    icon: UsersThree,
    title: "Kolaborasi Bersama",
    subtitle:
      "Mendorong partisipasi aktif seluruh anggota masyarakat untuk menciptakan Jakarta yang lebih aman.",
  },
  {
    icon: ShieldCheck,
    title: "Keamanan Terpercaya",
    subtitle:
      "Mengutamakan informasi yang bertanggung jawab untuk meningkatkan kesadaran keamanan publik.",
  },
];

export default function AboutUs() {
  return (
    <section
      id="about-us"
      className="relative overflow-hidden bg-white px-6 pt-20 md:px-12 md:pt-24"
    >
      {/* Background abu-abu full-width */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-[45%] bg-light-gray"
      />
      <div className="relative mx-auto max-w-7xl">
        {/* Headline & Description */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
          <Reveal>
            <h2 className="text-left text-3xl font-medium leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Membangun Jakarta yang Lebih Aman.{" "}
              <span className="font-bold">
                Smart City,{" "}
                <span className="relative inline-block">
                  Safe City.
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2 left-0 h-2 w-full bg-primary/90"
                  />
                </span>
              </span>
            </h2>
          </Reveal>

          <Reveal className="flex items-center" delay={0.1}>
            <p className="text-base leading-8 text-foreground/75 md:text-lg">
              Garda Jakarta adalah platform informasi keamanan perkotaan yang
              membantu masyarakat mengenali situasi di sekitarnya. Garda Jakarta
              berupaya meningkatkan kesadaran masyarakat dan mendorong
              partisipasi bersama untuk mewujudkan lingkungan Jakarta yang lebih
              aman dan nyaman.
            </p>
          </Reveal>
        </div>

        {/* Jakarta Image */}
        <Reveal className="mt-12 md:mt-16" delay={0.08}>
          <div className="relative aspect-16/5 w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/image-jakarta.jpg"
              alt="Pemandangan Kota Jakarta"
              fill
              className="object-cover object-[center_80%]"
              priority
            />
          </div>
        </Reveal>

        {/* Three Principles */}
        <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-0 md:mt-20">
          {principles.map((principle, index) => {
            const Icon = principle.icon;

            return (
              <Reveal
                key={principle.title}
                delay={index * 0.08}
                className={`flex flex-col items-center py-2 sm:px-6 md:px-10 ${
                  index < principles.length - 1
                    ? "sm:border-r sm:border-foreground/15"
                    : ""
                } ${index === 0 ? "sm:pl-0" : ""}`}
              >
                <div className="mb-5 flex items-center justify-center text-primary">
                  <Icon size={48} />
                </div>

                <h3 className="text-lg font-bold text-foreground md:text-2xl">
                  {principle.title}
                </h3>

                <p className="mt-2 max-w-sm text-base leading-7 text-foreground/65 text-center">
                  {principle.subtitle}
                </p>
              </Reveal>
            );
          })}
        </div>

        {/* Padding bawah section */}
        <div className="h-16 md:h-20" />
      </div>
    </section>
  );
}
