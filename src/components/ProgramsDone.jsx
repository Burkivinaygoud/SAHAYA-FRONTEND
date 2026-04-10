import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';

export default function ProgramsDone() {
  const { programsDoneData } = useContext(DataContext);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const openGallery = (program, index) => {
    setSelectedProgram(program);
    setCurrentPhotoIndex(index || 0);
  };

  const closeGallery = () => {
    setSelectedProgram(null);
  };

  const nextPhoto = () => {
    if (selectedProgram) {
      setCurrentPhotoIndex((prev) => (prev + 1) % selectedProgram.photos.length);
    }
  };

  const prevPhoto = () => {
    if (selectedProgram) {
      setCurrentPhotoIndex((prev) => (prev - 1 + selectedProgram.photos.length) % selectedProgram.photos.length);
    }
  };

  return (
    <section className="programs-done">
      <div className="team-hero">
        <span className="team-hero-tag">Our Impact</span>
        <h2 className="team-hero-title">Our <em>Work</em></h2>
        <p className="team-hero-sub">Transforming Lives Through Action</p>
        <div className="team-hero-line"></div>
      </div>

      <div className="container">

        <div className="programs-done-grid">
          {programsDoneData.length > 0 ? (
            programsDoneData.map((program, index) => (
              <div key={index} className="programs-done-card">
                <div className="programs-done-image-wrap" onClick={() => openGallery(program, 0)} style={{ cursor: 'pointer' }}>
                  <img src={program.photos[0]} alt={program.title} className="programs-done-image" />
                  <div className="programs-done-overlay">
                    <span className="programs-done-date">{new Date(program.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    {program.photos.length > 1 && <span className="programs-done-photo-count">📷 {program.photos.length}</span>}
                  </div>
                </div>
                <div className="programs-done-body">
                  <h3 className="programs-done-title">{program.title}</h3>
                  <p className="programs-done-description">{program.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', color: 'var(--text-light)' }}>
              <p>No completed programs yet. More coming soon!</p>
            </div>
          )}
        </div>
      </div>

      {selectedProgram && (
        <div className="photo-gallery-modal" onClick={closeGallery}>
          <div className="photo-gallery-content" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-close" onClick={closeGallery}>✕</button>
            <div className="gallery-main">
              <img src={selectedProgram.photos[currentPhotoIndex]} alt="Gallery" className="gallery-image" />
              {selectedProgram.photos.length > 1 && (
                <>
                  <button className="gallery-prev" onClick={prevPhoto}>❮</button>
                  <button className="gallery-next" onClick={nextPhoto}>❯</button>
                  <div className="gallery-counter">{currentPhotoIndex + 1} / {selectedProgram.photos.length}</div>
                </>
              )}
            </div>
            <div className="gallery-title">{selectedProgram.title}</div>
            {selectedProgram.photos.length > 1 && (
              <div className="gallery-thumbnails">
                {selectedProgram.photos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo}
                    alt={`Photo ${idx + 1}`}
                    className={`gallery-thumb ${idx === currentPhotoIndex ? 'active' : ''}`}
                    onClick={() => setCurrentPhotoIndex(idx)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
