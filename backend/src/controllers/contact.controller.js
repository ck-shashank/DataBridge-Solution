import { query } from '../config/db.js'

/**
 * Contact Controller
 * Handles contact form submissions
 */

// Get all contact queries (admin only)
export async function getAllContacts(req, res) {
    try {
        const result = await query('SELECT * FROM contact_queries ORDER BY created_at DESC')
        res.json(result.rows)
    } catch (error) {
        console.error('Error fetching contacts:', error)
        res.status(500).json({ message: 'Error fetching contact queries' })
    }
}

// Get contact by ID
export async function getContactById(req, res) {
    try {
        const { id } = req.params
        const result = await query('SELECT * FROM contact_queries WHERE id = $1', [id])

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Contact query not found' })
        }

        res.json(result.rows[0])
    } catch (error) {
        console.error('Error fetching contact:', error)
        res.status(500).json({ message: 'Error fetching contact query' })
    }
}

// Submit new contact query (public)
export async function createContact(req, res) {
    try {
        const { name, email, phone, subject, message } = req.body

        // Validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: 'Missing required fields' })
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' })
        }

        const result = await query(
            `INSERT INTO contact_queries (name, email, phone, subject, message, status)
       VALUES ($1, $2, $3, $4, $5, 'new')
       RETURNING *`,
            [name, email, phone || null, subject, message]
        )

        res.status(201).json({ message: 'Message sent successfully', contact: result.rows[0] })
    } catch (error) {
        console.error('Error creating contact:', error)
        res.status(500).json({ message: 'Error submitting message' })
    }
}

// Update contact status (admin only)
export async function updateContactStatus(req, res) {
    try {
        const { id } = req.params
        const { status } = req.body

        const validStatuses = ['new', 'in_progress', 'resolved']
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' })
        }

        const result = await query(
            'UPDATE contact_queries SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Contact query not found' })
        }

        res.json(result.rows[0])
    } catch (error) {
        console.error('Error updating contact status:', error)
        res.status(500).json({ message: 'Error updating contact status' })
    }
}
