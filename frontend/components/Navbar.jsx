'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const BoltIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
);

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', () => setScrolled(window.scrollY > 20), { passive: true });
    }

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white">
                        <BoltIcon />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">
                        Watt<span className="gradient-text">wise</span>
                    </span>
                </div>

                {/* CTA pill */}
                <a
                    href="#waitlist"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Join Waitlist
                </a>
            </div>
        </motion.nav>
    );
}
