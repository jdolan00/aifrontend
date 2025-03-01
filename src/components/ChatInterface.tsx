import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ChatSidebar from './ChatSidebar';
import { useTheme } from '../context/ThemeContext';

interface Message {
  role: 'user' | 'bot';
  content: string;
  timestamp: string;
}

interface Chat {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}

const ChatInterface: React.FC = () => {
  const initialChat: Chat = {
    id: Date.now().toString(),
    title: 'New Chat',
    timestamp: new Date().toLocaleString(),
    messages: [],
  };
  const [chats, setChats] = useState<Chat[]>([initialChat]);
  const [activeChat, setActiveChat] = useState<string | null>(initialChat.id);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();

  // Auto-resize textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputText]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      timestamp: new Date().toLocaleString(),
      messages: [],
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChat.id);
    setIsSidebarOpen(true);
  };

  const getCurrentChat = () => {
    return chats.find((chat) => chat.id === activeChat);
  };

  const updateChatMessages = (chatId: string, messages: Message[]) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages,
              title: messages[0]?.content.slice(0, 30) || 'New Chat',
              timestamp: new Date().toLocaleString(),
            }
          : chat
      )
    );
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats, activeChat]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const sendMessage = async () => {
    if (!inputText.trim() || !activeChat) return;

    const currentChat = getCurrentChat();
    if (!currentChat) return;

    const userMessage: Message = {
      role: 'user',
      content: inputText.trim(),
      timestamp: new Date().toLocaleString(),
    };

    const updatedMessages = [...currentChat.messages, userMessage];
    updateChatMessages(activeChat, updatedMessages);
    setInputText('');
    setIsLoading(true);

    try {
      // Simulate API call with a delay
      setTimeout(() => {
        const botMessage: Message = {
          role: 'bot',
          content: "I'm BenAI, a sophisticated AI assistant. I'm here to help answer your questions, provide information, and assist with various tasks. How can I help you today?",
          timestamp: new Date().toLocaleString(),
        };
  
        updateChatMessages(activeChat, [...updatedMessages, botMessage]);
        setIsLoading(false);
      }, 1500);

      // Uncomment for real API integration
      // const response = await axios.post('/api/chat', {
      //   message: userMessage.content,
      // });
      // 
      // const botMessage: Message = {
      //   role: 'bot',
      //   content: response.data.response,
      //   timestamp: new Date().toLocaleString(),
      // };
      // 
      // updateChatMessages(activeChat, [...updatedMessages, botMessage]);
      // setIsLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleBackClick = () => {
    const container = document.querySelector('.chat-container');
    if (container) {
      container.classList.add('slide-out');
      setTimeout(() => {
        navigate('/');
      }, 300);
    }
  };

  const formatMessageContent = (content: string) => {
    // Simple formatting for message content
    // Replace URLs with clickable links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return content.replace(urlRegex, (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
  };

  return (
    <div className="chat-container">
      <ChatSidebar
        chats={chats}
        activeChat={activeChat}
        onNewChat={createNewChat}
        onSelectChat={setActiveChat}
        isOpen={isSidebarOpen}
      />
      
      <div className="chat-interface">
        <div className="chat-header">
          <div className="header-left">
            <button className="menu-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
              ☰
            </button>
            <button className="back-button" onClick={handleBackClick} aria-label="Go back">
              ←
            </button>
          </div>
          <div className="header-center">
            <h2 className="chat-title">
              {getCurrentChat()?.title || 'New Chat'}
            </h2>
          </div>
          <div className="header-right">
            <div className="model-indicator">
              <div className="model-dot"></div>
              <span>BenAI Assistant</span>
            </div>
            <button 
              className="theme-toggle-button" 
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
        
        <div className="messages-container">
          {(!activeChat || getCurrentChat()?.messages.length === 0) && (
            <div className="welcome-message">
              <div className="ai-orb-small"></div>
              <h3>Hello! I'm BenAI.</h3>
              <p>How can I assist you today? Ask me anything!</p>
            </div>
          )}
          {getCurrentChat()?.messages.map((message, index) => (
            <div
              key={index}
              className={`message-wrapper ${message.role}`}
            >
              <div className="message">
                <div 
                  className="message-content"
                  dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }}
                ></div>
                <div className="message-timestamp">{message.timestamp}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message-wrapper bot">
              <div className="message">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={isLoading}
            className="chat-input"
            rows={1}
          />
          <button 
            onClick={sendMessage} 
            disabled={isLoading || !inputText.trim()}
            className="send-button"
            aria-label="Send message"
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface; 