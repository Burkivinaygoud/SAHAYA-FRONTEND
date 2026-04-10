import React from 'react';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import About from '../components/About';
import Mission from '../components/Mission';
import Programs from '../components/Programs';
import Contact from '../components/Contact';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Stats />
      <About />
      <Mission />
      <Programs />
      <Contact />
    </main>
  );
}
