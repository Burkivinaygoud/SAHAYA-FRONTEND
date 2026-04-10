import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ scrolled, onAdminClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <Link to="/" className="nav-logo">
        <img src="/images/sahaya-logo.png" alt="Sahaya Logo" onError={(e) => e.target.style.display = 'none'} />
        <div style={{ display: 'none', width: '44px', height: '44px', background: 'var(--blue-deep)', borderRadius: '10px', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'Cormorant Garamond,serif', fontWeight: '700', fontSize: '1rem' }}>S</div>
        <div className="nav-logo-text">
          <span className="name">SAHAYA</span>
          <span className="sub">HITAM · Est. 2008</span>
        </div>
      </Link>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="/#about">About ▾</a>
          <div className="dropdown-menu">
            <a href="/#mission">Our Mission</a>
            <Link to="/team">Our Team</Link>
          </div>
        </li>
        <li>
          <a href="/#programs">Programs ▾</a>
          <div className="dropdown-menu">
            <a href="/#programs">All Programs</a>
            <Link to="/programs-done">Work</Link>
          </div>
        </li>
        <li><Link to="/gallery">Gallery</Link></li>
        <li><a href="/#contact">Contact</a></li>
      </ul>

      <div className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu open">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <a href="/#about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="/#programs" onClick={() => setMobileMenuOpen(false)}>Programs</a>
          <Link to="/programs-done" onClick={() => setMobileMenuOpen(false)}>Work</Link>
          <Link to="/gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
          <Link to="/team" onClick={() => setMobileMenuOpen(false)}>Team</Link>
          <a href="/#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </div>
      )}
    </nav>
  );
}
