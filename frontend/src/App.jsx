import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useTheme } from './context/ThemeContext.jsx'

// Components
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Chatbot from './components/Chatbot.jsx'
import CallbackModal from './components/CallbackModal.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'


// Pages
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import Industries from './pages/Industries.jsx'
import Careers from './pages/Careers.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import Admin from './pages/Admin.jsx'

import { useState } from 'react'

/**
 * Main App component with routing and global state management
 */
function App() {
    const location = useLocation()
    const { isDark } = useTheme()
    const [isCallbackOpen, setIsCallbackOpen] = useState(false)

    return (
        <div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
               <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                {/* Hide navbar on admin routes */}
                {!location.pathname.startsWith('/admin') && (
                    <Navbar onCallbackClick={() => setIsCallbackOpen(true)} />
                )}

                <main className="flex-1">
                    <AnimatePresence mode="wait">
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<Home onCallbackClick={() => setIsCallbackOpen(true)} />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/industries" element={<Industries />} />
                            <Route path="/careers" element={<Careers />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/admin/*" element={<Admin />} />
                        </Routes>
                    </AnimatePresence>
                </main>

                {/* Hide footer on admin routes */}
                {!location.pathname.startsWith('/admin') && <Footer />}

                {/* Global Components */}
                {!location.pathname.startsWith('/admin') && <Chatbot />}
                <CallbackModal isOpen={isCallbackOpen} onClose={() => setIsCallbackOpen(false)} />
            </div>
        </div>
    )
}

export default App
