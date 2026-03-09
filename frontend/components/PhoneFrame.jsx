'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * Reusable phone mockup frame.
 *
 * Two modes:
 *   1) <PhoneFrame screenshot="/screenshots/dashboard.png" /> — uses a real PNG image
 *   2) <PhoneFrame>{children}</PhoneFrame> — uses CSS-rendered fallback content
 *
 * Props:
 *   screenshot – path to a PNG screenshot (e.g. "/screenshots/dashboard.png")
 *   size       – "sm" | "md" | "lg" | "xl" (default: "lg")
 *   label      – optional label shown below the phone
 *   className  – extra wrapper classes
 */

const sizes = {
    sm: { w: 200, h: 410, frame: 34, notchW: 72, notchH: 18, border: 3, indicator: 48 },
    md: { w: 260, h: 530, frame: 40, notchW: 88, notchH: 22, border: 3, indicator: 56 },
    lg: { w: 300, h: 612, frame: 44, notchW: 96, notchH: 24, border: 3, indicator: 60 },
    xl: { w: 340, h: 694, frame: 48, notchW: 104, notchH: 26, border: 4, indicator: 64 },
};

export default function PhoneFrame({ children, screenshot, size = 'lg', label = '', className = '' }) {
    const s = sizes[size] || sizes.lg;

    return (
        <div className={`flex flex-col items-center ${className}`}>
            <div
                className="relative bg-slate-900 shadow-2xl shadow-slate-900/25 overflow-hidden"
                style={{
                    width: s.w,
                    height: s.h,
                    borderRadius: s.frame,
                    border: `${s.border}px solid #334155`,
                }}
            >
                {/* Notch */}
                <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 bg-slate-900 rounded-b-2xl z-20"
                    style={{ width: s.notchW, height: s.notchH }}
                />

                {/* Screen area */}
                <div
                    className="absolute overflow-hidden bg-white"
                    style={{
                        inset: s.border,
                        borderRadius: s.frame - 3,
                    }}
                >
                    <div className="h-full w-full overflow-y-auto no-scrollbar">
                        {!screenshot && (
                            /* Status bar for CSS mockups (hidden if providing a real screenshot) */
                            <div className="flex items-center justify-between px-5 sticky top-0 bg-white/90 backdrop-blur-sm z-10"
                                style={{ paddingTop: s.notchH + 6, paddingBottom: 4 }}>
                                <span className="text-slate-900 text-[10px] font-semibold">9:41</span>
                                <div className="flex gap-0.5 items-center">
                                    <svg className="w-3 h-3 text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
                                    <div className="h-2.5 w-[18px] border border-slate-400 rounded-[3px] relative ml-0.5">
                                        <div className="absolute inset-[1.5px] right-[3px] bg-slate-500 rounded-[1px]" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {screenshot ? (
                            /* Real PNG screenshot — Now fully scrollable! */
                            <img
                                src={screenshot}
                                alt={label || 'App screenshot'}
                                className="w-full h-auto block"
                            />
                        ) : (
                            /* CSS fallback content */
                            children
                        )}
                    </div>
                </div>

                {/* Home indicator */}
                <div
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 h-[4px] bg-white/20 rounded-full z-20"
                    style={{ width: s.indicator }}
                />
            </div>
            {label && (
                <p className="mt-4 text-sm font-semibold text-slate-600 text-center">{label}</p>
            )}
        </div>
    );
}

/* ─────────────── Pre-built Screen Mockups (fallbacks) ─────────────── */

/** Dashboard / Home Screen */
export function DashboardScreen() {
    return (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="px-4 pb-8">
            <motion.div variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="flex items-center justify-between mb-4">
                <div><p className="text-slate-400 text-[10px]">Hello, Madhur 👋</p><p className="text-slate-900 font-bold text-[12px]">Your Energy Dashboard</p></div>
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center"><span className="text-white text-[9px] font-bold">M</span></div>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }} className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 p-4 mb-3">
                <p className="text-white/50 text-[9px]">This Month&apos;s Usage</p>
                <div className="flex items-end gap-1"><span className="text-white font-extrabold text-[24px] leading-none">284</span><span className="text-white/50 text-[10px] mb-0.5">kWh</span></div>
                <div className="mt-1.5 flex items-center gap-1.5"><div className="w-4 h-4 rounded-full bg-emerald-400/20 flex items-center justify-center"><svg className="w-2.5 h-2.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg></div><span className="text-emerald-300 text-[9px]">18% less than last month</span></div>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="grid grid-cols-2 gap-2 mb-3">
                {[{ label: 'Est. Bill', val: '₹1,240', icon: '💰' }, { label: 'Peak Hour', val: '7–9 PM', icon: '⏰' }].map((s) => (<div key={s.label} className="rounded-xl bg-slate-50 border border-slate-100 p-3"><div className="flex items-center gap-1.5 mb-1"><span className="text-[10px]">{s.icon}</span><p className="text-slate-400 text-[9px]">{s.label}</p></div><p className="text-slate-900 font-bold text-[12px]">{s.val}</p></div>))}
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="rounded-xl bg-slate-50 border border-slate-100 p-3 mb-3">
                <p className="text-slate-400 text-[9px] mb-2 font-medium">7-Day Trend</p>
                <div className="flex items-end gap-[4px] h-12">{[55, 70, 45, 80, 65, 90, 60].map((h, i) => (<motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }} key={i} className="flex-1 rounded-sm bg-blue-500" style={{ opacity: 0.3 + i * 0.1 }} />))}</div>
                <div className="flex justify-between mt-1.5">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i} className="text-[7px] text-slate-300 font-medium flex-1 text-center">{d}</span>)}</div>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="rounded-xl bg-blue-50 border border-blue-100 p-3">
                <div className="flex items-center gap-1.5 mb-1"><span className="text-[10px]">💡</span><p className="text-[10px] font-bold text-blue-700">AI Insight</p></div>
                <p className="text-[9px] text-blue-600 leading-snug">Your AC uses 42% of total energy. Switching to eco mode after 10 PM could save ₹180/month.</p>
            </motion.div>
        </motion.div>
    );
}

/** Bill Analysis Screen */
export function BillAnalysisScreen() {
    return (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="px-4 pb-8">
            <motion.p variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="text-slate-900 font-bold text-[12px] mb-4">📄 Bill Analysis</motion.p>
            <motion.div variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="rounded-xl bg-emerald-50 border border-emerald-100 p-3 mb-3">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-emerald-700">March 2026</span>
                    <span className="text-[8px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold">Analyzed ✓</span>
                </div>
                <p className="text-[24px] font-extrabold text-slate-900 leading-none">₹1,240</p>
                <p className="text-[9px] text-emerald-600 mt-1">↓ 18% less than February</p>
            </motion.div>
            <motion.p variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="text-[9px] text-slate-400 font-semibold uppercase mb-2 tracking-wider">Breakdown</motion.p>

            {[
                { label: 'Energy Charges', val: '₹820', pct: 66, color: 'bg-blue-500' },
                { label: 'Fixed Charges', val: '₹180', pct: 15, color: 'bg-indigo-400' },
                { label: 'Taxes & Duties', val: '₹160', pct: 13, color: 'bg-violet-400' },
                { label: 'Surcharges', val: '₹80', pct: 6, color: 'bg-slate-400' },
            ].map((r) => (
                <motion.div variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }} key={r.label} className="mb-3">
                    <div className="flex justify-between mb-1"><span className="text-[9px] text-slate-500">{r.label}</span><span className="text-[9px] font-bold text-slate-700">{r.val}</span></div>
                    <div className="h-2 bg-slate-100 rounded-full"><motion.div initial={{ width: 0 }} animate={{ width: `${r.pct}%` }} transition={{ duration: 0.8, ease: "easeOut" }} className={`h-2 ${r.color} rounded-full`} /></div>
                </motion.div>
            ))}
            <motion.div variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="rounded-xl bg-amber-50 border border-amber-100 p-3 mt-3">
                <p className="text-[9px] text-amber-700 font-bold mb-0.5">⚠️ Unusual charge detected</p>
                <p className="text-[8px] text-amber-600 leading-snug">Your surcharge increased 40% this month. Tap to learn why.</p>
            </motion.div>
        </motion.div>
    );
}

/** Smart Alerts Screen */
export function AlertsScreen() {
    return (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="px-4 pb-8">
            <motion.p variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="text-slate-900 font-bold text-[12px] mb-4">🔔 Smart Alerts</motion.p>
            {[
                { time: '2m ago', title: 'Spike Detected', desc: 'AC unit consuming 3x above normal.', color: 'bg-red-50 border-red-100', icon: '⚡' },
                { time: '1h ago', title: 'Budget Warning', desc: 'Bill on track to exceed ₹2,000.', color: 'bg-amber-50 border-amber-100', icon: '💰' },
                { time: '3h ago', title: 'Peak Hours Starting', desc: 'Peak pricing begins at 7 PM.', color: 'bg-blue-50 border-blue-100', icon: '🕐' },
                { time: 'Yesterday', title: 'Great Job!', desc: 'You used 12% less energy than average.', color: 'bg-emerald-50 border-emerald-100', icon: '🎉' },
                { time: '2d ago', title: 'Fridge Alert', desc: 'Refrigerator running inefficiently.', color: 'bg-orange-50 border-orange-100', icon: '❄️' },
            ].map((a, i) => (
                <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }} key={i} className={`rounded-xl ${a.color} border p-3 mb-2.5 flex items-start gap-2.5`}>
                    <div className="w-8 h-8 rounded-lg bg-white/60 flex items-center justify-center flex-shrink-0">
                        <span className="text-[13px]">{a.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                            <p className="text-[10px] font-bold text-slate-800">{a.title}</p>
                            <span className="text-[7px] text-slate-400">{a.time}</span>
                        </div>
                        <p className="text-[9px] text-slate-500 leading-snug">{a.desc}</p>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}

/** Appliance Breakdown Screen */
export function ApplianceScreen() {
    return (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="px-4 pb-8">
            <motion.p variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="text-slate-900 font-bold text-[12px] mb-4">🔌 Appliances</motion.p>
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }} className="flex items-center justify-center mb-4">
                <div className="relative w-28 h-28">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="36 52" strokeLinecap="round" />
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="18 70" strokeDashoffset="-36" strokeLinecap="round" />
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="14 74" strokeDashoffset="-54" strokeLinecap="round" />
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="10 78" strokeDashoffset="-68" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-[15px] font-extrabold text-slate-900 leading-none">₹1,240</p>
                        <p className="text-[8px] text-slate-400">total/month</p>
                    </div>
                </div>
            </motion.div>
            {[
                { name: 'Air Conditioning', cost: '₹496', pct: '40%', color: 'bg-blue-500', icon: '❄️' },
                { name: 'Kitchen Appliances', cost: '₹248', pct: '20%', color: 'bg-violet-500', icon: '🍳' },
                { name: 'Water Heater', cost: '₹186', pct: '15%', color: 'bg-amber-500', icon: '🚿' },
                { name: 'Lighting', cost: '₹124', pct: '10%', color: 'bg-emerald-500', icon: '💡' },
                { name: 'Other Devices', cost: '₹186', pct: '15%', color: 'bg-slate-400', icon: '🔌' },
            ].map((a) => (
                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} key={a.name} className="flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0"><span className="text-[12px]">{a.icon}</span></div>
                    <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-semibold text-slate-700">{a.name}</p>
                        <div className="h-1.5 bg-slate-100 rounded-full mt-1"><motion.div initial={{ width: 0 }} animate={{ width: a.pct }} transition={{ duration: 0.8, delay: 0.5 }} className={`h-1.5 ${a.color} rounded-full`} /></div>
                    </div>
                    <div className="text-right flex-shrink-0">
                        <p className="text-[10px] font-bold text-slate-800">{a.cost}</p>
                        <p className="text-[8px] text-slate-400">{a.pct}</p>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}

/** Insights / AI Recommendations Screen */
export function InsightsScreen() {
    return (
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="px-4 pb-8">
            <motion.p variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="text-slate-900 font-bold text-[12px] mb-4">🧠 AI Insights</motion.p>
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }} className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-4 mb-4">
                <p className="text-white/60 text-[9px] mb-1">Your Savings Potential</p>
                <p className="text-white font-extrabold text-[22px] leading-none">₹2,160<span className="text-white/50 text-[10px] font-normal">/year</span></p>
                <div className="flex items-center gap-2 mt-2.5">
                    <div className="flex-1 h-2 bg-white/20 rounded-full"><motion.div initial={{ width: 0 }} animate={{ width: "60%" }} transition={{ duration: 0.8, delay: 0.4 }} className="h-2 bg-emerald-400 rounded-full w-3/5" /></div>
                    <span className="text-white/60 text-[9px]">60%</span>
                </div>
            </motion.div>
            <motion.p variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="text-[9px] text-slate-400 font-semibold uppercase mb-3 tracking-wider">Recommendations</motion.p>
            {[
                { title: 'Switch AC to eco mode after 10 PM', saving: '₹180/mo', effort: 'Easy', color: 'bg-emerald-50 border-emerald-100' },
                { title: 'Run washing machine during off-peak', saving: '₹60/mo', effort: 'Easy', color: 'bg-blue-50 border-blue-100' },
                { title: 'Replace old fridge (10+ years)', saving: '₹120/mo', effort: 'Medium', color: 'bg-amber-50 border-amber-100' },
            ].map((r, i) => (
                <motion.div variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} key={i} className={`rounded-xl ${r.color} border p-3 mb-2.5`}>
                    <p className="text-[10px] font-bold text-slate-800 mb-1.5">{r.title}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-[8px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold">Save {r.saving}</span>
                        <span className="text-[8px] text-slate-400">Effort: {r.effort}</span>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
