import React from 'react';
import { ExternalLink, Mail, Phone, Github, Linkedin, ArrowDown, FolderCode } from 'lucide-react';

const RESUME_URL = 'https://drive.google.com/drive/folders/1F9nStni6TJLTobplYyUvbifUuOlc1RQS?usp=sharing';
const GITHUB_URL = 'https://github.com/soundhar1426-tech';
const LINKEDIN_URL = 'https://www.linkedin.com/in/soundhar-d-m-0b4436293';
const EMAIL = 'soundhar1426@gmail.com';
const PHONE = '9566647825';

export const Hero = () => {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="hero-badge">
              <span className="hero-badge-pulse"></span>
              <span>Available for Opportunities</span>
            </div>

            <h1 className="hero-name">Soundhar D M</h1>
            <h2 className="hero-title">MERN Stack Developer</h2>

            <p className="hero-bio">
              I am pursuing B.E. Mechanical Engineering with a strong passion for software development and full-stack web engineering. My main focus is building reliable, scalable web applications with the MERN stack and learning emerging technologies through hands-on project building.
            </p>

            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => scrollTo('#projects')}>
                <FolderCode size={18} />
                <span>View Projects</span>
              </button>

              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <span>View Resume</span>
                <ExternalLink size={16} />
              </a>

              <button className="btn btn-outline" onClick={() => scrollTo('#contact')}>
                <Mail size={16} />
                <span>Contact Me</span>
              </button>
            </div>

            <div className="hero-socials">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                title="GitHub Profile"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                title="LinkedIn Profile"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="social-icon-btn"
                title={`Email: ${EMAIL}`}
                aria-label="Email"
              >
                <Mail size={18} />
              </a>

              <a
                href={`tel:${PHONE}`}
                className="social-icon-btn"
                title={`Call: ${PHONE}`}
                aria-label="Phone"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
