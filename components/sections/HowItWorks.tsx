"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import Reveal from "@/components/motion/Reveal";

const steps = [
  {
    number: "01",
    title: "Pantau Peta",
    description:
      "Jelajahi peta interaktif untuk melihat informasi kejadian dan memahami situasi keamanan di sekitar Anda.",
    image: "/images/step_1.svg",
  },
  {
    number: "02",
    title: "Kenali Situasi",
    description:
      "Pelajari kategori, waktu, dan lokasi kejadian untuk meningkatkan kewaspadaan sebelum beraktivitas.",
    image: "/images/step_2.svg",
  },
  {
    number: "03",
    title: "Buat Laporan",
    description:
      "Bagikan informasi kejadian yang relevan beserta lokasi, waktu, kategori, dan keterangan pendukung.",
    image: "/images/step_3.svg",
  },
  {
    number: "04",
    title: "Berkontribusi",
    description:
      "Laporan yang diproses sesuai mekanisme platform dapat membantu memperbarui informasi peta keamanan.",
    image: "/images/step_4.svg",
  },
];

export default function HowItWorks() {
  // Step 01 selalu aktif pada render pertama.
  // State tidak menggunakan null agar semua step tidak bisa tertutup.
  const [activeStep, setActiveStep] = useState(0);

  const currentStep = steps[activeStep];

  return (
    <section
      id="how-it-works"
      className="bg-white px-6 py-20 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Centered Heading */}
        <Reveal className="mx-auto mb-14 max-w-4xl text-center md:mb-16">
          <h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Jakarta Lebih Aman,{" "}
            <span className="font-bold">Dimulai dari Kita.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-foreground/65 md:text-lg">
            Pantau situasi, bagikan informasi, dan ikut membangun lingkungan
            yang lebih aman bersama Garda Jakarta.
          </p>
        </Reveal>

        {/* Illustration & Interactive Steps */}
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Left: Illustration */}
          <div className="flex min-h-[320px] items-center justify-center md:min-h-[480px]">
            <motion.div
              key={currentStep.image}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="w-full max-w-md"
            >
              <Image
                src={currentStep.image}
                alt={`Ilustrasi ${currentStep.title}`}
                width={600}
                height={500}
                className="h-auto max-h-[400px] w-full object-contain"
                priority={activeStep === 0}
              />
            </motion.div>
          </div>

          {/* Right: Steps Accordion */}
          <div className="flex flex-col">
            {steps.map((step, index) => {
              const isActive = activeStep === index;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="border-b border-foreground/10 first:border-t"
                >
                  <button
                    type="button"
                    onClick={() => {
                      // Step aktif tidak bisa ditutup.
                      if (!isActive) {
                        setActiveStep(index);
                      }
                    }}
                    aria-expanded={isActive}
                    aria-controls={`step-content-${step.number}`}
                    className="group flex w-full items-center gap-5 py-6 text-left"
                  >
                    {/* Large Step Number */}
                    <span
                      className={`w-[76px] shrink-0 text-4xl font-bold leading-none tracking-tight transition-colors duration-500 md:text-5xl ${
                        isActive
                          ? "text-primary"
                          : "text-foreground/20 group-hover:text-foreground/50"
                      }`}
                    >
                      {step.number}
                    </span>

                    {/* Title */}
                    <span
                      className={`min-w-0 flex-1 text-lg font-bold transition-colors duration-300 md:text-xl ${
                        isActive
                          ? "text-foreground"
                          : "text-foreground/55 group-hover:text-foreground"
                      }`}
                    >
                      {step.title}
                    </span>

                    {/* Minimal Plus / Minus */}
                    <span
                      className={`flex shrink-0 items-center justify-center transition-colors duration-300 ${
                        isActive
                          ? "text-primary"
                          : "text-foreground/40 group-hover:text-primary"
                      }`}
                    >
                      {isActive ? (
                        <Minus size={20} weight="regular" />
                      ) : (
                        <Plus size={20} weight="regular" />
                      )}
                    </span>
                  </button>

                  {/* Smooth Expandable Description */}
                  <div
                    id={`step-content-${step.number}`}
                    aria-hidden={!isActive}
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                      isActive
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`pb-6 pl-[96px] pr-2 text-sm leading-7 text-foreground/65 transition-transform duration-500 ease-in-out md:text-base ${
                          isActive ? "translate-y-0" : "-translate-y-2"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Image transition animation */}
      <style jsx>{`
        @keyframes stepFade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
