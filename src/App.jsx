import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Courses from './components/Courses';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="antialiased">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <Courses />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
