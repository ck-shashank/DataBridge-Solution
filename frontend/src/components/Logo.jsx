import { motion } from 'framer-motion'

/**
 * DataBridge Solutions Logo Component
 * SVG logo with hover animation (scale + glow effect)
 * Reusable across Navbar, Footer, and other components
 */
function Logo({ className = 'w-10 h-10', showText = true }) {
    return (
        <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
            {/* Animated SVG Logo */}
            <motion.svg
                className={`${className} drop-shadow-lg`}
                fill="none"
                viewBox="0 0 44 44"
                xmlns="http://www.w3.org/2000/svg"
                whileHover={{
                    filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.6))'
                }}
            >
                {/* Left arc - primary color */}
                <motion.path
                    d="M12 10C12 10 22 10 22 22C22 34 12 34 12 34"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                    className="text-indigo-600 dark:text-indigo-400"
                />

                {/* Right arc - gradient */}
                <motion.path
                    d="M22 10C22 10 32 10 32 22C32 34 22 34 22 34"
                    stroke="url(#logo-grad)"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                    opacity="0.85"
                />

                {/* Top-left circle */}
                <circle
                    cx="12"
                    cy="10"
                    r="2.5"
                    fill="currentColor"
                    className="text-indigo-600 dark:text-indigo-400"
                />

                {/* Right-center circle */}
                <circle
                    cx="32"
                    cy="22"
                    r="2.5"
                    fill="url(#logo-grad)"
                />

                {/* Bottom-left circle */}
                <circle
                    cx="12"
                    cy="34"
                    r="2.5"
                    fill="currentColor"
                    className="text-indigo-600 dark:text-indigo-400"
                />

                {/* Gradient definition */}
                <defs>
                    <linearGradient id="logo-grad" x1="22" y1="10" x2="32" y2="34">
                        <stop stopColor="#2E7CFF" />
                        <stop offset="1" stopColor="#00F0FF" />
                    </linearGradient>
                </defs>
            </motion.svg>

            {/* Company Name */}
            {showText && (
                <div className="flex flex-col">
                    <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                        DataBridge
                    </span>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 -mt-1">
                        Solutions
                    </span>
                </div>
            )}
        </motion.div>
    )
}

export default Logo
