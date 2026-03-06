'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function FounderVision() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-50/60 blur-[100px]" />
            </div>

            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="glass-card p-10 sm:p-14 text-center relative"
                >
                    {/* Quote marks */}
                    <div className="absolute top-6 left-8 text-blue-100 text-7xl font-serif leading-none select-none">&ldquo;</div>
                    <div className="absolute bottom-6 right-8 text-blue-100 text-7xl font-serif leading-none select-none">&rdquo;</div>

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-8">
                        <span className="text-blue-600 text-xs font-semibold tracking-wide uppercase">Founder&apos;s Vision</span>
                    </div>

                    {/* Quote */}
                    <blockquote className="text-xl sm:text-2xl font-medium text-slate-700 leading-relaxed mb-8 relative z-10">
                        Energy is something we pay for every single month — yet most of us have{' '}
                        <span className="font-bold text-slate-900">no visibility</span> into how we&apos;re
                        using it. I built Wattwise because I believe every person deserves the tools
                        to make{' '}
                        <span className="gradient-text font-bold">smarter, data-driven decisions</span>{' '}
                        about something as fundamental as electricity. This isn&apos;t just an app.
                        It&apos;s the start of a smarter, more empowered relationship with energy.
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0 shadow-lg">
                            <span className="text-white text-lg font-bold">M</span>
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-slate-900">Madhur Chouhan</p>
                            <p className="text-slate-500 text-sm">Founder, Wattwise</p>
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-3 gap-4">
                        {[
                            { value: '500+', label: 'Early signups' },
                            { value: '18%', label: 'Avg savings found' },
                            { value: '2026', label: 'Beta launch' },
                        ].map((s) => (
                            <div key={s.label} className="text-center">
                                <p className="text-2xl font-extrabold gradient-text">{s.value}</p>
                                <p className="text-xs text-slate-500 mt-1">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
