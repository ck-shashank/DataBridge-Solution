import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Chatbot Widget Component
 * Floating chat widget with predefined responses
 * Professional, non-intrusive design
 */
function Chatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: 'Hello! Welcome to DataBridge Solutions. How can I help you today?',
            timestamp: new Date(),
        },
    ])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef(null)

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // Predefined responses for common queries
    const getResponse = (query) => {
        const lowerQuery = query.toLowerCase()

        if (lowerQuery.includes('service') || lowerQuery.includes('what do you')) {
            return 'We offer comprehensive data solutions including XML Conversion & Processing,Data Entry & Data Management,Document Digitalization,Data Validation & Quality Check ,It & BPO Support Services . Would you like more details about any specific service?'
        }
        if (lowerQuery.includes('contact') || lowerQuery.includes('reach') || lowerQuery.includes('call')) {
            return 'You can reach us at info@databridge.com or call +1 (234) 567-890. You can also use the Contact page to send us a message, or request a callback using the button in our navigation!'
        }
        if (lowerQuery.includes('career') || lowerQuery.includes('job') || lowerQuery.includes('hiring')) {
            return 'We are always looking for talented individuals! Please visit our Careers page to see current openings and submit your application.'
        }
        if (lowerQuery.includes('price') || lowerQuery.includes('cost') || lowerQuery.includes('quote')) {
            return 'Our pricing varies based on your specific needs. Please contact our sales team for a customized quote tailored to your requirements.'
        }
        if (lowerQuery.includes('location') || lowerQuery.includes('office') || lowerQuery.includes('address')) {
            return 'Our headquarters is located in Tech Hub, Innovation City. We also have offices across multiple regions to serve our global clients.'
        }
        if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
            return 'Hello! I am here to help you learn more about DataBridge Solutions. Feel free to ask me anything!'
        }
        if (lowerQuery.includes('thank')) {
            return 'You are welcome! Is there anything else I can help you with?'
        }

        return 'Thank you for your question! For detailed assistance, please contact our team at info@databridge.com or submit a query through our Contact page. A representative will get back to you shortly.'
    }

    // Handle sending a message
    const handleSend = () => {
        if (!inputValue.trim()) return

        // Add user message
        const userMessage = {
            id: messages.length + 1,
            type: 'user',
            text: inputValue,
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setInputValue('')
        setIsTyping(true)

        // Simulate bot typing delay
        setTimeout(() => {
            const botMessage = {
                id: messages.length + 2,
                type: 'bot',
                text: getResponse(inputValue),
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, botMessage])
            setIsTyping(false)
        }, 1000 + Math.random() * 500)
    }

    // Handle Enter key
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-40">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="absolute bottom-20 right-0 w-80 sm:w-96 glass-card overflow-hidden shadow-2xl"
                    >
                        {/* Chat Header */}
                        <div className="bg-gradient-to-r from-indigo-600 to-cyan-500 p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">DataBridge Assistant</h3>
                                        <p className="text-xs text-white/80">Online now</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 rounded-lg hover:bg-white/20 transition-colors"
                                >
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-900">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl ${message.type === 'user'
                                                ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white rounded-br-md'
                                                : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-bl-md shadow-md'
                                            }`}
                                    >
                                        <p className="text-sm">{message.text}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-bl-md shadow-md">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Chat Input */}
                        <div className="p-4 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    className="flex-1 form-input py-2 text-sm"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSend}
                                    disabled={!inputValue.trim()}
                                    className="p-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${isOpen
                        ? 'bg-gray-600 dark:bg-slate-700'
                        : 'bg-gradient-to-r from-indigo-600 to-cyan-500 animate-pulse-glow'
                    }`}
            >
                {isOpen ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
            </motion.button>
        </div>
    )
}

export default Chatbot
23