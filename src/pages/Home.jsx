import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Courses from '../components/Courses';
import Contact from '../components/Contact';

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Courses />
      <Contact />
    </>
  );
}

export default Home;
