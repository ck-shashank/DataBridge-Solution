import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

/* ======================================================
   ✅ CORS — MUST BE FIRST
====================================================== */
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://databridge-solutions.vercel.app',
    process.env.FRONTEND_URL
  ].filter(Boolean),
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
  console.log(`${new Date().toISOString()} | ${req.method} ${req.path}`)
  next()
})

/* ======================================================
   📦 ROUTES
====================================================== */
import jobsRoutes from './routes/jobs.routes.js'
import applicationsRoutes from './routes/applications.routes.js'
import contactRoutes from './routes/contact.routes.js'
import authRoutes, { adminRouter } from './routes/auth.routes.js'

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
    environment: process.env.NODE_ENV,
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
  res.status(500).json({ message: 'Internal server error' })
})

/* ======================================================
   🚀 START SERVER
====================================================== */
app.listen(PORT, () => {
  console.log(`
========================================
 DataBridge Solutions API 🚀
----------------------------------------
 Status : RUNNING
 Port   : ${PORT}
 Env    : ${process.env.NODE_ENV}
========================================
`)
})

export default app
