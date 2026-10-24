"use client";

import Image from "next/image";

export default function Help() {
  return (
    <section
      id="help"
      className="relative overflow-hidden bg-foreground px-6 py-12 md:px-12 md:py-16"
    >
      <Image
        src="/images/image-help-bg.jpg"
        alt=""
        fill
        priority={false}
        className="object-cover"
      />

      {/* Gradient Overlay: Dark on the right, transparent on the left */}
      <div className="absolute inset-0 bg-linear-to-r from-black/65 via-black/15 to-black/0" />

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-xl bg-white p-6 shadow-lg sm:p-8 md:p-10 rounded-2xl">
          <h2 className="mt-3 text-3xl font-medium leading-13 text-foreground md:text-4xl">
            Ada Pertanyaan?
            <br />
            <span className="text-4xl font-bold ">Hubungi Kami</span>.
          </h2>

          <p className="mt-3 text-sm leading-6 text-foreground/65">
            Kirim pertanyaan atau masukan Anda untuk Garda Jakarta.
          </p>

          <form
            className="mt-7 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              // TODO: Hubungkan ke API pengiriman pesan.
            }}
          >
            <div>
              <label
                htmlFor="help-name"
                className="mb-2 block text-sm font-bold text-foreground"
              >
                Nama
              </label>
              <input
                id="help-name"
                name="name"
                type="text"
                placeholder="Nama Anda"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="help-email"
                className="mb-2 block text-sm font-bold text-foreground"
              >
                Email
              </label>
              <input
                id="help-email"
                name="email"
                type="email"
                placeholder="nama@email.com"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="help-message"
                className="mb-2 block text-sm font-bold text-foreground"
              >
                Pesan
              </label>
              <textarea
                id="help-message"
                name="message"
                rows={3}
                placeholder="Tuliskan pesan Anda..."
                required
                className="w-full resize-y rounded-lg border border-gray-200 px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-primary px-5 py-3 font-semibold text-white transition-colors hover:brightness-90"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
