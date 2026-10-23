"use client";

import Image from "next/image";
import { MapPinArea, UsersThree, ShieldCheck } from "@phosphor-icons/react";

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
    <section id="about-us" className="bg-white px-6 py-20 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Headline & Description */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
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

          <div className="flex items-center">
            <p className="text-base leading-8 text-foreground/75 md:text-lg">
              Garda Jakarta adalah platform informasi keamanan perkotaan yang
              membantu masyarakat mengenali situasi di sekitarnya. Garda Jakarta
              berupaya meningkatkan kesadaran masyarakat dan mendorong
              partisipasi bersama untuk mewujudkan lingkungan Jakarta yang lebih
              aman dan nyaman.
            </p>
          </div>
        </div>

        {/* Jakarta Image */}
        <div className="mt-12 md:mt-16">
          <div className="relative aspect-16/5 w-full overflow-hidden rounded-2xl">
            <Image
              src="/images/image-jakarta.jpg"
              alt="Pemandangan Kota Jakarta"
              fill
              className="object-cover object-[center_80%]"
              priority
            />
          </div>
        </div>

        {/* Three Principles */}
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-0 md:mt-20">
          {principles.map((principle, index) => {
            const Icon = principle.icon;

            return (
              <div
                key={principle.title}
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
