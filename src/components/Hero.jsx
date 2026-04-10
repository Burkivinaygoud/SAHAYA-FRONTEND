import React, { useState, useEffect } from 'react';

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-bg-circles"></div>
      <div className="hero-slider">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`hero-slide ${activeSlide === i ? 'active' : ''}`}></div>
        ))}
      </div>
      <div className="hero-content">
        <div className="hero-badge">✦ Non-Profit · HITAM Initiative · Est. 2008</div>
        <h1>Empowering <span>Lives</span>,<br/>Building Brighter Futures</h1>
        <p>SAHAYA is dedicated to transforming the lives of underprivileged children through education, enabling them to maximize their true potential.</p>
        <div className="hero-btns">
          <a href="#about" className="btn-primary">Discover Our Work</a>
          <a href="#programs" className="btn-outline">Our Programs</a>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="arrow"></div>
        Scroll
      </div>
    </section>
  );
}
