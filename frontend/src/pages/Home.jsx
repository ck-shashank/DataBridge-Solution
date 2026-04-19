import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

/**
 * Home Page Component
 * DataBridge Solutions – Enterprise Data & XML Services
 */
function Home({ onCallbackClick }) {
    const [currentSlide, setCurrentSlide] = useState(0)

    // Hero carousel slides
    const heroSlides = [
        {
            title: 'Reliable Data & XML Solutions for Global Enterprises',
            subtitle: 'High-accuracy data processing, XML conversion, and back-office services you can trust.',
            // image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80',
            image: '/HomeImage.jpeg',
             
        },
        {
            title: 'Precision-Driven Data Processing Services',
            subtitle: 'Structured, validated, and secure data workflows tailored to your business needs.',
            image: '/Homeimage2.jpeg',
        },
        {
            title: 'Scalable BPO & IT-Enabled Services',
            subtitle: 'Cost-effective operational support with enterprise-grade quality and compliance.',
            image: '/HomeImage3.jpeg',
        },
    ]

    // Services preview data
    const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
    title: 'XML Conversion & Processing',
    description: 'Accurate XML conversion services ensuring structured, standards-compliant data delivery.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 17v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6" />
      </svg>
    ),
    title: 'Data Entry & Data Management',
    description: 'High-volume data entry, cleansing, validation, and transformation with strict quality checks.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 7h8M8 11h8M8 15h6" />
      </svg>
    ),
    title: 'Document Digitization',
    description: 'Secure digitization of physical documents into searchable, structured digital formats.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Data Validation & Quality Check',
    description: 'Multi-layer data validation processes to ensure accuracy and integrity.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'IT & BPO Support Services',
    description: 'Scalable IT-enabled business process outsourcing solutions tailored for enterprises.',
  },
]


    // Why choose us features
    const features = [
        { number: '99.9%', label: 'Accuracy Rate' },
        { number: '15+', label: 'Years of Experience' },
        { number: 'ISO', label: 'Quality Standards' },
        { number: '24/7', label: 'Global Support' },
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen">

            {/* Hero Section */}
            <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <div className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }} />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-transparent" />
                    </div>
                ))}

                <div className="relative section-container z-10 max-w-3xl">
                    <motion.div {...fadeInUp}>
                        <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-cyan-400 bg-cyan-400/10 rounded-full">
                            DataBridge Solutions
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            {heroSlides[currentSlide].title}
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            {heroSlides[currentSlide].subtitle}
                        </p>
                        <div className="flex gap-4">
                            <Link to="/contact" className="btn-primary">Get a Quote</Link>
                            <Link to="/services" className="btn-secondary border-white text-white">
                                Our Services
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services */}
            <section className="py-20 bg-gray-50 dark:bg-slate-900">
                <div className="section-container">
                    <motion.div {...fadeInUp} className="text-center mb-16">
                        <h2 className="section-title mb-4">Our Core Services</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Trusted data and BPO solutions designed for accuracy, scalability, and compliance.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service) => (
                            <div key={service.title} className="glass-card p-8 card-hover">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center text-white mb-6">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose DataBridge Section */}
<section className="py-20 lg:py-32 relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div
            className="absolute inset-0"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234F46E5' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
        />
    </div>

    <div className="section-container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Content */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                <span className="text-indigo-600 dark:text-indigo-400 font-medium mb-4 block">
                    Why DataBridge Solutions
                </span>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Accuracy. Security. Reliability.
                </h2>

                <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                    DataBridge Solutions is a trusted partner for organizations
                    that demand precision, compliance, and scalability.
                    We specialize in structured data services that power
                    enterprise workflows across industries.
                </p>

                <ul className="space-y-4 mb-8">
                    {[
                        'ISO-aligned quality processes',
                        'Multi-layer data validation & QA',
                        'Secure data handling & confidentiality',
                        'Scalable delivery for global clients',
                    ].map((item, index) => (
                        <motion.li
                            key={item}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                        >
                            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </span>
                            {item}
                        </motion.li>
                    ))}
                </ul>

                <button
                    onClick={onCallbackClick}
                    className="btn-primary inline-flex items-center gap-2"
                >
                    Schedule a Consultation
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </button>
            </motion.div>

            {/* Right Stats */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6"
            >
                {[
                    { value: '15+', label: 'Years Experience' },
                    { value: '99.9%', label: 'Accuracy Rate' },
                    { value: 'ISO', label: 'Quality Standards' },
                    { value: '24/7', label: 'Client Support' },
                ].map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card p-6 lg:p-8 text-center"
                    >
                        <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                            {stat.value}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400 font-medium">
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

        </div>
    </div>
</section>


            {/* CTA */}
            <section className="py-20 bg-gradient-to-r from-indigo-600 to-cyan-500 text-center">
                <h2 className="text-4xl font-bold text-white mb-6">
                    Ready to Partner with DataBridge?
                </h2>
                <p className="text-white/90 mb-8">
                    Let’s discuss how our data solutions can support your business growth.
                </p>
                <div className="flex justify-center gap-4">
                    <Link to="/contact" className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold">
                        Contact Us
                    </Link>
                    <button onClick={onCallbackClick}
                        className="px-8 py-4 border-2 border-white text-white rounded-xl">
                        Request Callback
                    </button>
                </div>
            </section>

        </motion.div>
    )
}

export default Home
