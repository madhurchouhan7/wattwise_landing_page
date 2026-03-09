'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function FounderVision() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="about" className="py-24 sm:py-32 relative">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                    className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 sm:p-14 text-center border border-slate-200/60 relative overflow-hidden">

                    {/* Decorative quote marks */}
                    <div className="absolute top-6 left-8 text-blue-100 text-8xl font-serif leading-none select-none">&ldquo;</div>
                    <div className="absolute bottom-6 right-8 text-blue-100 text-8xl font-serif leading-none select-none">&rdquo;</div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 relative z-10 leading-snug">
                        &ldquo;Every family deserves to know where their <em className="not-italic text-blue-600">money goes.</em>&rdquo;
                    </h2>

                    <blockquote className="text-base sm:text-lg text-slate-500 leading-relaxed mb-8 relative z-10 max-w-2xl mx-auto">
                        Energy is something we pay for every month — yet most of us have
                        no visibility into how we&apos;re using it. I built Wattwise because
                        every person deserves the tools to make smarter, data-driven decisions
                        about something as fundamental as electricity.
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center justify-center gap-4 mb-10">
                        <div className="w-32 h-32 rounded-[32px] flex-shrink-0 shadow-lg shadow-blue-500/20 relative overflow-hidden bg-blue-600">
                            <img src="/images/founder.jpeg" alt="Madhur Chouhan" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-slate-900 text-lg">Madhur Chouhan</p>
                            <p className="text-slate-400 text-sm">Founder & CEO, Wattwise</p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="pt-8 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
                        {[
                            { value: '100%', label: 'Free Early Access' },
                            { value: '18%', label: 'Avg savings found' },
                            { value: '2026', label: 'Beta launch year' },
                        ].map((s) => (
                            <div key={s.label} className="text-center">
                                <p className="text-3xl font-extrabold text-blue-600">{s.value}</p>
                                <p className="text-xs text-slate-400 mt-1 font-medium">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
