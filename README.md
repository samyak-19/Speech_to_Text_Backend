# 🎤 Speech-to-Text Backend API

A scalable backend service that converts audio to text using AI and stores transcriptions securely for authenticated users.

---

## 🚀 Overview

This backend is built using the MERN stack and integrates a Speech-to-Text API to process audio files. It supports user authentication, file uploads, and transcription history management.

---

## ✨ Features

* 🎤 Audio file upload (MP3, WAV, WEBM)
* 🤖 AI-powered speech-to-text conversion
* 🔐 User authentication (JWT)
* 🗂️ User-specific transcription storage
* ⚡ RESTful API design
* 🛡️ Error handling & validation
* ☁️ Supports both Local MongoDB & MongoDB Atlas

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB + Mongoose**
* **Deepgram API**
* **JWT Authentication**
* **bcrypt.js**
* **Multer**
* **dotenv**

---

## 🧠 System Architecture

```id="arch001"
Frontend (React)
        ↓
Backend (Node.js + Express)
        ↓
Speech-to-Text API (Deepgram)
        ↓
MongoDB (Local / Atlas)
```

---

## 📁 Project Structure

```id="struct001"
server/
│
├── config/
│   └── db.js
│
├── models/
│   ├── User.js
│   └── Transcription.js
│
├── routes/
│   ├── auth.js
│   └── upload.js
│
├── services/
│   └── deepgramService.js
│
├── middleware/
│   └── auth.js
│
├── uploads/
├── server.js
├── .env
└── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```id="clone001"
git clone https://github.com/samyak-19/Speech_to_Text_Backend.git
cd speech-to-text-backend
```

---

### 2️⃣ Install dependencies

```id="install001"
npm install
```

---

### 3️⃣ Configure Environment Variables

Create a `.env` file:

```id="env001"
PORT=5000

DB_TYPE=atlas

MONGO_LOCAL=mongodb://localhost:27017/speechDB
MONGO_ATLAS=your_mongodb_atlas_url

DEEPGRAM_API_KEY=your_deepgram_api_key

JWT_SECRET=your_secret_key
```

---

### 🔑 Environment Variables Explained

| Variable         | Description                   |
| ---------------- | ----------------------------- |
| PORT             | Server port                   |
| DB_TYPE          | `local` or `atlas`            |
| MONGO_LOCAL      | Local MongoDB URL             |
| MONGO_ATLAS      | Cloud MongoDB URL             |
| DEEPGRAM_API_KEY | API key for transcription     |
| JWT_SECRET       | Secret key for authentication |

---

### 4️⃣ Run the server

```id="run001"
npm run dev
```

Server runs on:

```id="url001"
http://localhost:5000
```

---

## 📡 API Endpoints

### 🔐 Authentication

#### Signup

```id="signup001"
POST /api/auth/signup
```

#### Login

```id="login001"
POST /api/auth/login
```

---

### 🎤 Upload Audio

```id="upload001"
POST /api/upload-audio
```

Headers:

```id="headers001"
Authorization: <JWT_TOKEN>
```

Body:

```id="body001"
form-data:
audio: file
```

---

### 📄 Get Transcriptions

```id="history001"
GET /api/transcriptions
```

Headers:

```id="headers002"
Authorization: <JWT_TOKEN>
```

---

## 📦 Sample API Responses

### ✅ Success

```json id="success001"
{
  "success": true,
  "transcription": "Hello everyone, welcome to the speech-to-text app"
}
```

---

### ❌ Error

```json id="error001"
{
  "success": false,
  "message": "Only audio files are allowed"
}
```

---

## 🔐 Authentication Flow

1. User logs in → receives JWT token
2. Token stored in frontend
3. Token sent in API headers
4. Backend verifies token
5. Access granted to protected routes

---

## ⚠️ Validation Rules

* Only audio files allowed
* Maximum file size: 5MB
* Invalid inputs return proper error messages

---

## 🔐 Security Practices

* Passwords hashed using bcrypt
* JWT-based authentication
* Protected API routes
* Environment variables secured
* File validation implemented

---

## ⚠️ Known Limitations

* Large files (>10MB) not supported
* No real-time streaming
* Files stored locally (not cloud)
* No audio playback feature

---

## 🚀 Deployment

Backend can be deployed on:

* Render
* Railway
* Vercel

⚠️ Use MongoDB Atlas for production

---

## 🧪 Testing

Use tools like Postman:

* Test authentication routes
* Upload audio files
* Verify transcription output
* Check database records

---

## 🚀 Future Scope

* Real-time transcription (WebSockets)
* Cloud storage (AWS S3)
* Multi-language support
* Advanced search & filters
* Analytics dashboard

---

## 💡 Why This Project?

This project demonstrates:

* Full-stack development skills
* Integration of AI APIs
* Secure authentication systems
* Scalable backend architecture

---

## 👨‍💻 Author

Developed as part of an internship project.

---

## ⭐ Final Notes

This project is designed to simulate a real-world SaaS backend with authentication, AI integration, and scalable architecture.