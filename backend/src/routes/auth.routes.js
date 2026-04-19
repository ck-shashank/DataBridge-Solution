import express from 'express'
import { login, getCurrentUser, getDashboardStats } from '../controllers/auth.controller.js'
import { authenticateToken } from '../middleware/auth.middleware.js'

const router = express.Router()

/**
 * Auth Routes
 * POST /api/auth/login - Admin login
 * GET /api/auth/me - Get current user info (protected)
 * GET /api/admin/stats - Get dashboard stats (protected)
 */

router.post('/login', login)
router.get('/me', authenticateToken, getCurrentUser)

export default router

// Dashboard stats route (exported separately)
export const adminRouter = express.Router()
adminRouter.get('/stats', authenticateToken, getDashboardStats)
