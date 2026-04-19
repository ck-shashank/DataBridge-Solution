/**
 * DataBridge Solutions - API Service Layer
 * Centralized API calls for backend communication
 */




const API_BASE_URL = import.meta.env.VITE_API_URL

if (!API_BASE_URL) {
  throw new Error('VITE_API_URL is not defined')
}


/**
 * Generic fetch wrapper with error handling
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise} Response data
 */
async function fetchAPI(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    }

    // Add auth token if available
    const token = localStorage.getItem('adminToken')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    try {
        const response = await fetch(url, config)

        // Handle non-JSON responses
        const contentType = response.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            return response
        }

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || `HTTP error! status: ${response.status}`)
        }

        return data
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error)
        throw error
    }
}

// ========================
// Jobs API
// ========================

/**
 * Get all job listings
 * @returns {Promise<Array>} List of jobs
 */
export async function getJobs() {
    return fetchAPI('/jobs')
}

/**
 * Get a single job by ID
 * @param {number} id - Job ID
 * @returns {Promise<Object>} Job data
 */
export async function getJob(id) {
    return fetchAPI(`/jobs/${id}`)
}

/**
 * Create a new job (admin only)
 * @param {Object} jobData - Job details
 * @returns {Promise<Object>} Created job
 */
export async function createJob(jobData) {
    return fetchAPI('/jobs', {
        method: 'POST',
        body: JSON.stringify(jobData),
    })
}

/**
 * Update a job (admin only)
 * @param {number} id - Job ID
 * @param {Object} jobData - Updated job details
 * @returns {Promise<Object>} Updated job
 */
export async function updateJob(id, jobData) {
    return fetchAPI(`/jobs/${id}`, {
        method: 'PUT',
        body: JSON.stringify(jobData),
    })
}

/**
 * Delete a job (admin only)
 * @param {number} id - Job ID
 * @returns {Promise<void>}
 */
export async function deleteJob(id) {
    return fetchAPI(`/jobs/${id}`, {
        method: 'DELETE',
    })
}

// ========================
// Job Applications API
// ========================

/**
 * Submit a job application
 * @param {Object} applicationData - Application details
 * @returns {Promise<Object>} Created application
 */
export async function submitApplication(applicationData) {
    return fetchAPI('/applications', {
        method: 'POST',
        body: JSON.stringify(applicationData),
    })
}

/**
 * Get all applications (admin only)
 * @returns {Promise<Array>} List of applications
 */
export async function getApplications() {
    return fetchAPI('/applications')
}

/**
 * Update application status (admin only)
 * @param {number} id - Application ID
 * @param {string} status - New status
 * @returns {Promise<Object>} Updated application
 */
export async function updateApplicationStatus(id, status) {
    return fetchAPI(`/applications/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
    })
}

// ========================
// Contact API
// ========================

/**
 * Submit a contact query
 * @param {Object} contactData - Contact form data
 * @returns {Promise<Object>} Created contact query
 */
export async function submitContactQuery(contactData) {
    return fetchAPI('/contact', {
        method: 'POST',
        body: JSON.stringify(contactData),
    })
}

/**
 * Get all contact queries (admin only)
 * @returns {Promise<Array>} List of contact queries
 */
export async function getContactQueries() {
    return fetchAPI('/contact')
}

/**
 * Update contact query status (admin only)
 * @param {number} id - Query ID
 * @param {string} status - New status
 * @returns {Promise<Object>} Updated query
 */
export async function updateContactStatus(id, status) {
    return fetchAPI(`/contact/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
    })
}

// ========================
// Auth API
// ========================

/**
 * Admin login
 * @param {Object} credentials - { username, password }
 * @returns {Promise<Object>} { token, user }
 */
export async function adminLogin(credentials) {
    const response = await fetchAPI('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    })

    // Store token on successful login
    if (response.token) {
        localStorage.setItem('adminToken', response.token)
    }

    return response
}

/**
 * Admin logout
 */
export function adminLogout() {
    localStorage.removeItem('adminToken')
}

/**
 * Check if admin is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
    return !!localStorage.getItem('adminToken')
}

/**
 * Get current admin user info
 * @returns {Promise<Object>} User data
 */
export async function getCurrentAdmin() {
    return fetchAPI('/auth/me')
}

// ========================
// Dashboard Stats API
// ========================

/**
 * Get dashboard statistics (admin only)
 * @returns {Promise<Object>} Dashboard stats
 */
export async function getDashboardStats() {
    return fetchAPI('/admin/stats')
}
