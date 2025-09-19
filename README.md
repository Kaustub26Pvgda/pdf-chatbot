# PDF Chatbot 🤖📄

A full-stack intelligent document chatbot that allows users to upload various document formats (PDF, Word, Excel, Images) and interact with them through natural language questions powered by Google's Gemini AI.

I use this when I have an exam the next day and I need to quickly summarize pdfs for 5 mark questions.

## ✨ Features

- **Multi-format Support**: Upload and process PDF, DOCX, XLSX, and image files
- **AI-Powered Conversations**: Chat with your documents using Google Gemini AI
- **OCR Capabilities**: Extract text from images using Tesseract OCR
- **Drag & Drop Interface**: User-friendly file upload with drag-and-drop functionality
- **Session Management**: Maintain conversation context per uploaded document
- **Real-time Chat**: Interactive chat interface with loading states and error handling

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **Google Gemini AI** - Large language model for document Q&A
- **PyPDF2** - PDF text extraction
- **python-docx** - Word document processing
- **pandas & openpyxl** - Excel file handling
- **Pillow & pytesseract** - Image processing and OCR
- **python-multipart** - File upload handling

### Frontend
- **React 19** - Frontend framework
- **Axios** - HTTP client for API communication
- **CSS3** - Custom styling with responsive design

## 📋 Prerequisites

Before running this application, ensure you have:

1. **Python 3.8+** installed
2. **Node.js 16+** and npm installed
3. **Google Gemini API Key** - Get it from [Google AI Studio](https://aistudio.google.com/app/apikey)
4. **Tesseract OCR** installed on your system:
   - **Windows**: Download from [UB-Mannheim](https://github.com/UB-Mannheim/tesseract/wiki)
   - **macOS**: `brew install tesseract`
   - **Linux**: `sudo apt-get install tesseract-ocr`

## 🚀 Setup and Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Kaustub26Pvgda/pdf-chatbot.git
cd pdf-chatbot
```

### 2. Backend Setup

#### Install Python Dependencies
```bash
cd backend
pip install fastapi uvicorn python-multipart python-docx pandas openpyxl pillow pytesseract PyPDF2 google-generativeai python-dotenv
```

**Note**: The current `requirements.txt` is incomplete. The full list of required packages is:
- fastapi
- uvicorn
- python-multipart
- python-docx
- pandas
- openpyxl
- pillow
- pytesseract
- PyPDF2
- google-generativeai
- python-dotenv

#### Environment Configuration
Create a `.env` file in the `backend` directory:
```bash
# backend/.env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 3. Frontend Setup
```bash
cd ui/chatbot-frontend
npm install
```

**Note**: Axios is missing from the frontend package.json but is used in the code. Install it:
```bash
npm install axios
```

## 🏃‍♂️ Running the Application

### Start the Backend Server
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
The API will be available at `http://localhost:8000`

### Start the Frontend Development Server
```bash
cd ui/chatbot-frontend
npm start
```
The application will open at `http://localhost:3000`

## 📖 Usage

1. **Upload a Document**: 
   - Navigate to the application in your browser
   - Drag and drop or click to select a file (PDF, DOCX, XLSX, or image)
   - Supported formats: `.pdf`, `.docx`, `.xlsx`, `.xls`, `.png`, `.jpg`, `.jpeg`

2. **Start Chatting**:
   - Once uploaded, the chat interface will appear
   - Ask questions about the document content
   - The AI will analyze the document and provide relevant answers

3. **Upload New Document**:
   - Click "Upload New PDF" to start a new session with a different document

## 🔧 API Endpoints

### POST `/upload`
Upload a document and get a session ID
- **Body**: `multipart/form-data` with file
- **Response**: `{"session_id": "uuid"}`

### POST `/chat`
Send a question about the uploaded document
- **Body**: `multipart/form-data` with `session_id` and `question`
- **Response**: `{"response": "AI answer"}`

## 🌟 Special Features

- **Session-based Architecture**: Each uploaded document creates a unique session
- **Multi-format Processing**: Handles text extraction from various file formats
- **OCR Integration**: Can extract text from images using Tesseract
- **Error Handling**: Comprehensive error handling for file processing and API calls
- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Visual feedback during file upload and message processing

## 🔍 Troubleshooting

### Common Issues

1. **Tesseract not found**: Ensure Tesseract OCR is installed and in your system PATH
2. **Gemini API errors**: Verify your API key is correct and has sufficient quota
3. **File upload fails**: Check file format is supported and file size is reasonable
4. **CORS errors**: Ensure backend is running on port 8000 and frontend on port 3000

### Missing Dependencies
If you encounter import errors, install the missing packages:
```bash
# Backend
pip install google-generativeai python-dotenv pandas openpyxl pillow pytesseract PyPDF2

# Frontend  
npm install axios
```

## 📁 Project Structure
```
pdf-chatbot/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── file_utils.py        # Document processing utilities
│   ├── requirements.txt     # Python dependencies (incomplete)
│   └── .env                 # Environment variables
├── ui/chatbot-frontend/
│   ├── src/
│   │   ├── App.js           # Main React component
│   │   ├── App.css          # Styling
│   │   └── components/
│   │       ├── ChatBox.js   # Chat interface
│   │       └── FileUpload.js # File upload component
│   └── package.json         # Node.js dependencies
└── README.md
```

## 🤝 Contributing

Feel free to open issues and pull requests for any improvements.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).