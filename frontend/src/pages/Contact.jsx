import { useState } from 'react'
import { motion } from 'framer-motion'
import { submitContactQuery } from '../api/api.js'



/**
 * Contact Page Component
 * Contact form with PostgreSQL integration
 */
function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)
        try {
            await submitContactQuery(formData)
            setSubmitStatus('success')
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        } catch (error) {
            setSubmitStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const contactInfo = [
        { icon: '📧', title: 'Email', value: 'info@databridge.com', link: 'mailto:info@databridge.com' },
        { icon: '📞', title: 'Phone', value: '+1 (234) 567-890', link: 'tel:+1234567890' },
        { icon: '📍', title: 'Address', value: 'Tech Hub, Innovation City', link: null },
    ]

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen pt-20">
            {/* Hero */}
            <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950">
                <div className="section-container text-center max-w-3xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="text-indigo-600 dark:text-indigo-400 font-medium mb-4 block">Get In Touch</span>
                        <h1 className="section-title mb-6">Contact Us</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">Have questions? We'd love to hear from you</p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="py-16 lg:py-26">
                <div className="section-container">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Form */}
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Send us a Message</h2>

                            {submitStatus && (
                                <div className={`mb-6 p-4 rounded-xl ${submitStatus === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                                    {submitStatus === 'success' ? 'Message sent successfully! We\'ll get back to you soon.' : 'Error sending message. Please try again.'}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-10">
  <div className="grid sm:grid-cols-2 gap-4">
    <div>
      <label className="form-label">Full Name *</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        minLength={3}
        pattern="[A-Za-z ]+"
        className="form-input"
      />
    </div>

    <div>
      <label className="form-label">Email *</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="form-input"
      />
    </div>
  </div>

  <div className="grid sm:grid-cols-2 gap-4">
    <div>
      <label className="form-label">Phone *</label>
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required
        pattern="[0-9]{10}"
        className="form-input"
      />
    </div>

    <div>
      <label className="form-label">Subject *</label>
      {/* <input
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        required
        minLength={5}
        className="form-input"
      /> */}
      <select
    name="subject"
    value={formData.subject}
    onChange={handleChange}
    required
    className="form-input"
  >
    <option value="">-- Select Purpose --</option>
    <option value="new_client">New Client Inquiry</option>
    <option value="existing_client">Existing Client Support</option>
    <option value="partnership">Partnership / Collaboration</option>
    <option value="sales_quote">Request for Quote / Proposal</option>
    <option value="technical_support">Technical Support / Services</option>
    <option value="career_opportunity">Career / Recruitment</option>
    <option value="general_enquiry">General Enquiry</option>
  </select>
    </div>
  </div>

  <div>
    <label className="form-label">Message *</label>
    <textarea
      name="message"
      value={formData.message}
      onChange={handleChange}
      required
      minLength={10}
      rows={5}
      className="form-input resize-none"
    />
  </div>

  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    type="submit"
    disabled={isSubmitting}
    className="w-full btn-primary py-4"
  >
    {isSubmitting ? 'Sending...' : 'Send Message'}
  </motion.button>
</form>

                        </motion.div>

                        {/* Contact Info */}
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Contact Information</h2>
                                <p className="text-gray-600 dark:text-gray-400 mb-8">Reach out to us through any of these channels</p>
                            </div>

                            {contactInfo.map((item) => (
                                <div key={item.title} className="glass-card p-6 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-2xl">{item.icon}</div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
                                        {item.link ? (
                                            <a href={item.link} className="text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400">{item.value}</a>
                                        ) : (
                                            <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{item.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Map Placeholder */}
                            {/* Google Map */}
<div className="glass-card p-2 h-64 overflow-hidden">
    <iframe
        title="DataBridge Solutions Location"
        src="https://www.google.com/maps?q=Hyderabad&output=embed"
        className="w-full h-full rounded-xl border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
    />
</div>

                        </motion.div>
                    </div>
                </div>
            </section>
        </motion.div>
    )
}

export default Contact