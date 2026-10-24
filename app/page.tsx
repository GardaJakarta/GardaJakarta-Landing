import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/layout/Footer";
import AboutUs from "@/components/sections/AboutUs";
import HowItWorks from "@/components/sections/HowItWorks";
import Help from "@/components/sections/Help";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <AboutUs />
        <HowItWorks/>
        <Help />
      </main>
      <Footer />
    </div>
  );
}
