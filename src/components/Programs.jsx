import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';

export default function Programs() {
  const { programsData } = useContext(DataContext);

  return (
    <section id="programs" className="programs">
      <div className="container">
        <div className="programs-header">
          <div>
            <span className="section-tag">What We Do</span>
            <h2 className="section-title">Our Programs</h2>
            <div className="divider"></div>
            <p className="section-sub">Each program is designed with care to address the specific needs of the children and communities we serve.</p>
          </div>
          <a href="#contact" className="btn-primary" style={{ background: 'var(--blue-mid)', color: 'white', whiteSpace: 'nowrap' }}>Get Involved →</a>
        </div>
        <div className="programs-grid">
          {programsData.map((program, i) => (
            <div key={i} className="program-card">
              <div className="program-img-wrap">
                <img className="program-img" src={program.img} alt={program.title} />
              </div>
              <div className="program-body">
                <span className="program-tag">{program.cat}</span>
                <h3>{program.title}</h3>
                <p>{program.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
