import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getJobs, submitApplication } from '../api/api.js'

/**
 * Careers Page Component
 * Job listings from backend + apply form
 */
function Careers() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedJob, setSelectedJob] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', resumeUrl: '', coverLetter: '' })
    const [submitStatus, setSubmitStatus] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        fetchJobs()
    }, [])

    const fetchJobs = async () => {
        try {
            const data = await getJobs()
            setJobs(data)
        } catch (error) {
            console.error('Error fetching jobs:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleApply = (job) => {
        setSelectedJob(job)
        setShowModal(true)
        setSubmitStatus(null)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        try {
            await submitApplication({ ...formData, jobId: selectedJob.id })
            setSubmitStatus('success')
            setFormData({ name: '', email: '', phone: '', resumeUrl: '', coverLetter: '' })
        } catch (error) {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen pt-20">
            {/* Hero */}
            <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950">
                <div className="section-container text-center max-w-3xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="text-indigo-600 dark:text-indigo-400 font-medium mb-4 block">Join Our Team</span>
                        <h1 className="section-title mb-6">Build Your Career With Us</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">Join a team of innovators shaping the future of data</p>
                    </motion.div>
                </div>
            </section>

            {/* Job Listings */}
            <section className="py-16 lg:py-24">
                <div className="section-container">
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto"></div>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading positions...</p>
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="text-center py-12 glass-card p-8">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No Open Positions</h3>
                            <p className="text-gray-600 dark:text-gray-400">Check back later for new opportunities</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {jobs.map((job, i) => (
                                <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card p-6 lg:p-8">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{job.title}</h3>
                                            <div className="flex flex-wrap gap-3 text-sm">
                                                <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">📍 {job.location}</span>
                                                <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">🏢 {job.department}</span>
                                                <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full">{job.type}</span>
                                            </div>
                                        </div>
                                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleApply(job)} className="btn-primary whitespace-nowrap">Apply Now</motion.button>
                                    </div>
                                    <p className="mt-4 text-gray-600 dark:text-gray-400">{job.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Apply Modal */}
            {showModal && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                    <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-lg glass-card p-6 bg-white dark:bg-slate-900 max-h-[90vh] overflow-y-auto">
                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Apply for {selectedJob?.title}</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">{selectedJob?.department} • {selectedJob?.location}</p>

                        {submitStatus === 'success' ? (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Application Received!</h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-8">
                                    Thank you for your interest in <strong>{selectedJob?.title}</strong>. 
                                    Our team will review your application and get back to you soon.
                                </p>
                                <button onClick={() => setShowModal(false)} className="w-full btn-primary py-4">Close Instance</button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {submitStatus === 'error' && (
                                    <div className="mb-4 p-4 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                                        Error submitting. Please try again or contact us if the issue persists.
                                    </div>
                                )}
                                <div>
                                    <label className="form-label">Full Name *</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required minLength={3} pattern="[A-Za-z ]+" className="form-input" />
                                </div>
                                <div>
                                    <label className="form-label">Email *</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" />
                                </div>
                                <div>
                                    <label className="form-label">Phone *</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required pattern="[0-9]{10}" className="form-input" />
                                </div>
                                <div>
                                    <label className="form-label">Resume URL *</label>
                                    <input type="url" name="resumeUrl" value={formData.resumeUrl} onChange={handleChange} required pattern="https?://.+" className="form-input" placeholder="https://drive.google.com/..." />
                                </div>
                                <div>
                                    <label className="form-label">Cover Letter</label>
                                    <textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} rows={4} minLength={20} className="form-input resize-none" />
                                </div>
                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isSubmitting} className="w-full btn-primary py-4">
                                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                                </motion.button>
                            </form>
                        )}

                    </motion.div>
                </motion.div>
            )}
        </motion.div>
    )
}

export default Careers
