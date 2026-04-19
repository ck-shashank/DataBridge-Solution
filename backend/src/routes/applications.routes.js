import express from 'express'
import { getAllApplications, getApplicationById, createApplication, updateApplicationStatus } from '../controllers/applications.controller.js'
import { authenticateToken } from '../middleware/auth.middleware.js'

const router = express.Router()

/**
 * Applications Routes
 * GET /api/applications - Get all applications (admin only)
 * GET /api/applications/:id - Get application by ID (admin only)
 * POST /api/applications - Submit application (public)
 * PATCH /api/applications/:id/status - Update status (admin only)
 */

router.get('/', authenticateToken, getAllApplications)
router.get('/:id', authenticateToken, getApplicationById)
router.post('/', createApplication)
router.patch('/:id/status', authenticateToken, updateApplicationStatus)

export default router
