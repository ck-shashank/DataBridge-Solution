# DataBridge Solutions - Full-Stack Application

A professional, production-ready web application built with **React**, **Node.js**, **Express**, and **PostgreSQL**. This project features a stunning modern UI, comprehensive admin dashboard, and automated database orchestration.

## ✨ Key Enhancements

*   **Zero-Touch Database Automation**: The application automatically initializes the database schema and sample data on a fresh Neon PostgreSQL instance. It handles compute-wake-up delays (wait-retries) automatically.
*   **Production Optimized**: Fully configured for Vercel deployment with automated CORS handling for both production and localhost (any port).
*   **Modern Glassmorphism Design**: High-end UI with theme persistence, Framer Motion animations, and responsive layouts.
*   **Admin Dashboard**: Secure JWT-based admin panel for managing job listings, applications, and contact queries.

## 🏗️ Project Structure

```text
databridge-solutions/
├── frontend/                 # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── api/             # API service layer with auto-base-URL
│   │   ├── components/      # UI Components (Modals, Hero, Chat)
│   │   ├── pages/           # Page components (Admin, Careers, etc.)
│   │   └── context/         # Global state (Theme)
│   └── vercel.json          # Deployment config for Vite
│
└── backend/                  # Node.js + Express + PostgreSQL
    ├── src/
    │   ├── config/          # DB config with Auto-Init Logic
    │   ├── routes/          # API route definitions
    │   └── server.js        # Server entry with Sync-Middleware
    ├── database.sql         # SQL Schema & Sample Data
    └── vercel.json          # Serverless architecture config
```

## 🚀 Quick Start

### 1. Prerequisites
- Node.js v18+ 
- Neon PostgreSQL (or local Postgres)
- npm

### 2. Backend Setup
```bash
cd backend
npm install
# Copy .env.example to .env and add your DATABASE_URL
npm run dev
```
*The backend will automatically create tables and sample jobs on your first run!*

### 3. Frontend Setup
```bash
cd frontend
npm install
# Ensure .env has VITE_API_URL=http://localhost:3001/api
npm run dev
```

## 🔌 API Endpoints (Core)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check System & DB Status |
| GET | `/api/jobs` | List all available jobs |
| POST | `/api/auth/login` | Admin Authentication |
| GET | `/api/admin/stats` | Dashboard statistics (Protected) |

## 🎨 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, PostgreSQL (`pg`)
- **Infrastructure**: Vercel (Hosting), Neon (Database), Resend (Email)

## 📄 License
MIT License - Free to use.
