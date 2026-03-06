'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import WaitlistForm from './WaitlistForm';

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
    }),
};

function PhoneMockup() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [8, -8]);
    const rotateY = useTransform(x, [-100, 100], [-12, 12]);

    const handleMouse = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            style={{ perspective: 1000 }}
            className="flex items-center justify-center"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                transition={{ type: 'spring', stiffness: 80, damping: 12 }}
                className="phone-float"
            >
                {/* Glow ring */}
                <div className="absolute inset-0 -m-8 rounded-[60px] glow-ring pointer-events-none" />

                {/* Phone shell */}
                <div className="relative w-[260px] h-[520px] sm:w-[300px] sm:h-[600px] bg-slate-900 rounded-[44px] border-4 border-slate-700 shadow-2xl overflow-hidden">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-slate-900 rounded-b-2xl z-10" />

                    {/* Screen */}
                    <div className="absolute inset-1 rounded-[40px] bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
                        {/* Status bar */}
                        <div className="flex items-center justify-between px-6 pt-10 pb-2">
                            <span className="text-white text-xs font-medium">9:41</span>
                            <div className="flex gap-1 items-center">
                                <div className="h-2.5 w-4 border border-white/60 rounded-sm relative">
                                    <div className="absolute inset-0.5 right-1 bg-white/70 rounded-sm" />
                                </div>
                            </div>
                        </div>

                        {/* App header */}
                        <div className="px-5 pt-4">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-slate-400 text-xs">Hello, Madhur 👋</p>
                                    <p className="text-white font-bold text-base mt-0.5">Your Energy Dashboard</p>
                                </div>
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">M</span>
                                </div>
                            </div>

                            {/* Main stat card */}
                            <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-4 mb-3">
                                <p className="text-blue-100 text-xs mb-1">This Month's Usage</p>
                                <div className="flex items-end gap-1">
                                    <span className="text-white font-bold text-3xl">284</span>
                                    <span className="text-blue-100 text-sm mb-1">kWh</span>
                                </div>
                                <div className="mt-2 flex items-center gap-1">
                                    <svg className="w-3 h-3 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-emerald-300 text-xs">18% less than last month</span>
                                </div>
                            </div>

                            {/* Mini stat row */}
                            <div className="grid grid-cols-2 gap-2 mb-3">
                                {[
                                    { label: 'Est. Bill', value: '₹1,240' },
                                    { label: 'Peak Hour', value: '7–9 PM' },
                                ].map((s) => (
                                    <div key={s.label} className="rounded-xl bg-white/5 border border-white/10 p-3">
                                        <p className="text-slate-400 text-xs">{s.label}</p>
                                        <p className="text-white font-semibold text-sm mt-0.5">{s.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Chart placeholder */}
                            <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                                <p className="text-slate-400 text-xs mb-2">7-Day Trend</p>
                                <div className="flex items-end gap-1.5 h-12">
                                    {[55, 70, 45, 80, 65, 90, 60].map((h, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 rounded-sm bg-gradient-to-t from-blue-500 to-cyan-400 opacity-80"
                                            style={{ height: `${h}%` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Home indicator */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/30 rounded-full" />
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function HeroSection() {
    return (
        <section
            id="waitlist"
            className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
        >
            {/* Background gradient blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-blue-100/60 blur-[100px]" />
                <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-cyan-100/60 blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-50/40 blur-[120px]" />
            </div>

            <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full">
                {/* Left — Text content */}
                <div>
                    {/* Badge */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-blue-600 text-xs font-semibold tracking-wide uppercase">Now accepting early access</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.1}
                        className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-slate-900 mb-6"
                    >
                        Take Control of
                        <br />
                        <span className="gradient-text">Your Power.</span>
                        <br />
                        Effortlessly.
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.2}
                        className="text-lg sm:text-xl text-slate-500 leading-relaxed mb-8 max-w-md"
                    >
                        Wattwise analyzes your electricity bills, tracks real-time energy usage,
                        and delivers smart insights — so you always{' '}
                        <span className="font-semibold text-slate-700">decide your watt wisely.</span>
                    </motion.p>

                    {/* Form */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.3}
                    >
                        <WaitlistForm variant="hero" />
                    </motion.div>

                    {/* Social proof numbers */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.4}
                        className="mt-8 flex items-center gap-6"
                    >
                        <div className="flex -space-x-2">
                            {['bg-blue-400', 'bg-cyan-400', 'bg-indigo-400', 'bg-teal-400'].map((c, i) => (
                                <div key={i} className={`w-8 h-8 rounded-full border-2 border-white ${c} flex items-center justify-center`}>
                                    <span className="text-white text-xs font-bold">{String.fromCharCode(65 + i)}</span>
                                </div>
                            ))}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-800">Join 500+ early adopters</p>
                            <p className="text-xs text-slate-400">already on the waitlist</p>
                        </div>
                    </motion.div>
                </div>

                {/* Right — Phone mockup */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    className="flex justify-center lg:justify-end"
                >
                    <PhoneMockup />
                </motion.div>
            </div>
        </section>
    );
}
