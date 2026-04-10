import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import GalleryPage from './pages/GalleryPage';
import ProgramsDonePage from './pages/ProgramsDonePage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (hash) {
      const elementId = hash.replace('#', '');

      const scrollToElement = () => {
        const target = document.getElementById(elementId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

      // Delay one frame so the target section is present after route render.
      requestAnimationFrame(scrollToElement);
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function App() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [backToTopVisible, setBackToTopVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      setBackToTopVisible(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <DataProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="app">
          <Navbar scrolled={scrolled} onAdminClick={() => setAdminOpen(true)} />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/programs-done" element={<ProgramsDonePage />} />
          </Routes>

          <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} />
          
          {backToTopVisible && (
            <button 
              id="back-top"
              className="visible"
              onClick={scrollToTop}
              title="Back to top"
            >
              ↑
            </button>
          )}

          <Footer onAdminClick={() => setAdminOpen(true)} />
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
