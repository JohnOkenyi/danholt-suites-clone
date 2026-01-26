"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Crown, HeartHandshake, Sparkles } from 'lucide-react';

const values = [
    {
        icon: Crown,
        title: "Unrivaled Excellence",
        desc: "Setting benchmarks others only aspire to reach. Our standard is perfection, consistently delivered."
    },
    {
        icon: HeartHandshake,
        title: "Intuitive Service",
        desc: "Understanding your needs before they're spoken. We master the art of invisible, proactive hospitality."
    },
    {
        icon: Sparkles,
        title: "Curated Moments",
        desc: "Creating memories that linger. Every stay is personalized to your unique preferences and rhythm."
    }
];

export default function ServicePhilosophySection() {
    const [isMobile, setIsMobile] = React.useState(true);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const animationProps = isMobile ? {} : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.6 }
    };

    const cardAnimationProps = (i: number) => isMobile ? {} : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.2 }
    };

    return (
        <section className="py-20 bg-[#020617] relative overflow-hidden">
            <div className="container mx-auto px-6 z-10 relative">
                <div className="text-center mb-20">
                    <motion.h2
                        {...animationProps}
                        className="text-4xl md:text-5xl font-[300] text-white mb-6"
                    >
                        Our Philosophy
                    </motion.h2>
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-danholt-gold to-transparent mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {values.map((val, i) => (
                        <motion.div
                            key={i}
                            {...cardAnimationProps(i)}
                            className="group p-10 border border-white/5 bg-[#0f172a]/40 rounded-[2rem] backdrop-blur-sm hover:bg-[#0f172a]/60 hover:border-danholt-gold/30 transition-all duration-500"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-danholt-gold mb-8 group-hover:scale-110 group-hover:bg-danholt-gold group-hover:text-black transition-all duration-300">
                                <val.icon size={32} strokeWidth={1.2} />
                            </div>
                            <h3 className="text-2xl text-white font-[300] mb-4 group-hover:text-danholt-gold transition-colors">{val.title}</h3>
                            <p className="text-gray-400 font-[300] leading-relaxed group-hover:text-gray-300 transition-colors">
                                {val.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
