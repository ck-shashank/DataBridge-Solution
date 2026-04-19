import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

/* ======================================================
   ✅ CORS — MUST BE FIRST
====================================================== */
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://databridge-solutions.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean)

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

/* ======================================================
   ✅ BODY PARSERS — MUST BE BEFORE ROUTES
====================================================== */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* ======================================================
   🔍 Request Logger (optional but useful)
====================================================== */
app.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`${new Date().toISOString()} | ${req.method} ${req.path}`)
  }
  next()
})

/* ======================================================
   📦 ROUTES
====================================================== */
import jobsRoutes from './routes/jobs.routes.js'
import applicationsRoutes from './routes/applications.routes.js'
import contactRoutes from './routes/contact.routes.js'
import authRoutes, { adminRouter } from './routes/auth.routes.js'
import { initializeDatabase, getInitStatus, getInitPromise } from './config/db.js'

// Middleware to ensure database is ready before handling requests
app.use(async (req, res, next) => {
  // Always allow health check to proceed immediately
  if (req.path === '/api/health') return next();

  try {
    const promise = getInitPromise();
    if (promise) await promise;
    next();
  } catch (err) {
    res.status(503).json({ message: 'Database initialization in progress or failed', retryAfter: 10 });
  }
})

app.use('/api/jobs', jobsRoutes)
app.use('/api/applications', applicationsRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRouter)

/* ======================================================
   ❤️ Health Check
====================================================== */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'production',
    db_init: getInitStatus(),
    time: new Date().toISOString()
  })
})

/* ======================================================
   ❌ 404 Handler
====================================================== */
app.use((req, res) => {
  res.status(404).json({ message: 'API endpoint not found' })
})

/* ======================================================
   💥 Global Error Handler
====================================================== */
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err)
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

/* ======================================================
   🚀 START SERVER
====================================================== */
const startServer = async () => {
  try {
    // Attempt to initialize database before accepting traffic
    // We don't await this if we want fast cold starts on Vercel, 
    // but here we do to ensure the DB is ready for the first user.
    if (process.env.NODE_ENV !== 'test') {
      await initializeDatabase().catch(err => {
        console.error('Failed to initialize database on startup:', err.message);
      });
    }

    if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
      app.listen(PORT, () => {
        console.log(`
========================================
 DataBridge Solutions API 🚀
----------------------------------------
 Status : RUNNING
 Port   : ${PORT}
 Env    : ${process.env.NODE_ENV || 'production'}
========================================
`)
      })
    }
  } catch (err) {
    console.error('CRITICAL: Server failed to start:', err);
  }
}

startServer();

export default app
