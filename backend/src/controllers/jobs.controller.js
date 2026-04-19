import { query } from '../config/db.js'

/**
 * Jobs Controller
 * Handles CRUD operations for job listings
 */

// Get all jobs
export async function getAllJobs(req, res) {
    try {
        const result = await query(
            'SELECT * FROM jobs ORDER BY created_at DESC'
        )
        res.json(result.rows)
    } catch (error) {
        console.error('Error fetching jobs:', error)
        res.status(500).json({ message: 'Error fetching jobs' })
    }
}

// Get job by ID
export async function getJobById(req, res) {
    try {
        const { id } = req.params
        const result = await query('SELECT * FROM jobs WHERE id = $1', [id])

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Job not found' })
        }

        res.json(result.rows[0])
    } catch (error) {
        console.error('Error fetching job:', error)
        res.status(500).json({ message: 'Error fetching job' })
    }
}

// Create new job (admin only)
export async function createJob(req, res) {
    try {
        const { title, department, location, type, description, requirements } = req.body

        // Validation
        if (!title || !department || !location || !description) {
            return res.status(400).json({ message: 'Missing required fields' })
        }

        const result = await query(
            `INSERT INTO jobs (title, department, location, type, description, requirements)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
            [title, department, location, type || 'Full-time', description, requirements]
        )

        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error('Error creating job:', error)
        res.status(500).json({ message: 'Error creating job' })
    }
}

// Update job (admin only)
export async function updateJob(req, res) {
    try {
        const { id } = req.params
        const { title, department, location, type, description, requirements } = req.body

        const result = await query(
            `UPDATE jobs 
       SET title = $1, department = $2, location = $3, type = $4, description = $5, requirements = $6
       WHERE id = $7
       RETURNING *`,
            [title, department, location, type, description, requirements, id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Job not found' })
        }

        res.json(result.rows[0])
    } catch (error) {
        console.error('Error updating job:', error)
        res.status(500).json({ message: 'Error updating job' })
    }
}

// Delete job (admin only)
export async function deleteJob(req, res) {
    try {
        const { id } = req.params
        const result = await query('DELETE FROM jobs WHERE id = $1 RETURNING id', [id])

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Job not found' })
        }

        res.json({ message: 'Job deleted successfully' })
    } catch (error) {
        console.error('Error deleting job:', error)
        res.status(500).json({ message: 'Error deleting job' })
    }
}
