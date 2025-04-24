import React, { useState, useCallback } from 'react';
import axios from 'axios';

export default function FileUpload({ setSessionId }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const uploadFile = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("http://localhost:8000/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSessionId(res.data.session_id);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div 
      className={`file-upload drop-zone ${dragActive ? 'drag-active' : ''}`} 
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files[0])} 
        accept=".pdf,.docx,.xlsx,.xls,.png,.jpg,.jpeg" 
        disabled={isUploading}
      />
      <p>Drag and drop a file here, or click to select</p>
      {file && <p>Selected: {file.name}</p>}
      <button onClick={uploadFile} disabled={!file || isUploading}>
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
