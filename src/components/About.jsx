import React from 'react';
import { Layers, Terminal, Sparkles, Compass } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div>
            <span className="section-tag">Background &amp; Profile</span>
            <h2 className="section-title">About Me</h2>
          </div>
        </div>

        <div className="about-card">
          <p className="about-text">
            I am currently pursuing my <strong>B.E. in Mechanical Engineering</strong> while actively specializing in <strong>software development and full-stack web engineering</strong>. With a deep passion for modern web technologies, my primary development focus is centered around the <strong>MERN Stack (MongoDB, Express.js, React.js, Node.js)</strong>.
          </p>
          <p className="about-text">
            I believe that the best way to master technology is through purposeful execution. Rather than merely following theoretical concepts, I consistently build practical web applications, solving real-world design and architectural problems while continuously adopting modern web standards.
          </p>

          <div className="about-highlights">
            <div className="about-highlight-item">
              <div className="highlight-title">
                <Layers size={18} color="var(--accent-primary)" />
                <span>Full-Stack Focus</span>
              </div>
              <p className="highlight-desc">
                Architecting end-to-end applications from dynamic React interfaces to robust Express &amp; MongoDB backends.
              </p>
            </div>

            <div className="about-highlight-item">
              <div className="highlight-title">
                <Terminal size={18} color="var(--accent-primary)" />
                <span>Practical Builder</span>
              </div>
              <p className="highlight-desc">
                Developing responsive, real-world web applications and learning new frameworks by working on tangible projects.
              </p>
            </div>

            <div className="about-highlight-item">
              <div className="highlight-title">
                <Compass size={18} color="var(--accent-primary)" />
                <span>Engineering Mindset</span>
              </div>
              <p className="highlight-desc">
                Combining analytical engineering problem-solving with modern, clean, and maintainable software practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
