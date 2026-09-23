import React from 'react';
import { Layout, Server, Database, Code, Wrench, BarChart2 } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: <Layout size={20} />,
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Bootstrap']
  },
  {
    title: 'Backend',
    icon: <Server size={20} />,
    skills: ['Node.js', 'Express.js', 'REST APIs']
  },
  {
    title: 'Databases',
    icon: <Database size={20} />,
    skills: ['MongoDB', 'SQL']
  },
  {
    title: 'Programming Languages',
    icon: <Code size={20} />,
    skills: ['Python', 'C']
  },
  {
    title: 'Developer Tools',
    icon: <Wrench size={20} />,
    skills: ['Git', 'GitHub', 'VS Code']
  },
  {
    title: 'Other',
    icon: <BarChart2 size={20} />,
    skills: ['Power BI', 'Microsoft Office']
  }
];

export const Skills = () => {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="section-tag">Technical Competencies</span>
            <h2 className="section-title">Skills &amp; Tech Stack</h2>
          </div>
        </div>

        <div className="skills-grid">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="skill-category-card">
              <div className="skill-category-header">
                <div className="skill-category-icon">{cat.icon}</div>
                <h3 className="skill-category-title">{cat.title}</h3>
              </div>
              <div className="skill-tags">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
