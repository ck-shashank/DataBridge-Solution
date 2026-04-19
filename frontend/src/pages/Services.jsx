import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Services() {
    const services = [
        {
            id: 'xml-conversion-processing',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            title: 'XML Conversion & Processing',
            description:
                'Accurate and scalable XML conversion services for publishers, enterprises, and digital platforms.',
            features: ['DTD / XSD compliance', 'Large-volume conversion', 'Multi-format support', '99.9% accuracy'],
            color: 'from-blue-500 to-indigo-600',
        },
        {
            id: 'data-entry-data-management',
            title: 'Data Entry & Data Management',
            description:
                'End-to-end data processing services designed to handle high-volume, mission-critical business data.',
            features: ['Data validation', 'Data cleansing', 'Structured workflows', 'Secure handling'],
            color: 'from-cyan-500 to-teal-600',
        },
        {
            id: 'document-digitalization',
            title: 'Document Digitalization',
            description:
                'Convert physical documents into high-quality, searchable digital formats.',
            features: ['Document scanning', 'OCR processing', 'Indexing & tagging', 'Archive digitization'],
            color: 'from-violet-500 to-purple-600',
        },
        {
            id: 'data-validation-quality-check',
            title: 'Data Validation & Quality Check',
            description:
                'Multi-layer quality assurance processes to ensure error-free delivery.',
            features: ['Manual + automated QC', 'Process audits', 'Accuracy reporting', 'Client-specific checks'],
            color: 'from-emerald-500 to-green-600',
        },
        {
            id: 'it-bpo-services',
            title: 'IT & BPO Support Services',
            description:
                'Reliable BPO services that streamline business operations.',
            features: ['Data entry', 'Back-office operations', '24/7 support', 'Cost optimization'],
            color: 'from-orange-500 to-red-600',
        },
    ]

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen pt-20">
<section
  className="relative w-full h-[550px] md:h-[650px] flex items-center justify-center overflow-hidden"
  style={{
    backgroundImage: 'url(Service.png)', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  {/* Dark overlay to reduce image opacity and highlight content */}
  <div className="absolute inset-0 bg-black/50"></div>

  <div className="relative z-10 text-center text-white px-4 md:px-8 lg:px-0 max-w-4xl">
    <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-4">
      Professional Data Services
    </h1>
    <p className="text-lg md:text-xl mb-8">
      Accurate, secure, and scalable solutions for XML Conversion and Processing, Document Digitalization, Data Entry & Data Management, Data Validation & Quality Check,IT & BPO services.
    </p>
    <Link
      to="/contact"
      className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold transition-colors"
    >
      Contact Our Team
    </Link>
  </div>
</section>

            {/* Services Grid */}
            <section className="py-16 lg:py-24">
                <div className="section-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            id={service.id}   
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group glass-card p-8 card-hover relative overflow-hidden scroll-mt-28"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                            <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">{service.description}</p>
                            <ul className="space-y-2">
                                {service.features.map(f => (
                                    <li key={f} className="text-sm text-gray-600 dark:text-gray-400">✓ {f}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}

                </div>
            </section>

            {/* CTA */}
            <section className="py-16 lg:py-24 text-center">
                <Link to="/contact" className="btn-primary">
                    Contact Our Team
                </Link>
            </section>

        </motion.div>
    )
}

export default Services
