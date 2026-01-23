import React from 'react';
import { motion } from 'framer-motion';
// Actually let's check for utils/cn first or just use standard template literals to be safe.
// Checking file listing earlier: utils dir exists with 1 child. likely cn.ts.
// But to be safe I'll just use template literals and clsx-like logic if needed, or simple strings.

interface TabButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`
                px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300
                ${isActive
                    ? 'bg-danholt-gold text-danholt-midnight shadow-lg shadow-danholt-gold/20'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5'}
            `}
        >
            {label}
        </button>
    );
};
