import { useEffect } from "react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { FloatingActions } from "./components/FloatingActions";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { Navigation } from "./components/Navigation";
import { Products } from "./components/Products";
import { Services } from "./components/Services";
import { Stats } from "./components/Stats";
import { Testimonials } from "./components/Testimonials";
import { WhyChoose } from "./components/WhyChoose";
import { initPageEnhancements } from "./enhancements";

export default function App() {
  useEffect(() => initPageEnhancements(), []);

  return (
    <>
      <Navigation />
      <Hero />
      <About />
      <Stats />
      <Products />
      <Services />
      <WhyChoose />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingActions />
    </>
  );
}
