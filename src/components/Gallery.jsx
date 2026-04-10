import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';

export default function Gallery() {
  const { galleryData } = useContext(DataContext);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');

  const openLightbox = (url) => {
    setLightboxImage(url);
    setLightboxOpen(true);
  };

  return (
    <>
      <section className="gallery">
        <div className="team-hero">
          <span className="team-hero-tag">Visual Stories</span>
          <h2 className="team-hero-title">Our <em>Gallery</em></h2>
          <p className="team-hero-sub">Moments That Define Our Journey</p>
          <div className="team-hero-line"></div>
        </div>
        <div className="container">
          <div className="gallery-grid">
            {galleryData.map((item, i) => (
              <div
                key={i}
                className={`gallery-item ${i === 0 ? 'featured' : ''}`}
                onClick={() => openLightbox(item.url)}
              >
                <img src={item.url} alt={item.caption} />
                <div className="gallery-overlay"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightboxOpen && (
        <div className="lightbox open" onClick={() => setLightboxOpen(false)}>
          <img src={lightboxImage} alt="Gallery" />
          <button className="lightbox-close" onClick={() => setLightboxOpen(false)}>✕</button>
        </div>
      )}
    </>
  );
}
