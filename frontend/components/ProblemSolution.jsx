'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import PhoneFrame, { DashboardScreen } from './PhoneFrame';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (d = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: d },
    }),
};

export default function ProblemSolution() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section className="py-24 sm:py-32 relative">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                    className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-[2.75rem] font-extrabold tracking-tight text-slate-900 leading-tight mb-5">
                        You&apos;re <em className="not-italic text-red-500">losing money</em> every month.
                        <br />
                        We&apos;ll help you <em className="not-italic text-blue-600">stop.</em>
                    </h2>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        Most people have no idea how much energy they use, or where it goes.
                        Wattwise changes that — permanently.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Without Wattwise */}
                    <ShowcaseCard
                        title="Without Wattwise."
                        gradient="from-red-50 to-orange-50"
                        borderColor="border-red-100"
                        items={[
                            { emoji: '😰', title: 'Shocking bills, zero clarity', desc: 'Monthly bill with no breakdown. Where did the energy go?' },
                            { emoji: '📉', title: 'No tracking, no control', desc: 'No real-time data means you can\'t act until the damage is done.' },
                            { emoji: '🔌', title: 'Appliance blind spots', desc: 'No idea which device is silently draining your wallet.' },
                        ]}
                        mockup={
                            <div className="mt-6 bg-white/80 rounded-2xl p-5 border border-red-100/50 shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center"><span className="text-red-500 text-sm">📄</span></div>
                                    <div className="flex-1">
                                        <div className="h-2.5 bg-red-200/60 rounded-full w-2/3 mb-1.5" />
                                        <div className="h-2 bg-red-100/60 rounded-full w-1/2" />
                                    </div>
                                    <span className="text-red-500 text-xl font-extrabold">₹???</span>
                                </div>
                                <div className="flex gap-1 h-14">
                                    {[40, 70, 55, 90, 60, 85, 95].map((h, i) => (
                                        <div key={i} className="flex-1 bg-red-300/40 rounded-sm self-end" style={{ height: `${h}%` }} />
                                    ))}
                                </div>
                            </div>
                        }
                    />

                    {/* With Wattwise — includes phone mockup */}
                    <ShowcaseCard
                        title="With Wattwise."
                        gradient="from-blue-50 to-indigo-50"
                        borderColor="border-blue-100"
                        items={[
                            { emoji: '✅', title: 'Instant bill analysis', desc: 'Clear, actionable data you can act on immediately.' },
                            { emoji: '📊', title: 'Real-time dashboards', desc: 'Monitor usage live — hour by hour, day by day.' },
                            { emoji: '🧠', title: 'Smart appliance insights', desc: 'AI-powered tips to cut costs on each device.' },
                        ]}
                        mockup={
                            <div className="mt-6 flex justify-center overflow-hidden rounded-2xl -mb-6">
                                <div className="transform scale-[0.75] origin-top">
                                    <PhoneFrame size="lg" screenshot={null /* '/screenshots/dashboard.png' */}>
                                        <DashboardScreen />
                                    </PhoneFrame>
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>
        </section>
    );
}

function ShowcaseCard({ title, gradient, borderColor, items, mockup }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0.1}
            className={`bg-gradient-to-br ${gradient} rounded-3xl p-6 sm:p-8 border ${borderColor} overflow-hidden`}>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-6">{title}</h3>
            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.title} className="flex gap-3">
                        <span className="text-lg flex-shrink-0 mt-0.5">{item.emoji}</span>
                        <div>
                            <p className="text-sm font-bold text-slate-800">{item.title}</p>
                            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
            {mockup}
        </motion.div>
    );
}
