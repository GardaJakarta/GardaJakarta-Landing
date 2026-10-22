import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
}
