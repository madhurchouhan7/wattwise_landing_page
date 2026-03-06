'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const problems = [
    {
        icon: '😤',
        title: 'Shocking bills, zero clarity',
        desc: 'You get a monthly bill with no breakdown. Where did all that energy go?',
    },
    {
        icon: '📉',
        title: 'No tracking, no control',
        desc: 'Without real-time data, you can\'t act until the damage is done.',
    },
    {
        icon: '🔌',
        title: 'Appliance blind spots',
        desc: 'You have no idea which device is silently draining your wallet.',
    },
];

const solutions = [
    {
        icon: '⚡',
        title: 'Instant bill analysis',
        desc: 'Wattwise decodes your electricity bill into clear, actionable data.',
        color: 'from-blue-500 to-blue-600',
        bg: 'bg-blue-50',
    },
    {
        icon: '📊',
        title: 'Real-time dashboards',
        desc: 'Monitor usage live — hour by hour, day by day, never in the dark.',
        color: 'from-cyan-500 to-cyan-600',
        bg: 'bg-cyan-50',
    },
    {
        icon: '🔍',
        title: 'Smart appliance insights',
        desc: 'Pinpoint energy hogs and get personalized tips to cut costs.',
        color: 'from-indigo-500 to-indigo-600',
        bg: 'bg-indigo-50',
    },
];

function Card({ item, type }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <motion.div
            ref={ref}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className={`rounded-2xl p-5 border ${type === 'problem'
                    ? 'bg-slate-50 border-slate-100'
                    : `${item.bg} border-transparent`
                }`}
        >
            <div className="text-2xl mb-3">{item.icon}</div>
            <h3 className={`font-bold text-base mb-1.5 ${type === 'problem' ? 'text-slate-700' : 'text-slate-900'}`}>
                {item.title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            {type === 'solution' && (
                <div className="mt-3 flex items-center gap-1.5">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.color}`} />
                    <span className="text-xs font-semibold text-slate-600">Solved by Wattwise</span>
                </div>
            )}
        </motion.div>
    );
}

export default function ProblemSolution() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Subtle background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            </div>

            <div className="max-w-6xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    ref={ref}
                    variants={fadeUp}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 mb-5">
                        <span className="text-red-500 text-xs font-semibold tracking-wide uppercase">The Problem</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
                        Stop guessing.{' '}
                        <span className="gradient-text">Start optimizing.</span>
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Most people have no idea how much energy they use, or where it goes.
                        Wattwise changes that — permanently.
                    </p>
                </motion.div>

                {/* Two column layout */}
                <div className="grid lg:grid-cols-2 gap-10 items-start">
                    {/* Problems */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                                <span className="text-red-500 text-xs">✕</span>
                            </div>
                            <span className="text-sm font-semibold text-red-500 uppercase tracking-wide">Without Wattwise</span>
                        </div>
                        <div className="flex flex-col gap-4">
                            {problems.map((p) => (
                                <Card key={p.title} item={p} type="problem" />
                            ))}
                        </div>
                    </div>

                    {/* Solutions */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-blue-600 text-xs">✓</span>
                            </div>
                            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">With Wattwise</span>
                        </div>
                        <div className="flex flex-col gap-4">
                            {solutions.map((s) => (
                                <Card key={s.title} item={s} type="solution" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
