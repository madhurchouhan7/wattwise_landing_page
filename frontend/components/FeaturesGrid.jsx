'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        title: 'Real-Time Tracking',
        desc: 'Monitor your electricity consumption live — updated every minute.',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        span: 'lg:col-span-2',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
        ),
        title: 'Smart Alerts',
        desc: 'Get notified when usage spikes or your bill is on track to exceed your budget.',
        color: 'text-cyan-600',
        bg: 'bg-cyan-50',
        border: 'border-cyan-100',
        span: '',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
        ),
        title: 'Bill Analysis',
        desc: 'Upload your electricity bill and get instant transparency on every charge.',
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        border: 'border-indigo-100',
        span: '',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        ),
        title: 'Usage Predictions',
        desc: 'AI-powered forecasts predict your next bill before it arrives.',
        color: 'text-violet-600',
        bg: 'bg-violet-50',
        border: 'border-violet-100',
        span: '',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: 'Cost Breakdown',
        desc: 'See exactly where every rupee of your electricity bill goes, appliance by appliance.',
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-100',
        span: '',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
        ),
        title: 'Seamless Integration',
        desc: 'Works with smart meters, IoT devices, and existing utility portals out-of-the-box.',
        color: 'text-teal-600',
        bg: 'bg-teal-50',
        border: 'border-teal-100',
        span: 'lg:col-span-2',
    },
];

// Extracted to a proper component so hooks can be called correctly
function FeatureCard({ feature: f, index: i }) {
    const cardRef = useRef(null);
    const cardInView = useInView(cardRef, { once: true, margin: '-60px' });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 28 }}
            animate={cardInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
            className={`feature-card glass-card p-6 ${f.span}`}
        >
            <div className={`w-11 h-11 rounded-xl ${f.bg} ${f.color} flex items-center justify-center mb-4 border ${f.border}`}>
                {f.icon}
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-2">{f.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
        </motion.div>
    );
}

export default function FeaturesGrid() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            </div>

            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 32 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-5">
                        <span className="text-blue-600 text-xs font-semibold tracking-wide uppercase">Core Features</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
                        Everything you need to{' '}
                        <span className="gradient-text">watt wisely</span>
                    </h2>
                    <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
                        A complete toolkit for understanding, managing, and optimizing
                        your energy consumption — all in your pocket.
                    </p>
                </motion.div>

                {/* Bento grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
                    {features.map((f, i) => (
                        <FeatureCard key={f.title} feature={f} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
