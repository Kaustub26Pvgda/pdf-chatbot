import React, { useState } from 'react';
import axios from 'axios';

export default function ChatBox({ sessionId }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append("session_id", sessionId);
      formData.append("question", message);  // Changed from "message" to "question" to match backend

      const res = await axios.post("http://localhost:8000/chat", formData);
      
      // Make sure we're getting the response in expected format
      if (res.data && res.data.response) {
        setChat(prevChat => [
          ...prevChat, 
          { 
            user: message, 
            bot: res.data.response,
            isError: false
          }
        ]);
      } else {
        throw new Error("Unexpected response format");
      }
      
      setMessage('');
    } catch (err) {
      // Proper error handling
      const errorMessage = err.response?.data?.detail || 
                         err.message || 
                         'Failed to get response';
      
      setChat(prevChat => [
        ...prevChat, 
        { 
          user: message, 
          bot: `Error: ${errorMessage}`,
          isError: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {chat.map((c, i) => (
          <div key={i} className={`message ${c.isError ? 'error' : ''}`}>
            <p className="user-message"><b>You:</b> {c.user}</p>
            <p className="bot-message"><b>Bot:</b> {c.bot}</p>
          </div>
        ))}
        {isLoading && <p className="loading">Thinking...</p>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          placeholder="Ask a question about the PDF..."
        />
        <button 
          onClick={sendMessage} 
          disabled={isLoading || !message.trim()}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
}