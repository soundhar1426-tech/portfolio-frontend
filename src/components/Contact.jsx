import React from 'react';
import { Mail, Phone, Github, Linkedin, ExternalLink } from 'lucide-react';

const CONTACT_INFO = [
  {
    icon: <Mail size={22} />,
    label: 'Email Address',
    value: 'soundhar1426@gmail.com',
    href: 'mailto:soundhar1426@gmail.com',
    external: false
  },
  {
    icon: <Phone size={22} />,
    label: 'Phone Number',
    value: '+91 9566647825',
    href: 'tel:9566647825',
    external: false
  },
  {
    icon: <Github size={22} />,
    label: 'GitHub Profile',
    value: 'soundhar1426-tech',
    href: 'https://github.com/soundhar1426-tech',
    external: true
  },
  {
    icon: <Linkedin size={22} />,
    label: 'LinkedIn Profile',
    value: 'soundhar-d-m',
    href: 'https://www.linkedin.com/in/soundhar-d-m-0b4436293',
    external: true
  }
];

export const Contact = () => {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="section-tag">Get in Touch</span>
            <h2 className="section-title">Contact</h2>
          </div>
        </div>

        <div className="contact-grid">
          {CONTACT_INFO.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : '_self'}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className="contact-card"
            >
              <div className="contact-icon-box">{item.icon}</div>
              <div>
                <span className="contact-label">{item.label}</span>
                <div className="contact-value" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                  <span>{item.value}</span>
                  {item.external && <ExternalLink size={14} color="var(--text-muted)" />}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
