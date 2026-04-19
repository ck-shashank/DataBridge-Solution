# DataBridge Solutions - Full-Stack Web Application

A professional, production-ready web application with React frontend and Node.js/Express backend with PostgreSQL database.

## 🏗️ Project Structure

```
DatabridgeSolutions Final/
├── frontend/                 # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── api/             # API service layer
│   │   ├── context/         # React context (theme)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── backend/                  # Node.js + Express + PostgreSQL
    ├── src/
    │   ├── config/          # Database config
    │   ├── controllers/     # Route controllers
    │   ├── routes/          # API routes
    │   ├── middleware/      # Auth middleware
    │   └── server.js
    ├── database.sql         # PostgreSQL schema
    ├── .env
    └── package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js v18+ 
- PostgreSQL 14+
- npm or yarn

### 1. Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE databridge;
```

2. Run the schema file:
```bash
cd backend
psql -U postgres -d databridge -f database.sql
```

Or connect to your database and run the SQL manually.

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit .env file with your database credentials:
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=databridge
# DB_USER=postgres
# DB_PASSWORD=your_password
# JWT_SECRET=your_secret_key
# PORT=3001

# Start development server
npm run dev
```

Backend runs on: http://localhost:3001

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: http://localhost:5173

## 🔐 Admin Login

Default admin credentials (created by database.sql):
- **Username:** admin
- **Password:** admin123

⚠️ **IMPORTANT:** Change the admin password in production!

To create a new admin user, generate a bcrypt hash and insert:
```sql
INSERT INTO admin_users (username, email, password_hash) 
VALUES ('newadmin', 'admin@example.com', '$2a$10$YOUR_HASH_HERE');
```

## 🔌 API Endpoints

### Public Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | List all jobs |
| GET | `/api/jobs/:id` | Get job details |
| POST | `/api/applications` | Submit job application |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/auth/login` | Admin login |

### Protected Endpoints (require JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/jobs` | Create job |
| PUT | `/api/jobs/:id` | Update job |
| DELETE | `/api/jobs/:id` | Delete job |
| GET | `/api/applications` | List applications |
| PATCH | `/api/applications/:id/status` | Update status |
| GET | `/api/contact` | List contact queries |
| PATCH | `/api/contact/:id/status` | Update status |
| GET | `/api/admin/stats` | Dashboard stats |

## 🎨 Features

### Frontend
- ✅ Responsive design (mobile-first)
- ✅ Dark/Light mode toggle
- ✅ Framer Motion animations
- ✅ Auto-playing hero carousel
- ✅ Chatbot widget
- ✅ Callback request modal
- ✅ Admin panel with CRUD operations

### Backend
- ✅ RESTful API
- ✅ JWT authentication
- ✅ PostgreSQL integration
- ✅ Input validation
- ✅ CORS configured
- ✅ Error handling

## 📱 Pages

1. **Home** - Hero carousel, services preview, stats, CTA
2. **Services** - Detailed service cards with process section
3. **Industries** - Grid of industries served
4. **Careers** - Job listings from database, apply form
5. **Contact** - Contact form with database storage
6. **About** - Company info, team, values
7. **Admin** - Login, dashboard, jobs CRUD, manage applications

## 🛠️ Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| React 18 | Node.js | PostgreSQL |
| Vite 5 | Express 4 | pg driver |
| Tailwind CSS 3 | JWT | bcryptjs |
| Framer Motion | CORS | |
| React Router 6 | dotenv | |

## 📄 License

MIT License - Free for personal and commercial use.
