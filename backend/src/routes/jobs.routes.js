import express from 'express'
import { getAllJobs, getJobById, createJob, updateJob, deleteJob } from '../controllers/jobs.controller.js'
import { authenticateToken } from '../middleware/auth.middleware.js'

const router = express.Router()

/**
 * Jobs Routes
 * GET /api/jobs - Get all jobs (public)
 * GET /api/jobs/:id - Get job by ID (public)
 * POST /api/jobs - Create job (admin only)
 * PUT /api/jobs/:id - Update job (admin only)
 * DELETE /api/jobs/:id - Delete job (admin only)
 */

router.get('/', getAllJobs)
router.get('/:id', getJobById)
router.post('/', authenticateToken, createJob)
router.put('/:id', authenticateToken, updateJob)
router.delete('/:id', authenticateToken, deleteJob)

export default router
