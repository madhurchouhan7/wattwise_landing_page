'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import PhoneFrame, { DashboardScreen, BillAnalysisScreen, AlertsScreen, ApplianceScreen, InsightsScreen } from './PhoneFrame';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (d = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: d },
    }),
};

/*
 * To use real screenshots, add your PNGs to /public/screenshots/ and update the
 * `screenshot` field below. For example:
 *   screenshot: '/screenshots/dashboard.png',
 *
 * The phone frame will display the image instead of the CSS mockup.
 * Set screenshot to null to use the CSS fallback.
 */
const screens = [
    {
        id: 'dashboard', label: 'Dashboard', icon: '📊',
        screenshot: null,
        fallback: <DashboardScreen />,
        headline: 'Your energy at a glance.',
        description: 'See your monthly usage, estimated bill, peak hours, and active plan progress — all on one clean dashboard.',
    },
    {
        id: 'bills', label: 'Bill History', icon: '📄',
        screenshot: null,
        fallback: <BillAnalysisScreen />,
        headline: 'Bills decoded instantly.',
        description: 'Get an instant breakdown of your utility overview. Track usage, remaining days, and track your payment history effortlessly.',
    },
    {
        id: 'plan_management', label: 'Active Plan', icon: '⚡',
        screenshot: null,
        fallback: <AlertsScreen />,
        headline: 'Manage your savings plan.',
        description: 'Stay on track with 85% adherence tracking, automated daily actions, and estimated cycle savings updated in real-time.',
    },
    {
        id: 'plan_context', label: 'Plan Setup', icon: '🎯',
        screenshot: null,
        fallback: <ApplianceScreen />,
        headline: 'AI generated strategies.',
        description: 'Review your personalized efficiency plan with clear action highlights and targeted monthly savings goals.',
    },
    {
        id: 'insights', label: 'Insights', icon: '🧠',
        screenshot: null,
        fallback: <InsightsScreen />,
        headline: 'AI that saves you money.',
        description: 'View your overall efficiency score, track appliance breakdown, and observe 30-day intensity mapping natively.',
    },
];

export default function AppShowcase() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });
    const [active, setActive] = useState(0);
    const current = screens[active];

    return (
        <section className="py-24 sm:py-32 relative overflow-hidden">
            {/* Subtle gradient backdrop */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/40 to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                    className="text-center max-w-3xl mx-auto mb-14">
                    <h2 className="text-3xl sm:text-[2.75rem] font-extrabold tracking-tight text-slate-900 leading-tight mb-5">
                        See it in action.
                        <br />
                        <em className="not-italic text-blue-600">Every screen, designed for you.</em>
                    </h2>
                    <p className="text-lg text-slate-500 leading-relaxed">
                        From real-time tracking to AI-powered savings — here&apos;s a preview of what Wattwise will look like on your phone.
                    </p>
                </motion.div>

                {/* Screen selector tabs */}
                <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0.1}
                    className="flex justify-center gap-2 sm:gap-3 mb-14 flex-wrap">
                    {screens.map((s, i) => (
                        <motion.button key={s.id} onClick={() => setActive(i)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 outline-none border transition-colors duration-300 ${active === i
                                ? 'text-white border-transparent'
                                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-700'
                                }`}>
                            {active === i && (
                                <motion.div layoutId="activeScreenTab" className="absolute inset-0 bg-slate-900 rounded-full shadow-lg shadow-slate-900/10 z-0" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                            )}
                            <span className="relative z-10 text-base">{s.icon}</span>
                            <span className="relative z-10 hidden sm:inline">{s.label}</span>
                        </motion.button>
                    ))}
                </motion.div>

                {/* Phone + Description — BIG layout */}
                <motion.div variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0.2}
                    className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">

                    {/* Main phone — LARGE, active screen */}
                    <div className="relative flex-shrink-0">
                        {/* Glow behind phone */}
                        <div className="absolute -inset-16 bg-blue-400/[0.06] rounded-full blur-3xl pointer-events-none" />
                        <div className="relative phone-float">
                            <PhoneFrame screenshot={current.screenshot} size="xl">
                                <AnimatePresence mode="wait">
                                    <motion.div key={current.id} initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="h-full">
                                        {current.fallback}
                                    </motion.div>
                                </AnimatePresence>
                            </PhoneFrame>
                        </div>
                    </div>

                    {/* Description panel */}
                    <div className="max-w-md text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-5">
                            <span className="text-lg">{current.icon}</span>
                            <span className="text-sm font-semibold text-blue-600">{current.label} Screen</span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight leading-snug">
                            {current.headline}
                        </h3>

                        <p className="text-base text-slate-500 leading-relaxed mb-8">
                            {current.description}
                        </p>

                        {/* Mini thumbnails of other screens */}
                        <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-3">Other screens</p>
                        <div className="flex gap-3 justify-center lg:justify-start">
                            {screens.map((s, i) => i !== active && (
                                <motion.button key={s.id} onClick={() => setActive(i)}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group flex flex-col items-center gap-1.5 cursor-pointer outline-none">
                                    <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-2xl group-hover:border-blue-300 group-hover:shadow-blue-100 transition-colors">
                                        {s.icon}
                                    </div>
                                    <span className="text-[10px] text-slate-400 group-hover:text-slate-600 transition-colors font-medium">{s.label}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
