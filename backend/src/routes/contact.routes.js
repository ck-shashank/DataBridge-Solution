import express from 'express'
import { getAllContacts, getContactById, createContact, updateContactStatus } from '../controllers/contact.controller.js'
import { authenticateToken } from '../middleware/auth.middleware.js'

const router = express.Router()

/**
 * Contact Routes
 * GET /api/contact - Get all contacts (admin only)
 * GET /api/contact/:id - Get contact by ID (admin only)
 * POST /api/contact - Submit contact form (public)
 * PATCH /api/contact/:id/status - Update status (admin only)
 */

router.get('/', authenticateToken, getAllContacts)
router.get('/:id', authenticateToken, getContactById)
router.post('/', createContact)
router.patch('/:id/status', authenticateToken, updateContactStatus)

export default router
