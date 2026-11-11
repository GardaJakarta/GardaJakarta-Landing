# Garda Jakarta Landing

Website publik Garda Jakarta — platform informasi keamanan perkotaan yang membantu masyarakat mengenali situasi di sekitarnya dan ikut membangun Jakarta yang lebih aman.

Landing page ini memperkenalkan misi Garda Jakarta, prinsip produk, alur kontribusi masyarakat, dan kanal bantuan. Saat ini halaman utama merupakan halaman statis berbasis Next.js; tombol dan formulir yang belum terhubung ke layanan backend masih menjadi titik integrasi berikutnya.

## Fitur

- Hero section dengan video latar dan ajakan untuk menjelajahi halaman.
- Navigasi responsif dengan menu mobile.
- Bagian tentang Garda Jakarta dan tiga prinsip produk.
- Alur empat langkah: pantau peta, kenali situasi, buat laporan, dan berkontribusi.
- Formulir bantuan dengan field nama, email, dan pesan.
- Animasi entrance berbasis Framer Motion.
- Smooth scrolling berbasis Lenis dengan fallback untuk `prefers-reduced-motion`.

## Teknologi

| Layer | Teknologi |
| --- | --- |
| Framework | Next.js 16 App Router |
| UI | React 19, TypeScript, Tailwind CSS 4 |
| Icons | Phosphor Icons |
| Animation | Framer Motion |
| Scrolling | Lenis |
| Quality | ESLint, TypeScript, Next.js production build |

## Struktur Project

| Direktori | Tanggung jawab |
| --- | --- |
| `app` | Root layout, metadata, halaman utama, dan global styles |
| `components/branding` | Logo dan tagline Garda Jakarta |
| `components/layout` | Navbar dan footer |
| `components/motion` | Wrapper reveal dan smooth scroll |
| `components/sections` | Hero, About Us, How It Works, dan Help |
| `public/images` | Ilustrasi dan gambar section |
| `public/videos` | Video latar hero |

## Menjalankan Secara Lokal

### Prasyarat

- Node.js yang kompatibel dengan Next.js 16
- npm

### Instalasi

```bash
git clone https://github.com/GardaJakarta/GardaJakarta-Landing.git
cd GardaJakarta-Landing
npm ci
```

### Development server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

### Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Repository dan aplikasi terkait

Repository bersifat publik (diperiksa 8 November 2026). Landing menggunakan branch utama `master`.

| Bagian | Repository | Akses aplikasi |
| --- | --- | --- |
| Landing Next.js | [GardaJakarta-Landing](https://github.com/GardaJakarta/GardaJakarta-Landing) | [gardajakarta.my.id](https://gardajakarta.my.id) |
| Aplikasi React | [GardaJakarta-FE](https://github.com/GardaJakarta/GardaJakarta-FE) | [Peta publik](https://app.gardajakarta.my.id/map) |
| API Express | [GardaJakarta-BE](https://github.com/GardaJakarta/GardaJakarta-BE) | [Swagger](https://api.gardajakarta.my.id/api/docs) |

Untuk menjalankan aplikasi laporan, API, dan PostgreSQL melalui Docker, ikuti [quick start Compose backend](https://github.com/GardaJakarta/GardaJakarta-BE#quick-start-dengan-docker). Landing ini dijalankan terpisah melalui Next.js; tidak termasuk Compose tersebut.

## Progress

Status dokumentasi: **8 November 2026**. Tabel ini menjelaskan implementasi yang tersedia, bukan klaim bahwa seluruh skenario produksi sudah diuji.

| Area | Status | Bukti |
| --- | --- | --- |
| Pengenalan produk dan alur kontribusi | Tersedia | Hero, About Us, How It Works dalam `components/sections` |
| Navigasi desktop/mobile | Tersedia | `components/layout` |
| Animasi dan reduced motion | Tersedia | `components/motion` |
| Form bantuan | UI tersedia | Pengiriman ke API belum terintegrasi |
| Dashboard/peta/laporan | Repository terpisah | Lihat README frontend dan backend |
| Evaluasi produk | Berjalan | Perbaikan berdasarkan pengujian pengguna dan rubrik |

Tujuan Garda Jakarta adalah memudahkan warga mengenali kondisi lingkungan, menyampaikan laporan dengan lokasi, dan memantau progres penanganan. Visual/data contoh untuk pengembangan tidak menggantikan informasi kriminal resmi.

## Catatan Implementasi

- Smooth scroll hanya diaktifkan ketika browser tidak meminta pengurangan gerak.
- Animasi reveal menggunakan `whileInView` dan hanya berjalan sekali per elemen.
- Struktur, spacing, warna, dan konten visual existing dipertahankan; Framer Motion hanya menambahkan transisi masuk dan perubahan state interaktif.
- Form bantuan belum mengirim data ke API. Handler saat ini mencegah reload halaman sambil menunggu integrasi backend.

## Kontribusi

1. Buat branch dari `master`.
2. Jalankan lint, typecheck, dan build sebelum membuka pull request.
3. Jelaskan perubahan visual atau behavior yang berdampak pada pengalaman pengguna.
4. Sertakan screenshot atau video singkat untuk perubahan UI yang terlihat.
