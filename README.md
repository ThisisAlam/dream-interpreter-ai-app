# DreamCatcher 🌙

DreamCatcher is a full-stack AI-powered dream interpretation application built with **React, TypeScript, Express, OpenAI, and SQLite**.

Users can record a dream, send it to an AI-powered interpretation service, and save the dream together with its interpretation in a persistent dream journal.

## ✨ Features

* Record dreams through a clean and responsive interface
* Generate AI-powered dream interpretations using the OpenAI API
* Store dreams and interpretations in a local SQLite database
* View previously recorded dreams in a personal dream journal
* Expand and collapse long interpretations
* Delete individual dreams
* Persistent storage across server restarts
* Loading and error handling
* Responsive design for desktop and mobile devices
* Secure backend OpenAI API integration

## 🧠 How Dream Interpretation Works

DreamCatcher sends the user's dream to the backend, where the OpenAI API generates a thoughtful interpretation.

The AI is instructed to:

* Treat interpretations as possibilities rather than facts
* Avoid claiming that dreams predict the future
* Avoid medical or psychological diagnoses
* Consider symbols, emotions, relationships, memories, and personal experiences
* Provide a structured and understandable interpretation

The generated response includes:

* **Possible Meaning**
* **Key Symbols**
* **Emotional Theme**
* **Reflection Question**

## 🏗️ Architecture

```text
User
 │
 ▼
React + TypeScript Frontend
 │
 │ HTTP Requests
 ▼
Express + TypeScript Backend
 │
 ├──────────────► OpenAI API
 │                   │
 │                   ▼
 │              Dream Interpretation
 │
 ▼
SQLite Database
 │
 ▼
Persistent Dream Journal
```

The application follows a simple layered architecture:

```text
Presentation Layer
React + TypeScript

        ↓

API Layer
Express

        ↓

AI Service Layer
OpenAI Responses API

        ↓

Data Layer
SQLite
```

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* CSS

### Backend

* Node.js
* Express
* TypeScript
* OpenAI Node SDK

### Database

* SQLite
* better-sqlite3

## 📁 Project Structure

```text
dream-interpreter-ai-app/
│
├── src/
│   ├── assets/
│   │   └── dream-logo.png
│   │
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── DreamForm.tsx
│   │   ├── DreamJournal.tsx
│   │   ├── DreamCard.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── Footer.tsx
│   │
│   ├── types/
│   │   └── dream.ts
│   │
│   ├── utils/
│   │   └── formatDate.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── server/
│   ├── src/
│   │   ├── db/
│   │   │   └── database.ts
│   │   │
│   │   ├── routes/
│   │   │   └── dreams.ts
│   │   │
│   │   ├── services/
│   │   │   └── openai.ts
│   │   │
│   │   ├── types/
│   │   │   └── dream.ts
│   │   │
│   │   └── server.ts
│   │
│   └── .env
│
├── vite.config.ts
├── package.json
└── README.md
```

## 🔄 Application Flow

When a user submits a dream:

```text
DreamForm
   ↓
App.tsx
   ↓
POST /api/dreams
   ↓
Express Router
   ↓
OpenAI Service
   ↓
AI Interpretation
   ↓
SQLite Database
   ↓
JSON Response
   ↓
Dream Journal
```

The frontend then retrieves the saved dreams using:

```text
GET /api/dreams
```

Individual dreams can be deleted using:

```text
DELETE /api/dreams/:id
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd dream-interpreter-ai-app
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd server
npm install
```

### 4. Configure environment variables

Create:

```text
server/.env
```

Add:

```env
OPENAI_API_KEY=your_openai_api_key
OPENAI_AI_MODEL=your_model_name
```

If you use a custom OpenAI-compatible endpoint, you can also add:

```env
OPENAI_BASE_URL=your_base_url
```

Never commit your real `.env` file to GitHub.

## ▶️ Running the Application

Run the backend in one terminal:

```bash
cd server
npm run dev
```

The backend runs on:

```text
http://localhost:3000
```

Run the frontend in another terminal:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

Vite proxies `/api` requests from the frontend to the Express backend.

## 🔐 Environment Variables

Recommended `.env.example`:

```env
OPENAI_API_KEY=
OPENAI_AI_MODEL=
OPENAI_BASE_URL=
```

The OpenAI API key is used only by the backend and is never exposed to the React frontend.

## 💾 Database

DreamCatcher uses SQLite for persistent local storage.

The database stores:

```text
dreams
├── id
├── dream_text
├── interpretation
└── created_at
```

The SQLite database is created automatically when the backend starts.

Local database files should remain excluded from Git.

## 🔒 Security

The project keeps sensitive API credentials on the backend.

Important security practices include:

* OpenAI API keys are stored in environment variables
* Secrets are never exposed to React
* User-generated content is rendered using React rather than raw HTML
* SQL statements use parameterized values
* Environment and database files are excluded through `.gitignore`

## 📱 Responsive Design

DreamCatcher includes responsive styling for:

* Desktop
* Tablet
* Mobile

The interface includes an animated gradient background, dream cards, loading states, error messages, and expandable AI interpretations.

## 📌 Current API Endpoints

| Method   | Endpoint          | Description                  |
| -------- | ----------------- | ---------------------------- |
| `GET`    | `/api/dreams`     | Retrieve all dreams          |
| `POST`   | `/api/dreams`     | Create and interpret a dream |
| `DELETE` | `/api/dreams/:id` | Delete a dream               |

## 🌱 Possible Future Improvements

Potential future improvements include:

* User authentication
* Private user-specific journals
* Search and filtering
* Dream tags and categories
* Mood tracking
* Dream statistics
* Cloud database storage
* Export dream journal
* Dark mode
* Authentication-based API protection
* Rate limiting
* Deployment

## 📚 What I Practiced

This project helped me practice:

* Building React applications with TypeScript
* Breaking large components into reusable components
* React state and event handling
* Fetching data from a backend API
* Creating REST API endpoints with Express
* Integrating the OpenAI API
* Prompt engineering
* Environment variable management
* SQLite persistence
* TypeScript across frontend and backend
* Separating routes, services, types, and database logic
* Full-stack application architecture

## ⚠️ Disclaimer

DreamCatcher provides AI-generated symbolic and reflective interpretations for entertainment and personal reflection.

Dream interpretations should not be considered medical, psychological, spiritual, or professional advice.

## 📄 License

This project is intended for learning, portfolio, and development purposes.
