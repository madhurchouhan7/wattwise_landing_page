'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import PhoneFrame, { BillAnalysisScreen, AlertsScreen, ApplianceScreen, InsightsScreen } from './PhoneFrame';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (d = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: d },
    }),
};

/*
 * To use real screenshots, update the `screenshot` property below with:
 *   screenshot: '/screenshots/alerts.png'
 * The phone frame will display your PNG instead of the CSS mockup.
 */
const features = [
    {
        title: 'Real-Time Tracking.',
        desc: 'Monitor your electricity consumption live — updated every minute with precise data and interactive visualizations.',
        gradient: 'from-blue-50 via-indigo-50 to-sky-50',
        border: 'border-blue-100',
        span: 'md:col-span-2',
        mockup: (
            <div className="bg-white/80 rounded-2xl p-5 sm:p-6 border border-blue-100/50 shadow-sm w-full">
                <div className="flex items-center justify-between mb-5">
                    <div><div className="h-2.5 bg-slate-200 rounded-full w-24 mb-2" /><div className="h-3.5 bg-blue-400/60 rounded-full w-32" /></div>
                    <div className="text-right"><p className="text-[11px] text-slate-400">Today</p><p className="text-xl font-extrabold text-blue-600">284 kWh</p></div>
                </div>
                <div className="flex items-end gap-2 h-28 sm:h-36">
                    {[40, 55, 70, 45, 80, 65, 90, 50, 75, 60, 85, 55].map((h, i) => (
                        <div key={i} className="flex-1 bg-blue-400 rounded-t transition-all hover:bg-blue-600 cursor-pointer" style={{ height: `${h}%`, opacity: 0.3 + i * 0.06 }} />
                    ))}
                </div>
                <div className="flex justify-between mt-3">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                        <span key={d} className="text-[10px] text-slate-300 font-medium">{d}</span>
                    ))}
                </div>
            </div>
        ),
    },
    {
        title: 'Active Plan Management.',
        desc: 'Stay on track with your goals using one-tap check-ins and automated daily action toggles.',
        gradient: 'from-rose-50 to-orange-50',
        border: 'border-rose-100',
        span: '',
        hasPhone: true,
        screenshot: null,
        phoneScreen: <AlertsScreen />,
    },
    {
        title: 'Bill History.',
        desc: 'Easily track your utility statements across months and monitor estimated remaining cycle costs.',
        gradient: 'from-emerald-50 to-teal-50',
        border: 'border-emerald-100',
        span: '',
        hasPhone: true,
        screenshot: null, // '/screenshots/bill-analysis.png'
        phoneScreen: <BillAnalysisScreen />,
    },
    {
        title: 'Custom Plan Generation.',
        desc: 'Provide your usage context and let AI generate a targeted step-by-step strategy for saving energy.',
        gradient: 'from-violet-50 to-purple-50',
        border: 'border-violet-100',
        span: '',
        hasPhone: true,
        screenshot: null,
        phoneScreen: <ApplianceScreen />,
    },
    {
        title: 'AI-Powered Insights.',
        desc: 'Personalized saving tips with effort ratings and estimated monthly savings — powered by AI.',
        gradient: 'from-amber-50 to-yellow-50',
        border: 'border-amber-100',
        span: '',
        hasPhone: true,
        screenshot: null, // '/screenshots/insights.png'
        phoneScreen: <InsightsScreen />,
    },
    {
        title: 'Seamless Integration.',
        desc: 'Works with smart meters, IoT devices, and existing utility portals out of the box.',
        gradient: 'from-slate-50 to-gray-50',
        border: 'border-slate-200',
        span: 'md:col-span-2',
        mockup: (
            <div className="flex justify-center items-center gap-4 sm:gap-8 w-full py-6">
                {[{ label: 'Smart Meter', icon: '📡' }, { label: 'IoT Devices', icon: '🔌' }].map((d) => (
                    <div key={d.label} className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white/80 border border-slate-200/60 shadow-sm flex flex-col items-center justify-center p-3 transition-transform duration-300 hover:scale-110 hover:shadow-md cursor-pointer">
                        <span className="text-2xl group-hover:scale-110">{d.icon}</span>
                        <span className="text-[9px] text-slate-400 mt-1.5 font-medium">{d.label}</span>
                    </div>
                ))}
                <div className="flex gap-1.5">{[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-300" />)}</div>
                <div className="w-24 h-24 rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/20 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-110 hover:shadow-blue-500/40 cursor-pointer">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                    <span className="text-[9px] text-white/60 mt-1.5 font-medium">Wattwise</span>
                </div>
                <div className="flex gap-1.5">{[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-300" />)}</div>
                {[{ label: 'Utility Portal', icon: '🏢' }, { label: 'Your Phone', icon: '📱' }].map((d) => (
                    <div key={d.label} className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white/80 border border-slate-200/60 shadow-sm flex flex-col items-center justify-center p-3 transition-transform duration-300 hover:scale-110 hover:shadow-md cursor-pointer">
                        <span className="text-2xl">{d.icon}</span>
                        <span className="text-[9px] text-slate-400 mt-1.5 font-medium">{d.label}</span>
                    </div>
                ))}
            </div>
        ),
    },
];

function FeatureCard({ feature: f, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={index * 0.08}
            whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
            className={`transition-shadow hover:shadow-xl hover:shadow-slate-200/50 bg-gradient-to-br ${f.gradient} rounded-3xl p-6 sm:p-8 border ${f.border} ${f.span} flex flex-col overflow-hidden`}>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">{f.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-md">{f.desc}</p>

            {f.hasPhone ? (
                /* Phone peeks from bottom – bigger size, negative margin to overflow */
                <div className="mt-auto flex justify-center -mb-20 sm:-mb-24">
                    <div className="transform scale-[0.82] sm:scale-[0.88] origin-top">
                        <PhoneFrame screenshot={f.screenshot} size="lg">
                            {f.phoneScreen}
                        </PhoneFrame>
                    </div>
                </div>
            ) : (
                <div className="mt-auto">{f.mockup}</div>
            )}
        </motion.div>
    );
}

export default function FeaturesGrid() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section id="features" className="py-24 sm:py-32 relative">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                    className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-[2.75rem] font-extrabold tracking-tight text-slate-900 leading-tight mb-5">
                        One app. <em className="not-italic text-blue-600">Total control</em> over your energy bills.
                    </h2>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        Everything you need to understand, manage, and slash your electricity costs — all in your pocket.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {features.map((f, i) => (
                        <FeatureCard key={f.title} feature={f} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
