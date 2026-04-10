import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ onAdminClick }) {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="logo-text">SAHAYA</div>
          <p>A non-profit initiative by HITAM dedicated to empowering underprivileged children through education and community support since 2008.</p>
        </div>
        <div className="footer-col">
          <h5>Organization</h5>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><Link to="/team">Our Team</Link></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Programs</h5>
          <ul>
            <li><a href="#programs">Education Drives</a></li>
            <li><a href="#programs">Outreach Events</a></li>
            <li><a href="#programs">Orphanage Visits</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Quick Links</h5>
          <ul>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onAdminClick(); }}>Admin Panel</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 SAHAYA – HITAM. All rights reserved.</span>
        
      </div>
    </footer>
  );
}
