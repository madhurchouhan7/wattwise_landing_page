'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import WaitlistForm from './WaitlistForm';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function FinalCTA() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="py-24 sm:py-32 relative">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                    className="bg-slate-900 rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden">

                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 opacity-[0.04]" style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '32px 32px',
                    }} />
                    {/* Gradient glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 bg-blue-500/10 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-white tracking-tight mb-5 leading-tight">
                            Your next electricity bill
                            <br />
                            could be <em className="not-italic text-blue-400">18% lower.</em>
                        </h2>

                        <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl mx-auto mb-8">
                            Join <strong className="text-white">smart early users</strong> who are securing their spots.
                            Be first in line when we launch — <strong className="text-white">completely free.</strong>
                        </p>

                        {/* Scarcity */}
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <p className="text-sm text-slate-400">
                                <span className="text-amber-400 font-semibold">Early access spots are limited</span>
                            </p>
                        </div>

                        {/* Form */}
                        <div className="flex justify-center">
                            <div className="w-full max-w-md">
                                <WaitlistForm variant="cta" />
                            </div>
                        </div>

                        {/* Trust */}
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                            {[
                                { icon: '🔒', text: 'Data is safe' },
                                { icon: '💳', text: 'No credit card' },
                                { icon: '⚡', text: 'Free during beta' },
                            ].map((t) => (
                                <div key={t.text} className="flex items-center gap-2">
                                    <span className="text-sm">{t.icon}</span>
                                    <span className="text-xs text-slate-500 font-medium">{t.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
