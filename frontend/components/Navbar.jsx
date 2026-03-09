'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const BoltIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
);

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm'
                : 'bg-transparent'
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2.5 cursor-pointer"
                >
                    <motion.div
                        whileHover={{ rotate: 15 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        className="w-8 h-8 rounded-xl bg-[#2563eb] flex items-center justify-center text-white shadow-lg shadow-blue-500/20"
                    >
                        <BoltIcon />
                    </motion.div>
                    <span className="text-lg font-bold tracking-tight text-slate-900">
                        Wattwise
                    </span>
                </motion.div>

                {/* Single CTA — PrettyProgress style */}
                <motion.a
                    href="#waitlist"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold bg-slate-900 text-white transition-colors duration-200 shadow-lg shadow-slate-900/10 hover:bg-slate-800"
                >
                    Join Waitlist
                </motion.a>
            </div>
        </motion.nav>
    );
}
