'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import WaitlistForm from './WaitlistForm';

export default function FinalCTA() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600" />

            {/* Mesh overlay */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 25% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 20%, rgba(255,255,255,0.1) 0%, transparent 40%)',
                }}
            />

            {/* Floating orbs */}
            <div className="absolute top-8 left-[10%] w-48 h-48 rounded-full bg-white/5 blur-2xl" />
            <div className="absolute bottom-8 right-[10%] w-64 h-64 rounded-full bg-cyan-300/10 blur-3xl" />

            <div className="relative max-w-4xl mx-auto px-6 text-center">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 mb-8 backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span className="text-white/90 text-xs font-semibold tracking-wide uppercase">Early Access — Limited Spots</span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-5 leading-tight">
                        Ready to get{' '}
                        <span className="text-cyan-300">Wattwise?</span>
                    </h2>

                    {/* Sub-headline */}
                    <p className="text-lg sm:text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto mb-8">
                        Join thousands of smart energy users who are taking control of their power bills.
                        Be first in line when we launch.
                    </p>

                    {/* Urgency */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                        <div className="flex -space-x-1.5">
                            {['bg-white/30', 'bg-white/25', 'bg-white/20'].map((c, i) => (
                                <div key={i} className={`w-6 h-6 rounded-full border border-white/40 ${c}`} />
                            ))}
                        </div>
                        <p className="text-sm text-blue-100">
                            <span className="text-white font-semibold">Limited spots available</span> — secure yours before launch
                        </p>
                    </div>

                    {/* Form */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-md">
                            <WaitlistForm variant="cta" />
                        </div>
                    </div>

                    {/* Trust signals */}
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                        {[
                            { icon: '🔒', text: 'No spam, ever' },
                            { icon: '⚡', text: 'Free during beta' },
                            { icon: '🎯', text: 'Cancel anytime' },
                        ].map((t) => (
                            <div key={t.text} className="flex items-center gap-1.5">
                                <span className="text-base">{t.icon}</span>
                                <span className="text-sm text-blue-100 font-medium">{t.text}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
