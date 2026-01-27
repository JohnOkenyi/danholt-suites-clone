'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Sparkles, Coffee, Bed, Building, Mic, PhoneOff } from 'lucide-react';
import Script from 'next/script';

const quickQuestions = [
    "What are your room rates?",
    "Do you offer airport pickup?",
    "What amenities are included?",
    "How do I make a reservation?",
];

const JOKES = {
    hotel: [
        "Our biggest problem? Guests refusing to check out from the comfort in their hearts.",
        "We can’t guarantee you’ll wake up early, but we can guarantee you’ll want to stay longer.",
        "Our lobby is where time slows down and selfies mysteriously increase.",
        "We overbook only two things here: comfort and compliments.",
        "At Danholt, the only thing we lose is track of how many guests fall asleep in the lounge.",
        "We take your rest so seriously that even our chairs are on relaxation duty.",
        "If walls could talk, ours would say: ‘Welcome back, we missed you.’",
        "Our favourite type of guest? The one who says ‘I’ll be back’ at checkout.",
        "We can’t pack your suitcase, but we can unpack your stress.",
        "Our Wi‑Fi has one rule: no buffering your happiness."
    ],
    rooms_sleep: [
        "Our beds are so comfortable, the snooze button gets jealous.",
        "Warning: side effects of our beds may include oversleeping and extreme relaxation.",
        "We iron the sheets so your dreams don’t have any wrinkles.",
        "We make the bed. You make the memories.",
        "Our pillows are trained professionals in catching dreams.",
        "If you don’t remember how quickly you fell asleep, we did our job.",
        "We turn down the room so you can turn off the world.",
        "The only thing softer than our pillows is the feeling of not setting an alarm.",
        "Our housekeeping superpower: making your bed look better than your phone’s wallpaper.",
        "Our goal: check in tired, check out wondering what mattress you just slept on."
    ],
    food_dining: [
        "Our chef’s mission: make you forget you once said ‘I’m on a diet.’",
        "Calories are on vacation here too, they don’t count in the restaurant.",
        "If happiness had a sound, it would be cutlery on our plates.",
        "We serve food your camera insists you photograph first.",
        "Warning: breakfast may cause sudden loyalty to Danholt Suites.",
        "Our menu has one key ingredient: ‘One more bite.’",
        "We can’t fix your whole week, but we can fix your dinner.",
        "Room service motto: good things come to guests who stay in bed.",
        "Our coffee has a simple job: turn ‘check-in face’ into ‘vacation face’.",
        "Some guests come for a night and stay for the dessert menu."
    ]
};

type JokeCategory = keyof typeof JOKES;

import { findAnswer } from '@/lib/knowledgeBase';

export default function LiveChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; isJoke?: boolean }>>([]);
    const [inputValue, setInputValue] = useState('');
    const [chatMode, setChatMode] = useState<'ai' | 'humor' | 'voice'>('ai');
    const [isTyping, setIsTyping] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);

    // ... existing code ...


    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [activeJokeCategory, setActiveJokeCategory] = useState<JokeCategory | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, chatMode]);

    // Handle initial greeting when switching to Humor Mode
    useEffect(() => {
        if (chatMode === 'humor') {
            setMessages(prev => {
                // Prevent adding welcome message if it's already the last message
                if (prev.length > 0 && prev[prev.length - 1].text.startsWith("Welcome to Humor Mode")) {
                    return prev;
                }
                return [...prev, {
                    text: "Welcome to Humor Mode. I’m your in‑house comedian-concierge—shall I make your wait more interesting?",
                    isUser: false
                }];
            });
            setActiveJokeCategory(null);
        } else if (chatMode === 'ai') {
            // Strictly reset to Quick Questions (empty history) when returning to AI
            setMessages([]);
        } else if (chatMode === 'voice') {
            // Clear messages or show a placeholder?
            setMessages([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatMode]);

    // Close voice mode if widget closes
    useEffect(() => {
        if (!isOpen) {
            setChatMode('ai'); // Reset to default on close to kill voice session
        }
    }, [isOpen]);

    const processResponse = (query: string) => {
        setIsTyping(true);
        setTimeout(() => {
            let response;
            if (chatMode === 'ai') {
                const answer = findAnswer(query);
                // Fallback updated to strict "website only" policy
                response = answer || "I can only answer questions based on the information in the website. If the information is not in the website please speak to staff, that's the hotel phone number: +234 800 000 0000.";
            } else {
                // Fallback for humor mode text input, though UI drives it mostly
                response = "I'm best at telling jokes! Click one of the categories below.";
            }

            setMessages(prev => [...prev, { text: response, isUser: false }]);
            setIsTyping(false);
        }, 1000);
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;
        const msg = inputValue;
        setMessages([...messages, { text: msg, isUser: true }]);
        setInputValue('');
        processResponse(msg);
    };

    const handleQuickQuestion = (question: string) => {
        setMessages([...messages, { text: question, isUser: true }]);
        processResponse(question);
    };

    const playJoke = (category: JokeCategory) => {
        setActiveJokeCategory(category);
        const categoryJokes = JOKES[category];
        const randomJoke = categoryJokes[Math.floor(Math.random() * categoryJokes.length)];

        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, { text: randomJoke, isUser: false, isJoke: true }]);
            setIsTyping(false);
        }, 600);
    };

    return (
        <>
            {/* Load ElevenLabs Script Once */}
            <Script src="https://elevenlabs.io/convai-widget/index.js" strategy="afterInteractive" />

            {/* Chat Button (Only visible if NOT in voice mode) */}
            {chatMode !== 'voice' && (
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="fixed z-[2147483647] rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300"
                    style={{
                        bottom: '40px',
                        right: '40px',
                        width: '60px',
                        height: '60px',
                        backgroundColor: '#c9a961'
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 1 }}
                    animate={{ scale: 1 }}
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
            )}

            {/* Main Chat Window (AI / Humor) - Hidden during Voice Call */}
            <AnimatePresence>
                {isOpen && chatMode !== 'voice' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed bottom-32 right-2 z-[2147483647] w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-danholt-gold to-yellow-500 p-6 text-danholt-dark">
                            <h3 className="text-xl font-bold mb-2">Danholt Concierge</h3>
                            <p className="text-sm opacity-90">How may we assist you today?</p>

                            {/* Mode Toggle Tabs */}
                            <div className="grid grid-cols-3 gap-1 mt-4 p-1 bg-black/20 rounded-lg backdrop-blur-sm">
                                <button
                                    onClick={() => setChatMode('ai')}
                                    className={`flex flex-col items-center justify-center gap-1 py-2 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${chatMode === 'ai'
                                        ? 'bg-white text-danholt-dark shadow-sm'
                                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <Bot className="w-4 h-4" />
                                    AI Assist
                                </button>
                                <button
                                    onClick={() => setChatMode('humor')}
                                    className={`flex flex-col items-center justify-center gap-1 py-2 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${chatMode === 'humor'
                                        ? 'bg-white text-danholt-dark shadow-sm'
                                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <Sparkles className="w-4 h-4" />
                                    Humor
                                </button>
                                <button
                                    onClick={() => {
                                        setChatMode('voice');
                                        // Auto-trigger widget logic
                                        setTimeout(() => {
                                            const widget = document.querySelector('elevenlabs-convai') as HTMLElement;
                                            if (widget) {
                                                widget.click();
                                            }
                                        }, 100);
                                    }}
                                    className="flex flex-col items-center justify-center gap-1 py-2 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all text-white/70 hover:bg-white/10 hover:text-white"
                                >
                                    <Mic className="w-4 h-4" />
                                    Voice Call
                                </button>
                            </div>

                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 flex flex-col">

                            {/* Standard Messages (AI & Humor) */}
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] px-4 py-3 rounded-2xl ${message.isUser
                                            ? 'bg-danholt-gold text-danholt-dark'
                                            : 'bg-white text-gray-800 border border-gray-200'
                                            } ${message.isJoke ? 'border-l-4 border-l-danholt-gold shadow-sm' : ''}`}
                                    >
                                        <p className="text-sm leading-relaxed">{message.text}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-white px-4 py-3 rounded-2xl border border-gray-200 flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </motion.div>
                            )}

                            {/* Humor Mode Controls - FIXED CONTRAST */}
                            {chatMode === 'humor' && !isTyping && (
                                <div className="mt-auto space-y-3 pt-4">
                                    {!activeJokeCategory ? (
                                        <div className="grid grid-cols-1 gap-2">
                                            <button
                                                onClick={() => playJoke('hotel')}
                                                className="flex items-center gap-3 p-3 bg-white hover:bg-danholt-gold/10 border border-gray-200 rounded-xl transition-all text-sm font-medium text-left group text-gray-800"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-danholt-gold/20 flex items-center justify-center text-danholt-dark group-hover:bg-danholt-gold group-hover:text-white transition-colors">
                                                    <Building size={16} />
                                                </div>
                                                Hotel Jokes
                                            </button>
                                            <button
                                                onClick={() => playJoke('rooms_sleep')}
                                                className="flex items-center gap-3 p-3 bg-white hover:bg-danholt-gold/10 border border-gray-200 rounded-xl transition-all text-sm font-medium text-left group text-gray-800"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-danholt-gold/20 flex items-center justify-center text-danholt-dark group-hover:bg-danholt-gold group-hover:text-white transition-colors">
                                                    <Bed size={16} />
                                                </div>
                                                Room & Sleep Jokes
                                            </button>
                                            <button
                                                onClick={() => playJoke('food_dining')}
                                                className="flex items-center gap-3 p-3 bg-white hover:bg-danholt-gold/10 border border-gray-200 rounded-xl transition-all text-sm font-medium text-left group text-gray-800"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-danholt-gold/20 flex items-center justify-center text-danholt-dark group-hover:bg-danholt-gold group-hover:text-white transition-colors">
                                                    <Coffee size={16} />
                                                </div>
                                                Food & Dining Jokes
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-wrap gap-2 justify-center pt-2">
                                            <button
                                                onClick={() => playJoke(activeJokeCategory)}
                                                className="px-4 py-2 bg-danholt-gold text-danholt-dark rounded-full text-xs font-bold uppercase tracking-wide hover:bg-yellow-500 transition-colors shadow-sm"
                                            >
                                                Tell Me Another
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setActiveJokeCategory(null);
                                                    setChatMode('ai');
                                                }}
                                                className="px-4 py-2 bg-white border border-gray-300 text-gray-800 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-gray-50 transition-colors"
                                            >
                                                Back to AI Assistant
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Standard AI Controls when empty */}
                            {chatMode === 'ai' && messages.length === 0 && (
                                <div className="text-center text-gray-500 mt-4">
                                    <p className="mb-4 text-xs uppercase tracking-widest opacity-60">Quick Questions</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {quickQuestions.map((question, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleQuickQuestion(question)}
                                                className="block w-full text-left px-3 py-3 bg-white rounded-lg hover:bg-danholt-gold/5 hover:border-danholt-gold border border-gray-200 transition-all text-xs text-gray-800 h-full flex items-center"
                                            >
                                                {question}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        {chatMode === 'ai' && (
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
                        )}
                        {/* Hidden/Placeholder Input for other modes */}
                        {chatMode !== 'ai' && (
                            <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
                                <p className="text-xs text-gray-400 italic">
                                    Select an option above to interact
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* EXCLUSIVE VOICE MODE UI
                Only rendered when chatMode is 'voice'. 
                Shows a minimal "End Call" button and the ElevenLabs widget container.
            */}
            {isOpen && chatMode === 'voice' && (
                <>
                    {/* The Widget Container */}
                    <div>
                        {/* @ts-ignore */}
                        <elevenlabs-convai agent-id="agent_4701kfynh9t9fwsrvabne3hs7f3f"></elevenlabs-convai>
                        {/* Script moved to top level */}
                    </div>

                    {/* Custom Close Button (Top Right to avoid covering UI) */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => setChatMode('ai')} // Return to AI mode
                        className="fixed bottom-28 right-5 z-[2147483647] p-2 bg-danholt-gold text-danholt-dark rounded-full shadow-2xl hover:bg-yellow-500 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </motion.button>
                </>
            )}
        </>
    );
}
