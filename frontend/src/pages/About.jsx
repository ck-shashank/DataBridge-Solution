import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

/**
 * About Page Component
 * DataBridge Solutions – Enterprise Data & BPO Services
 */
function About() {
    const values = [
        {
            title: 'Accuracy First',
            description: 'Every process we deliver is driven by strict quality checks and multi-level validation.',
            icon: '✔️',
        },
        {
            title: 'Data Security',
            description: 'We follow secure workflows and confidentiality standards to protect sensitive information.',
            icon: '🔒',
        },
        {
            title: 'Process Excellence',
            description: 'Well-defined, scalable processes ensure consistent delivery across large volumes.',
            icon: '⚙️',
        },
        {
            title: 'Client Commitment',
            description: 'We operate as an extension of our clients’ teams with complete ownership and accountability.',
            icon: '🤝',
        },
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pt-20"
        >
            {/* Hero */}
            <section className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950">
                <div className="section-container text-center max-w-3xl mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <span className="text-indigo-600 dark:text-indigo-400 font-medium mb-4 block">
                            About DataBridge Solutions
                        </span>
                        <h1 className="section-title mb-6">
                            Reliable. Scalable. Accuracy-Driven.
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                            DataBridge Solutions is a trusted data services partner delivering
                            high-quality data processing, XML conversion, and back-office support
                            for global organizations.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Overview */}
            <section className="py-16 lg:py-24">
                <div className="section-container">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                                Company Overview
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                                We specialize in delivering accurate, secure, and scalable data services
                                that support critical business operations across industries.
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">
                                Our teams handle complex data workflows including XML conversion,
                                data processing, digitization, and quality assurance.
                                With a strong focus on precision and confidentiality,
                                we help organizations streamline operations and improve efficiency.
                            </p>
                            <Link
                                to="/contact"
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                Work With Us
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-6"
                        >
                            {[
                                { num: '99.9%', label: 'Accuracy Levels' },
                                { num: '24/7', label: 'Operational Support' },
                                { num: 'Large Scale', label: 'Volume Handling' },
                                { num: 'Global', label: 'Client Reach' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass-card p-6 text-center"
                                >
                                    <div className="text-3xl font-bold gradient-text mb-2">
                                        {stat.num}
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
             {/* Vision & Mission */}

<div className="grid md:grid-cols-2 gap-6 md:gap-10 mt-10 max-w-4xl mx-auto">

  
  {/* Vision */}
  <motion.div
    whileHover={{
      y: -8,
      scale: 1.02,
      boxShadow: '0 20px 40px rgba(99,102,241,0.25)',
    }}
    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    className="glass-card p-7 cursor-pointer"
  >
    <motion.div
      whileHover={{ rotate: 5 }}
      className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-3xl text-white"
    >
      🌟
    </motion.div>

    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
      Our Vision
    </h3>

    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
      To become a globally recognized digital transformation partner,
      enabling organizations to innovate, scale, and succeed in an
      ever-evolving technological landscape.
    </p>

    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
      We envision a future where businesses leverage data, automation,
      and intelligent systems to unlock new opportunities and achieve
      sustainable growth.
    </p>
  </motion.div>

  {/* Mission */}
  <motion.div
    whileHover={{
      y: -8,
      scale: 1.02,
      boxShadow: '0 20px 40px rgba(34,197,94,0.25)',
    }}
    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    className="glass-card p-8 cursor-pointer"
  >
    <motion.div
      whileHover={{ rotate: -5 }}
      className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-3xl text-white"
    >
      🎯
    </motion.div>

    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
      Our Mission
    </h3>

    <ul className="space-y-3 text-gray-600 dark:text-gray-400">
      <li>• Deliver high-quality IT & BPO solutions with precision and reliability.</li>
      <li>• Build long-term partnerships through transparency and trust.</li>
      <li>• Continuously innovate using modern technologies and best practices.</li>
      <li>• Empower clients by transforming data into meaningful insights.</li>
    </ul>
  </motion.div>

</div>

<br></br><br></br>

            {/* Values */}
            <section className="py-16 lg:py-24 bg-gray-50 dark:bg-slate-900">
                <div className="section-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="section-title mb-4">Our Core Values</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Principles that define how we work and deliver
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((val, i) => (
                            <motion.div
                                key={val.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-6 text-center card-hover"
                            >
                                <div className="text-4xl mb-4">{val.icon}</div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                                    {val.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {val.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Philosophy */}
            <section className="py-16 lg:py-24">
                <div className="section-container text-center max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-title mb-4">Our People & Expertise</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Our strength lies in skilled professionals trained in data accuracy,
                            quality control, and process optimization.
                            Every team member is aligned with our commitment to precision,
                            confidentiality, and timely delivery.
                        </p>
                    </motion.div>
                </div>
            </section>
        </motion.div>
    )
}

export default About
