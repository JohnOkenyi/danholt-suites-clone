'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';

const quickQuestions = [
    "What are your room rates?",
    "Do you offer airport pickup?",
    "What amenities are included?",
    "How do I make a reservation?",
];

export default function LiveChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
    const [inputValue, setInputValue] = useState('');
    const [chatMode, setChatMode] = useState<'ai' | 'human'>('ai');

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        setMessages([...messages, { text: inputValue, isUser: true }]);
        setInputValue('');

        // Simulate response
        setTimeout(() => {
            const response = chatMode === 'ai'
                ? "Thank you for your message! Our team will assist you shortly. For immediate assistance, please call 0704 608 0351."
                : "A concierge will be with you shortly. Please hold...";
            setMessages(prev => [...prev, { text: response, isUser: false }]);
        }, 1000);
    };

    const handleQuickQuestion = (question: string) => {
        setMessages([...messages, { text: question, isUser: true }]);

        setTimeout(() => {
            setMessages(prev => [...prev, {
                text: "Thank you for your inquiry! Our team is reviewing your question and will respond shortly.",
                isUser: false
            }]);
        }, 800);
    };

    return (
        <>
            {/* Chat Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed z-50 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
                style={{
                    bottom: '40px',
                    right: '40px',
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#c9a961'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MessageCircle className="w-6 h-6 text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-danholt-gold to-yellow-500 p-6 text-danholt-dark">
                            <h3 className="text-xl font-bold mb-2">Danholt Concierge</h3>
                            <p className="text-sm opacity-90">How may we assist you today?</p>

                            {/* Mode Toggle */}
                            <div className="flex gap-2 mt-4">
                                <button
                                    onClick={() => setChatMode('ai')}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${chatMode === 'ai'
                                        ? 'bg-danholt-dark text-white'
                                        : 'bg-white/20 text-danholt-dark hover:bg-white/30'
                                        }`}
                                >
                                    <Bot className="w-3 h-3" />
                                    AI Assistant
                                </button>
                                <button
                                    onClick={() => setChatMode('human')}
                                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${chatMode === 'human'
                                        ? 'bg-danholt-dark text-white'
                                        : 'bg-white/20 text-danholt-dark hover:bg-white/30'
                                        }`}
                                >
                                    <User className="w-3 h-3" />
                                    Human Agent
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                            {messages.length === 0 && (
                                <div className="text-center text-gray-500 mt-8">
                                    <p className="mb-4">Start a conversation or choose a quick question:</p>
                                    <div className="space-y-2">
                                        {quickQuestions.map((question, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleQuickQuestion(question)}
                                                className="block w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-danholt-gold/10 hover:border-danholt-gold border border-gray-200 transition-all text-sm"
                                            >
                                                {question}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] px-4 py-3 rounded-2xl ${message.isUser
                                            ? 'bg-danholt-gold text-danholt-dark'
                                            : 'bg-white text-gray-800 border border-gray-200'
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed">{message.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-gray-200">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-danholt-gold text-gray-800 text-sm"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="w-12 h-12 bg-danholt-gold rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors"
                                >
                                    <Send className="w-5 h-5 text-danholt-dark" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
