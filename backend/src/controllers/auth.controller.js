import bcrypt from 'bcryptjs'
import { query } from '../config/db.js'
import { generateToken } from '../middleware/auth.middleware.js'

/**
 * Auth Controller
 * Handles admin authentication
 */

// Admin login
export async function login(req, res) {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password required' })
        }

        // Find admin user
        const result = await query(
            'SELECT * FROM admin_users WHERE username = $1',
            [username]
        )

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const user = result.rows[0]

        // Verify password
        const isValid = await bcrypt.compare(password, user.password_hash)
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        // Generate JWT token
        const token = generateToken({
            id: user.id,
            username: user.username,
            role: 'admin'
        })

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({ message: 'Error during login' })
    }
}

// Get current admin user info
export async function getCurrentUser(req, res) {
    try {
        const result = await query(
            'SELECT id, username, email, created_at FROM admin_users WHERE id = $1',
            [req.user.id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.json(result.rows[0])
    } catch (error) {
        console.error('Error fetching user:', error)
        res.status(500).json({ message: 'Error fetching user info' })
    }
}

// Get dashboard stats
export async function getDashboardStats(req, res) {
    try {
        const [jobs, applications, contacts] = await Promise.all([
            query('SELECT COUNT(*) as count FROM jobs'),
            query('SELECT COUNT(*) as count FROM job_applications'),
            query('SELECT COUNT(*) as count FROM contact_queries')
        ])

        res.json({
            totalJobs: parseInt(jobs.rows[0].count),
            totalApplications: parseInt(applications.rows[0].count),
            totalContacts: parseInt(contacts.rows[0].count)
        })
    } catch (error) {
        console.error('Error fetching stats:', error)
        res.status(500).json({ message: 'Error fetching dashboard stats' })
    }
}
