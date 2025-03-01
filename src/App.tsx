import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ChatInterface from './components/ChatInterface';
import { ThemeProvider } from './context/ThemeContext';
import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatInterface />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App; 