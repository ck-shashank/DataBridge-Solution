import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext.jsx'
import { adminLogin, adminLogout, isAuthenticated, getJobs, createJob, updateJob, deleteJob, getApplications, getContactQueries, updateApplicationStatus, updateContactStatus } from '../api/api.js'
import Logo from '../components/Logo.jsx'

/**
 * Admin Panel Component
 * JWT-based login, dashboard, jobs CRUD, applications and contact queries view
 */
function Admin() {
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated())

    if (!isLoggedIn) {
        return <LoginForm onLogin={() => setIsLoggedIn(true)} />
    }

    return <AdminDashboard onLogout={() => setIsLoggedIn(false)} />
}

// Login Form
function LoginForm({ onLogin }) {
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            await adminLogin(credentials)
            onLogin()
        } catch (err) {
            setError('Invalid credentials')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 p-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md glass-card p-8 bg-white dark:bg-slate-900">
                <div className="text-center mb-8">
                    <Logo className="w-12 h-12 mx-auto" showText={false} />
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-4">Admin Login</h1>
                </div>
                {error && <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div><label className="form-label">Username</label><input type="text" value={credentials.username} onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} required className="form-input" /></div>
                    <div><label className="form-label">Password</label><input type="password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} required className="form-input" /></div>
                    <button type="submit" disabled={loading} className="w-full btn-primary py-3">{loading ? 'Logging in...' : 'Login'}</button>
                </form>
            </motion.div>
        </div>
    )
}

// Admin Dashboard
function AdminDashboard({ onLogout }) {
    const { isDark, toggleTheme } = useTheme()
    const navigate = useNavigate()
    const location = useLocation()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const handleLogout = () => {
        adminLogout()
        onLogout()
    }

    const navItems = [
        { path: '/admin', label: 'Dashboard', icon: '📊' },
        { path: '/admin/jobs', label: 'Jobs', icon: '💼' },
        { path: '/admin/applications', label: 'Applications', icon: '📝' },
        { path: '/admin/contacts', label: 'Contact Queries', icon: '📧' },
    ]

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-slate-950">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform`}>
                <div className="p-6 border-b border-gray-200 dark:border-slate-800">
                    <Logo />
                </div>
                <nav className="p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${location.pathname === item.path ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'}`}>
                            <span>{item.icon}</span>{item.label}
                        </Link>
                    ))}
                </nav>
                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                    <button onClick={toggleTheme} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800">
                        <span>{isDark ? '☀️' : '🌙'}</span>{isDark ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                        <span>🚪</span>Logout
                    </button>
                </div>
            </aside>

            {/* Mobile overlay */}
            {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 lg:hidden" />}

            {/* Main Content */}
            <div className="lg:ml-64 min-h-screen">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 py-4">
                    <div className="flex items-center justify-between">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Admin Panel</h1>
                        <div />
                    </div>
                </header>

                {/* Routes */}
                <main className="p-4 lg:p-8">
                    <Routes>
                        <Route index element={<DashboardHome />} />
                        <Route path="jobs" element={<JobsManager />} />
                        <Route path="applications" element={<ApplicationsView />} />
                        <Route path="contacts" element={<ContactsView />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}

// Dashboard Home
function DashboardHome() {
    const [stats, setStats] = useState({ jobs: 0, applications: 0, contacts: 0 })

    useEffect(() => {
        Promise.all([getJobs(), getApplications(), getContactQueries()])
            .then(([jobs, apps, contacts]) => setStats({ jobs: jobs.length, applications: apps.length, contacts: contacts.length }))
            .catch(console.error)
    }, [])

    const statCards = [
        { label: 'Active Jobs', value: stats.jobs, icon: '💼', color: 'from-indigo-500 to-purple-500' },
        { label: 'Applications', value: stats.applications, icon: '📝', color: 'from-cyan-500 to-teal-500' },
        { label: 'Contact Queries', value: stats.contacts, icon: '📧', color: 'from-orange-500 to-red-500' },
    ]

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard Overview</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((stat) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-2xl mb-4`}>{stat.icon}</div>
                        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</p>
                        <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

// Jobs Manager
function JobsManager() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingJob, setEditingJob] = useState(null)
    const [formData, setFormData] = useState({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '' })

    useEffect(() => { fetchData() }, [])

    const fetchData = async () => {
        try {
            const data = await getJobs()
            setJobs(data)
        } catch (e) { console.error(e) } finally { setLoading(false) }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editingJob) {
                await updateJob(editingJob.id, formData)
            } else {
                await createJob(formData)
            }
            fetchData()
            resetForm()
        } catch (e) { console.error(e) }
    }

    const handleEdit = (job) => {
        setEditingJob(job)
        setFormData({ title: job.title, department: job.department, location: job.location, type: job.type, description: job.description, requirements: job.requirements || '' })
        setShowForm(true)
    }

    const handleDelete = async (id) => {
        if (confirm('Are you sure?')) {
            await deleteJob(id)
            fetchData()
        }
    }

    const resetForm = () => {
        setShowForm(false)
        setEditingJob(null)
        setFormData({ title: '', department: '', location: '', type: 'Full-time', description: '', requirements: '' })
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Manage Jobs</h2>
                <button onClick={() => setShowForm(true)} className="btn-primary">+ Add Job</button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div onClick={resetForm} className="absolute inset-0 bg-black/50" />
                    <div className="relative w-full max-w-lg glass-card p-6 bg-white dark:bg-slate-900 max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">{editingJob ? 'Edit Job' : 'Add New Job'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div><label className="form-label">Title *</label><input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="form-input" /></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div><label className="form-label">Department *</label><input type="text" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} required className="form-input" /></div>
                                <div><label className="form-label">Location *</label><input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required className="form-input" /></div>
                            </div>
                            <div><label className="form-label">Type</label><select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="form-input"><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Remote</option></select></div>
                            <div><label className="form-label">Description *</label><textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required rows={3} className="form-input" /></div>
                            <div><label className="form-label">Requirements</label><textarea value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} rows={3} className="form-input" /></div>
                            <div className="flex gap-4">
                                <button type="button" onClick={resetForm} className="flex-1 btn-secondary">Cancel</button>
                                <button type="submit" className="flex-1 btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Jobs Table */}
            <div className="glass-card overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">Loading...</div>
                ) : jobs.length === 0 ? (
                    <div className="p-8 text-center text-gray-600 dark:text-gray-400">No jobs yet</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="admin-table">
                            <thead><tr><th>Title</th><th>Department</th><th>Location</th><th>Type</th><th>Actions</th></tr></thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job.id}>
                                        <td className="font-medium text-gray-900 dark:text-gray-100">{job.title}</td>
                                        <td>{job.department}</td>
                                        <td>{job.location}</td>
                                        <td><span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-xs">{job.type}</span></td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEdit(job)} className="text-indigo-600 hover:underline text-sm">Edit</button>
                                                <button onClick={() => handleDelete(job.id)} className="text-red-600 hover:underline text-sm">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

// Applications View
function ApplicationsView() {
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => { fetchData() }, [])

    const fetchData = async () => {
        try {
            const data = await getApplications()
            setApplications(data)
        } catch (e) { console.error(e) } finally { setLoading(false) }
    }

    const handleStatusChange = async (id, status) => {
        await updateApplicationStatus(id, status)
        fetchData()
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Job Applications</h2>
            <div className="glass-card overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">Loading...</div>
                ) : applications.length === 0 ? (
                    <div className="p-8 text-center text-gray-600 dark:text-gray-400">No applications yet</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="admin-table">
                            <thead><tr><th>Name</th><th>Email</th><th>Job</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
                            <tbody>
                                {applications.map((app) => (
                                    <tr key={app.id}>
                                        <td className="font-medium text-gray-900 dark:text-gray-100">{app.name}</td>
                                        <td>{app.email}</td>
                                        <td>{app.job_title || 'N/A'}</td>
                                        <td>
                                            <select value={app.status} onChange={(e) => handleStatusChange(app.id, e.target.value)} className="text-xs px-2 py-1 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800">
                                                <option value="pending">Pending</option>
                                                <option value="reviewed">Reviewed</option>
                                                <option value="interviewed">Interviewed</option>
                                                <option value="hired">Hired</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </td>
                                        <td>{new Date(app.created_at).toLocaleDateString()}</td>
                                        <td><a href={app.resume_url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline text-sm">Resume</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

// Contacts View
function ContactsView() {
    const [contacts, setContacts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => { fetchData() }, [])

    const fetchData = async () => {
        try {
            const data = await getContactQueries()
            setContacts(data)
        } catch (e) { console.error(e) } finally { setLoading(false) }
    }

    const handleStatusChange = async (id, status) => {
        await updateContactStatus(id, status)
        fetchData()
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Contact Queries</h2>
            <div className="glass-card overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center">Loading...</div>
                ) : contacts.length === 0 ? (
                    <div className="p-8 text-center text-gray-600 dark:text-gray-400">No queries yet</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="admin-table">
                            <thead><tr><th>Name</th><th>Email</th><th>Subject</th><th>Status</th><th>Date</th></tr></thead>
                            <tbody>
                                {contacts.map((contact) => (
                                    <tr key={contact.id}>
                                        <td className="font-medium text-gray-900 dark:text-gray-100">{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td className="max-w-xs truncate">{contact.subject}</td>
                                        <td>
                                            <select value={contact.status} onChange={(e) => handleStatusChange(contact.id, e.target.value)} className="text-xs px-2 py-1 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800">
                                                <option value="new">New</option>
                                                <option value="in_progress">In Progress</option>
                                                <option value="resolved">Resolved</option>
                                            </select>
                                        </td>
                                        <td>{new Date(contact.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Admin
