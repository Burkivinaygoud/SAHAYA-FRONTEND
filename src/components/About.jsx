import React from 'react';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-stack">
            <div className="about-logo-bg"></div>
            <img className="about-sahaya-logo" src="images/sahaya-logo.png" alt="SAHAYA Logo" />
            <div className="about-badge-card">
              <div className="num">2008</div>
              <div className="lbl">Year Established</div>
            </div>
          </div>
          <div className="about-text">
            <span className="section-tag">Who We Are</span>
            <h2 className="section-title">A Movement Born from Compassion</h2>
            <div className="divider"></div>
            <p>SAHAYA (est. 2008) is a non-profit organization and a proud initiative supported by HITAM — Hyderabad Institute of Technology and Management. Our name means "help" or "support," and that is exactly what we strive to offer every single day.</p>
            <p>With a mission to positively impact the lives of underprivileged children, we work primarily in the field of education. Our efforts are powered by the passion and dedication of HITAM students who volunteer their time, skills, and hearts for a greater cause.</p>
            <div className="about-features">
              <div className="feature-chip"><span className="icon">📚</span> Education Focus</div>
              <div className="feature-chip"><span className="icon">🤝</span> Student-Led</div>
              <div className="feature-chip"><span className="icon">🏫</span> HITAM Supported</div>
              <div className="feature-chip"><span className="icon">💡</span> Community Impact</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
