import React from 'react';

interface Chat {
  id: string;
  title: string;
  timestamp: string;
}

interface ChatSidebarProps {
  chats: Chat[];
  activeChat: string | null;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  isOpen: boolean;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chats,
  activeChat,
  onNewChat,
  onSelectChat,
  isOpen,
}) => {
  // Format the timestamp to be more readable
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    // If it's today, just show the time
    if (date.toDateString() === now.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    // If it's this year, show month and day
    if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
    
    // Otherwise show full date
    return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className={`chat-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h1 className="app-title">BenAI</h1>
        <button className="new-chat-button" onClick={onNewChat}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span className="new-chat-text">New Chat</span>
        </button>
      </div>
      
      <div className="chats-list">
        {chats.length === 0 ? (
          <div className="no-chats-message">
            No chats yet. Start a new conversation!
          </div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${chat.id === activeChat ? 'active' : ''}`}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="chat-item-content">
                <div className="chat-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div className="chat-details">
                  <div className="chat-title">{chat.title || 'New Chat'}</div>
                  <div className="chat-timestamp">{formatTimestamp(chat.timestamp)}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="sidebar-footer">
        <div className="app-version">BenAI v1.0.0</div>
        <a href="https://github.com/yourusername/benai" target="_blank" rel="noopener noreferrer" className="github-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          <span>GitHub</span>
        </a>
      </div>
    </div>
  );
};

export default ChatSidebar; 