import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/**
 * Industries Page Component
 * Grid layout with industry icons and descriptions
 */
function Industries() {
    const industries = [
        { id: 'healthcare', name: 'Healthcare', description: 'Predictive diagnostics and patient care optimization', icon: '❤️', stats: '40% faster diagnostics', color: 'bg-rose-500' },
        { id: 'banking-finance', name: ' Banking & Finance', description: 'Real-time analytics and fraud detection', icon: '💰', stats: '60% fraud reduction', color: 'bg-emerald-500' },
        { id: 'publishing', name: 'Publishing', description: 'Content digitization, XML conversion, and end-to-end publishing workflow support', icon: '📚', stats: '50% faster turnaround', color: 'bg-indigo-500' },
       { id: 'e-commerce', name: 'E-Commerce', description: 'Product data management, catalog processing, and order support services', icon: '🛒', stats: '45% faster order processing', color: 'bg-emerald-500' },
        { id: 'education', name: 'Education', description: 'Learning analytics and student success prediction', icon: '🎓', stats: '50% better outcomes', color: 'bg-teal-500' },
    ]

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen pt-20">
            {/* Hero */}
            <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950">
                <div className="section-container text-center max-w-3xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="text-indigo-600 dark:text-indigo-400 font-medium mb-4 block">Industries We Serve</span>
                        <h1 className="section-title mb-6">Tailored Solutions for Every Sector</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">Deep domain expertise across diverse industries</p>
                    </motion.div>
                </div>
            </section>

            {/* Grid */}
            <section className="py-16 lg:py-24">
                <div className="section-container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {industries.map((ind, i) => (
                            <motion.div id={ind.id}  key={ind.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="glass-card p-6 card-hover group">
                                <div className={`w-16 h-16 rounded-2xl ${ind.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>{ind.icon}</div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">{ind.name}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{ind.description}</p>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className={`w-2 h-2 rounded-full ${ind.color}`}></span>
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">{ind.stats}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 lg:py-24 bg-gray-50 dark:bg-slate-900">
                <div className="section-container">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8 lg:p-12 bg-gradient-to-r from-indigo-600 to-cyan-500 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Looking for Industry-Specific Solutions?</h2>
                        <p className="text-white/80 mb-8">Our experts are ready to discuss your business transformation</p>
                        <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
                            Talk to an Expert
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    )
}

export default Industries