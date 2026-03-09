'use client';

import { motion, useMotionValue, useTransform } from 'framer-motion';
import WaitlistForm from './WaitlistForm';
import PhoneFrame, { DashboardScreen } from './PhoneFrame';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (d = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: d },
    }),
};

function HeroPhone() {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [4, -4]);
    const rotateY = useTransform(x, [-100, 100], [-6, 6]);

    const handleMouse = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
    };

    return (
        <motion.div
            onMouseMove={handleMouse}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ perspective: 900 }}
            className="flex items-center justify-center"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                transition={{ type: 'spring', stiffness: 80, damping: 12 }}
                className="phone-float"
            >
                <PhoneFrame size="xl" screenshot={null /* '/screenshots/dashboard.png' */}>
                    <DashboardScreen />
                </PhoneFrame>
            </motion.div>
        </motion.div>
    );
}

/* Floating widget cards around the phone — PrettyProgress style */
function FloatingCards() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {/* Card 1 */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute top-[25%] left-0 xl:-left-4 hidden lg:block z-20">
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0 }}
                    className="w-44 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg shadow-slate-200/50 border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center"><span className="text-emerald-600 text-[10px]">↓</span></div>
                        <span className="text-[11px] font-semibold text-slate-700">Bill Reduced</span>
                    </div>
                    <p className="text-2xl font-extrabold text-emerald-600">-5%</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">vs last month</p>
                </motion.div>
            </motion.div>

            {/* Card 2 */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1, duration: 0.8 }}
                className="absolute top-[65%] left-4 xl:left-0 hidden lg:block z-20">
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                    className="w-40 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg shadow-slate-200/50 border border-slate-100">
                    <p className="text-[10px] text-slate-400 mb-1">Peak Usage</p>
                    <p className="text-sm font-bold text-slate-800">7:00 – 9:00 PM</p>
                    <div className="flex gap-0.5 mt-2">
                        {[30, 50, 80, 95, 70, 40, 20].map((h, i) => (
                            <div key={i} className="flex-1 h-5 rounded-sm bg-amber-400" style={{ opacity: h / 100 }} />
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            {/* Card 3 */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9, duration: 0.8 }}
                className="absolute top-[18%] right-2 xl:-right-4 hidden lg:block z-20">
                <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                    className="w-44 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg shadow-slate-200/50 border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center"><span className="text-blue-600 text-[10px]">💰</span></div>
                        <span className="text-[11px] font-semibold text-slate-700">Est. Bill</span>
                    </div>
                    <p className="text-2xl font-extrabold text-slate-900">$124.50</p>
                    <div className="text-[9px] text-rose-500 font-bold tracking-wider mt-1.5">+4%</div>
                </motion.div>
            </motion.div>

            {/* Card 4 */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute top-[55%] right-0 xl:-right-8 hidden lg:block z-20">
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1.5 }}
                    className="w-40 bg-gradient-to-br from-orange-500 to-rose-500 rounded-2xl p-3 shadow-lg shadow-orange-500/20">
                    <p className="text-[10px] text-white/60 mb-0.5">Heat Advisory</p>
                    <p className="text-[11px] font-semibold text-white leading-snug">Expect higher usage due to 95°F heat.</p>
                    <div className="mt-2 flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center"><span className="text-white text-[8px]">☀️</span></div>
                        <span className="text-[9px] text-white/60">Just now</span>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}


export default function HeroSection() {
    return (
        <section id="waitlist" className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden">
            <div className="relative max-w-6xl mx-auto px-6 w-full z-10">
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                    {/* Left — text + form */}
                    <div>
                        <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0}
                            className="text-[2.75rem] sm:text-[3.5rem] lg:text-[3.75rem] font-extrabold leading-[1.08] tracking-tight text-slate-900 mb-5">
                            Stop Overpaying for{' '}
                            <span className="text-blue-600">Electricity.</span>
                        </motion.h1>

                        <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
                            className="text-lg sm:text-xl text-slate-500 leading-relaxed mb-8 max-w-lg">
                            Wattwise analyzes your electricity bills, tracks real-time energy usage,
                            and delivers <em className="text-slate-700 font-medium not-italic">AI-powered insights</em> — so you always decide your "watt wisely".
                        </motion.p>

                        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.2}>
                            <div id="waitlist-form" className="bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/70 shadow-xl shadow-slate-200/30 max-w-md">
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Join the waitlist 💡</h3>
                                <p className="text-sm text-slate-400 mb-5">We&apos;ll notify you the moment we launch. Completely free.</p>
                                <WaitlistForm variant="hero" />
                            </div>
                        </motion.div>

                        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.35}
                            className="mt-6 flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 border-[2.5px] border-white shadow-sm">
                                <span className="text-blue-500 text-sm">✨</span>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">Exclusive Early Access</p>
                                <p className="text-xs text-slate-500">Be among the first to join</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right — phone */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                        className="flex justify-center relative">
                        <HeroPhone />
                        <FloatingCards />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
