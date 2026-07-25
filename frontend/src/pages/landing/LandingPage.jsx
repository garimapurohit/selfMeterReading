import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import About from "../../components/About/About";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import Footer from "../../components/Footer/Footer";

const LandingPage = () => {
  return (
    <div>
      <Navbar />

      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="services">
          <Features />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="how-it-works">
          <HowItWorks />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;