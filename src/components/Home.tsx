import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="home">
      <div className="theme-toggle-container">
        <button 
          className="theme-toggle-button" 
          onClick={toggleDarkMode}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>
      </div>

      <div className="hero-content">
        <div className="logo-container">
          <div className="ai-orb"></div>
        </div>
        <h1>BenAI</h1>
        
        <button className="cta-button" onClick={() => navigate('/chat')}>
          <span className="button-text">Launch AI Chat</span>
          <span className="button-icon">→</span>
        </button>
        
        <p className="tagline">Experience the future of conversation</p>
        <p className="subtitle">Powered by advanced artificial intelligence to help you solve problems, answer questions, and spark creativity.</p>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Natural Conversations</h3>
            <p>Chat naturally with an AI that understands context and nuance</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Knowledge Base</h3>
            <p>Access a vast knowledge base spanning diverse topics</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Responses</h3>
            <p>Get immediate, thoughtful answers to your questions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 