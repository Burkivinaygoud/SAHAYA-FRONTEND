import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';

export default function Contact() {
  const { addMessage } = useContext(DataContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      showToast('Please fill in all fields!');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address!');
      return;
    }

    addMessage({ name, email, subject, message });
    setFormData({ name: '', email: '', subject: '', message: '' });
    showToast('✓ Message sent! We will get back to you soon.');
  };

  return (
    <>
      <section id="contact" className="contact">
        <div className="container">
          <div className="contact-grid">
            <div>
              <span className="section-tag" style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}>Get in Touch</span>
              <h2 className="section-title">Contact Us</h2>
              <div className="divider" style={{ background: 'rgba(255,255,255,0.3)' }}></div>
              <p className="section-sub">Want to volunteer, partner with us, or learn more about our programs? We'd love to hear from you.</p>
              <div className="contact-info-items">
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <h5>Address</h5>
                    <p>HITAM – Hyderabad Institute of Technology and Management, Gowdavelli, Medchal Road, Hyderabad – 501401</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div>
                    <h5>Email</h5>
                    <p>sahaya@hitam.org</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">📱</div>
                  <div>
                    <h5>Phone</h5>
                    <p>+91 XXXXX XXXXX</p>
                  </div>
                </div>
              </div>
              <div className="contact-social">
                <a href="#" className="social-btn" title="Instagram" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/company/sahaya-society/" className="social-btn" title="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
            <div>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    placeholder="Tell us more..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="btn-submit">Send Message →</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {toast && <div className={`toast show`}>{toast}</div>}
    </>
  );
}
