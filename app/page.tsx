import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/layout/Footer";
import AboutUs from "@/components/sections/AboutUs";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <AboutUs />
      </main>
      <Footer />
    </div>
  );
}
