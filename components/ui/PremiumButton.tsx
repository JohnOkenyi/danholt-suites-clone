'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface PremiumButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    disabled?: boolean;
}

export default function PremiumButton({
    children,
    href,
    onClick,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
}: PremiumButtonProps) {
    const baseStyles = 'btn-premium inline-flex items-center justify-center font-bold uppercase tracking-widest transition-all duration-300 rounded-full';

    const variantStyles = {
        primary: 'bg-danholt-gold text-danholt-dark hover:bg-yellow-400',
        secondary: 'bg-white text-danholt-dark hover:bg-danholt-cream',
        outline: 'border-2 border-danholt-gold text-danholt-gold hover:bg-danholt-gold hover:text-danholt-dark',
    };

    const sizeStyles = {
        sm: 'px-6 py-2 text-xs',
        md: 'px-8 py-3 text-sm',
        lg: 'px-10 py-4 text-base',
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`;

    const content = (
        <motion.span
            className="relative z-10"
            whileTap={{ scale: disabled ? 1 : 0.95 }}
        >
            {children}
        </motion.span>
    );

    if (href && !disabled) {
        return (
            <Link href={href} className={combinedClassName}>
                {content}
            </Link>
        );
    }

    return (
        <button
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={combinedClassName}
        >
            {content}
        </button>
    );
}
