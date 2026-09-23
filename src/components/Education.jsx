import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

export const Education = () => {
  return (
    <section id="education" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div>
            <span className="section-tag">Academic Journey</span>
            <h2 className="section-title">Education</h2>
          </div>
        </div>

        <div className="education-card">
          <div className="education-icon-box">
            <GraduationCap size={28} />
          </div>

          <div style={{ flex: 1 }}>
            <h3 className="education-degree">Bachelor of Engineering (B.E.) in Mechanical Engineering</h3>
            <p className="education-institution">Sri Eshwar College of Engineering</p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
              <span className="education-duration">
                <Calendar size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '5px' }} />
                2023 – 2027
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
