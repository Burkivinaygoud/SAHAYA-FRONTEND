import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';

export default function Team() {
  const { teamData } = useContext(DataContext);

  return (
    <section className="team">

      {/* Full-width gradient header */}
      <div className="team-hero">
        <span className="team-hero-tag">Leadership</span>
        <h2 className="team-hero-title">Meet <em>Our</em> Team</h2>
        <p className="team-hero-sub">The People Behind The Mission</p>
        <div className="team-hero-line"></div>
      </div>

      <div className="container">

        {/* Founder */}
        <div className="founder-section-wrapper">
          <h3 className="team-section-title">Founder</h3>
          <div className="founder-grid">
            {teamData.founder.map((member, i) => (
              <div key={i} className="founder-card">
                <div className="founder-photo-panel">
                  {member.img ? (
                    <img className="founder-img" src={member.img} alt={member.name} />
                  ) : (
                    <div className="team-photo-placeholder founder-photo-placeholder">Photo</div>
                  )}
                </div>
                <div className="founder-quote-panel">
                  <div className="founder-quote-text">"{member.quote}"</div>
                  <div className="founder-quote-name">— {member.name}</div>
                  <div className="founder-quote-role">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Working Committee */}
        <div className="committee-section">
          <span className="team-section-tag">Core Team</span>
          <h3 className="team-section-title">Working Committee</h3>
          <div className="team-grid">
            {teamData.committee.map((member, i) => (
              <div key={i} className="team-card">
                <div className="team-img-wrap">
                  {member.img ? (
                    <img className="team-img" src={member.img} alt={member.name} />
                  ) : (
                    <div className="team-photo-placeholder">Photo</div>
                  )}
                </div>
                <div className="team-info">
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Volunteers */}
        <div className="volunteers-section">
          <span className="team-section-tag">Heart of SAHAYA</span>
          <h3 className="team-section-title">Volunteers</h3>
          <p className="volunteers-desc">{teamData.volunteers.description}</p>
          <div className="volunteers-photo-wrap">
            <img
              className="volunteers-group-photo"
              src={teamData.volunteers.groupPhoto}
              alt="SAHAYA Volunteers"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
