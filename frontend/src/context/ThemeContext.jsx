import { createContext, useContext, useState, useEffect } from 'react'

/**
 * Theme Context for global dark/light mode management
 * Persists preference in localStorage and syncs across all components
 */
const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    // Initialize theme from localStorage or system preference
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('theme')
            if (saved) {
                return saved === 'dark'
            }
            return window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        return false
    })

    // Update localStorage and document class when theme changes
    useEffect(() => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
        if (isDark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [isDark])

    // Toggle theme function
    const toggleTheme = () => {
        setIsDark(prev => !prev)
    }

    const value = {
        isDark,
        toggleTheme,
        setIsDark
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}

/**
 * Custom hook to access theme context
 * @returns {Object} Theme context with isDark state and toggleTheme function
 */
export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}
