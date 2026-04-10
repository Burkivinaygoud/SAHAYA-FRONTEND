import React from 'react';

export default function Mission() {
  const missions = [
    {
      icon: '📖',
      title: 'Quality Education',
      desc: 'We bridge the education gap by providing learning opportunities, tutoring support, and academic resources to children who lack access to quality schooling.',
    },
    {
      icon: '💪',
      title: 'Empowerment',
      desc: 'Beyond academics, we empower children with life skills, confidence, and the belief that their potential has no limits — regardless of their background.',
    },
    {
      icon: '🌱',
      title: 'Sustainable Change',
      desc: 'We focus on creating lasting transformation in communities by building long-term relationships with schools, families, and local organizations.',
    },
  ];

  return (
    <section id="mission" className="mission">
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto' }}>
          <span className="section-tag">What We Stand For</span>
          <h2 className="section-title">Our Pillars of Impact</h2>
          <p className="section-sub">Every initiative we take is rooted in these core beliefs that guide our purpose and drive our work forward.</p>
        </div>
        <div className="mission-grid">
          {missions.map((mission, i) => (
            <div key={i} className="mission-card">
              <div className="mission-icon">{mission.icon}</div>
              <h3>{mission.title}</h3>
              <p>{mission.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
