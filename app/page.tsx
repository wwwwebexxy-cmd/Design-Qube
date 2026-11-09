import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import StickyFeatures from "../components/StickyFeatures";
import Contact from "../components/Contact";
import ScrollMarquee from "../components/ScrollMarquee";

export default function Home() {
  return (
    <main className="bg-zinc-950 text-white min-h-screen">
      <Hero />
      <About />
      
      {/* Scroll Marquee Section */}
      <ScrollMarquee />
      
      <Services />
      
      <StickyFeatures />
      <Contact />
    </main>
  );
}

