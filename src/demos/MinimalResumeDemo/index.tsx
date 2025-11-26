import React, { useState, useEffect } from 'react';
import { useTheme } from '../../theme';
import './index.css';

interface ResumeData {
  name: string;
  title: string;
  contact: {
    email: string;
    phone: string;
    website: string;
  };
  skills: string[];
  experience: {
    company: string;
    position: string;
    period: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    period: string;
  }[];
}

const MinimalResumeDemo: React.FC = () => {
  const [activeSection, setActiveSection] = useState('about');
  const { effective: globalTheme, setMode: setGlobalTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(globalTheme === 'dark');

  // 监听全局主题变化，保持组件主题与全局主题同步
  useEffect(() => {
    setIsDarkMode(globalTheme === 'dark');
  }, [globalTheme]);

  const resumeData: ResumeData = {
    name: 'XXXX',
    title: 'XXX工程师',
    contact: {
      email: 'XXXX@example.com',
      phone: 'XXX-XXX-XXXX',
      website: 'portfolio.example.com',
    },
    skills: ['React', 'TypeScript', 'JavaScript', 'CSS3', 'HTML5', 'Node.js', 'Git', 'Webpack'],
    experience: [
      {
        company: 'ABC科技有限公司',
        position: '高级前端工程师',
        period: '2020 - 至今',
        description: '负责公司核心产品的前端开发和维护，参与技术选型和架构设计，优化性能和用户体验。',
      },
      {
        company: 'XYZ互联网公司',
        position: '前端开发工程师',
        period: '2018 - 2020',
        description: '参与多个项目的前端开发工作，负责组件开发和页面实现，与后端团队协作完成接口对接。',
      },
    ],
    education: [
      {
        institution: '清华大学',
        degree: '计算机科学与技术专业 学士',
        period: '2014 - 2018',
      },
    ],
  };

  const sections = [
    { id: 'about', label: '关于' },
    { id: 'skills', label: '技能' },
    { id: 'experience', label: '经历' },
    { id: 'education', label: '教育' },
  ];

  return (
      <div className={`minimal-resume ${isDarkMode ? 'dark-mode' : ''}`}>
        {/* 顶部导航 */}
        <header className="resume-header">
        <div className="header-content">
          <h1 className="resume-name">{resumeData.name}</h1>
          <p className="resume-title">{resumeData.title}</p>
        </div>
        <button
          className="theme-toggle"
          onClick={() => {
            const newMode = !isDarkMode;
            setIsDarkMode(newMode);
            setGlobalTheme(newMode ? 'dark' : 'light');
          }}
          aria-label="切换主题"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </header>

      {/* 联系方式 */}
      <div className="contact-info">
        <a href={`mailto:${resumeData.contact.email}`} className="contact-item">
          ✉️ {resumeData.contact.email}
        </a>
        <a href={`tel:${resumeData.contact.phone}`} className="contact-item">
          📞 {resumeData.contact.phone}
        </a>
        <a href={`https://${resumeData.contact.website}`} className="contact-item">
          🌐 {resumeData.contact.website}
        </a>
      </div>

      {/* 导航菜单 */}
      <nav className="section-nav">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`nav-button ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </nav>

        {/* 内容区域 */}
        <main className="resume-content">
        {/* 关于部分 */}
        {activeSection === 'about' && (
          <section className="about-section">
            <div className="about-card">
              <h2>关于我</h2>
              <p>
                一名热爱前端技术的开发者，专注于创建优雅、高效的用户界面。
                拥有丰富的React开发经验，熟悉现代前端技术栈，
                致力于不断学习和探索新技术，提升自己的专业能力。
              </p>
            </div>
          </section>
        )}

        {/* 技能部分 */}
        {activeSection === 'skills' && (
          <section className="skills-section">
            <h2>技能</h2>
            <div className="skills-grid">
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="skill-card">
                  <span className="skill-name">{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 经历部分 */}
        {activeSection === 'experience' && (
          <section className="experience-section">
            <h2>工作经历</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="experience-card">
                <div className="experience-header">
                  <h3 className="company-name">{exp.company}</h3>
                  <span className="period">{exp.period}</span>
                </div>
                <p className="position">{exp.position}</p>
                <p className="description">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* 教育部分 */}
        {activeSection === 'education' && (
          <section className="education-section">
            <h2>教育背景</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="education-card">
                <div className="education-header">
                  <h3 className="institution">{edu.institution}</h3>
                  <span className="period">{edu.period}</span>
                </div>
                <p className="degree">{edu.degree}</p>
              </div>
            ))}
          </section>
        )}
      </main>

      {/* 页脚 */}
      <footer className="resume-footer">
        <p>个人简历</p>
      </footer>
    </div>
  );
};

export default MinimalResumeDemo;