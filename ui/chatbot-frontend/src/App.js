import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ChatBox from './components/ChatBox';
import './App.css'; // Create this for basic styling

function App() {
  const [sessionId, setSessionId] = useState(null);

  return (
    <div className="app">
      <h1>PDF Chatbot</h1>
      {!sessionId ? (
        <div className="upload-section">
          <h2>Upload a PDF to start chatting</h2>
          <FileUpload setSessionId={setSessionId} />
        </div>
      ) : (
        <div className="chat-section">
          <ChatBox sessionId={sessionId} />
          <button 
            className="reset-btn" 
            onClick={() => setSessionId(null)}
          >
            Upload New PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default App;