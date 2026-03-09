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
                    <div className="h-full w-full overflow-y-auto no-scrollbar" style={{ borderRadius: 'inherit' }}>
                        {!screenshot && (
                            /* Status bar — solid bg, no backdrop-blur to avoid sharp edges at rounded corners */
                            <div className="flex items-center justify-between px-5 sticky top-0 bg-white z-10"
                                style={{ paddingTop: s.notchH + 6, paddingBottom: 4, borderRadius: `${s.frame - 3}px ${s.frame - 3}px 0 0` }}>
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
                            /* Real PNG screenshot */
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

const stagger = { visible: { transition: { staggerChildren: 0.08 } } };
const fadeIn = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } };
const scaleIn = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } };
const slideIn = { hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } };

/** 1. Home Dashboard — matches "Home Dashboard.png" */
export function DashboardScreen() {
    return (
        <motion.div initial="hidden" animate="visible" variants={stagger} className="px-5 pb-10 pt-2">
            {/* Header */}
            <motion.div variants={fadeIn} className="flex justify-between items-center mb-6">
                <div>
                    <div className="flex items-center gap-1.5 mb-1"><span className="text-blue-500 text-[9px]">📍</span><span className="text-slate-500 text-[10px] font-medium">San Francisco</span></div>
                    <p className="text-slate-900 font-extrabold text-[18px] tracking-tight">Hello, Sarah</p>
                </div>
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0">
                    <img src="https://i.pravatar.cc/100?img=5" alt="" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                </div>
            </motion.div>
            {/* Stat Cards */}
            <motion.div variants={fadeIn} className="grid grid-cols-2 gap-3 mb-6">
                <div className="rounded-2xl bg-white border border-slate-100 p-3.5 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                        <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[14px]">🧾</div>
                        <span className="text-[8px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-md">↑ 4%</span>
                    </div>
                    <p className="text-[9px] text-slate-400 font-medium mb-0.5">Est. Current Bill</p>
                    <p className="text-slate-900 font-extrabold text-[18px] tracking-tight">$124.50</p>
                </div>
                <div className="rounded-2xl bg-white border border-slate-100 p-3.5 shadow-sm">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-[14px] mb-3">✅</div>
                    <p className="text-[9px] text-slate-400 font-medium mb-0.5">Last Paid</p>
                    <p className="text-slate-900 font-extrabold text-[18px] tracking-tight">$112.00</p>
                    <p className="text-[8px] text-slate-300 mt-0.5">Paid on May 1st</p>
                </div>
            </motion.div>
            {/* Active Plan */}
            <motion.div variants={scaleIn} className="mb-6">
                <div className="flex items-center gap-2 mb-2.5"><p className="text-slate-800 font-bold text-[12px]">Active Plan</p><div className="w-2 h-2 bg-emerald-500 rounded-full" /></div>
                <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 p-5 shadow-lg shadow-blue-500/25">
                    <div className="flex justify-between items-start mb-1">
                        <div><p className="text-white font-bold text-[15px]">AC Cooling Plan</p><p className="text-blue-200 text-[10px]">Tier 2 Usage</p></div>
                        <span className="px-2.5 py-1 rounded-full bg-white/20 text-white text-[9px] font-semibold backdrop-blur-sm">Active</span>
                    </div>
                    <div className="flex justify-between items-end mt-5 mb-1.5"><p className="text-white/70 text-[10px]">Usage</p><p className="text-white text-[10px] font-semibold">650 / 800 kWh</p></div>
                    <div className="h-2 bg-black/20 rounded-full mb-5 overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: '81%' }} transition={{ duration: 1.2, delay: 0.3 }} className="h-full bg-white rounded-full" /></div>
                    <button className="w-full py-2.5 bg-white rounded-xl text-blue-600 font-bold text-[12px] flex items-center justify-center gap-1.5 shadow-sm">Quick Check-in <span>→</span></button>
                </div>
            </motion.div>
            {/* Action Items */}
            <motion.div variants={fadeIn} className="mb-6">
                <p className="text-slate-800 font-bold text-[12px] mb-2.5">Action Items</p>
                <div className="rounded-2xl bg-orange-50 border border-orange-100 p-3.5 flex gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-white shadow-sm flex items-center justify-center text-[16px] flex-shrink-0">☀️</div>
                    <div><p className="text-slate-800 font-bold text-[11px] mb-0.5">High Heat Advisory</p><p className="text-slate-500 text-[9px] leading-relaxed">Expect higher usage today due to temperatures reaching 95°F.</p></div>
                </div>
                <button className="w-full py-3 rounded-xl border border-slate-200 border-dashed text-slate-500 text-[11px] font-semibold flex items-center justify-center gap-1.5">
                    <span className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-[12px] leading-none">+</span> Log New Meter Reading
                </button>
            </motion.div>
            {/* Recent Activity */}
            <motion.div variants={fadeIn}>
                <div className="flex justify-between items-center mb-3"><p className="text-slate-800 font-bold text-[13px]">Recent Activity</p><span className="text-blue-600 text-[10px] font-bold">View All</span></div>
                {[{ title: 'April Bill', sub: 'Due Apr 30', amount: '$112.00', status: 'Paid', sc: 'text-emerald-600 bg-emerald-50', icon: '📄', ibg: 'bg-blue-50' },
                { title: 'March Bill', sub: 'Due Mar 30', amount: '$108.50', status: 'Paid', sc: 'text-emerald-600 bg-emerald-50', icon: '📋', ibg: 'bg-blue-50' },
                { title: 'Service Fee', sub: 'Mar 15', amount: '$4.00', status: 'Posted', sc: 'text-slate-500 bg-slate-100', icon: '🔧', ibg: 'bg-slate-50' }
                ].map((r, i) => (
                    <motion.div variants={slideIn} key={i} className="bg-white border border-slate-100 rounded-2xl p-3 flex items-center gap-3 mb-2.5 shadow-sm">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[16px] ${r.ibg}`}>{r.icon}</div>
                        <div className="flex-1"><p className="font-bold text-slate-900 text-[11px]">{r.title}</p><p className="text-[9px] text-slate-400">{r.sub}</p></div>
                        <div className="text-right"><p className="font-bold text-slate-900 text-[11px]">{r.amount}</p><span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${r.sc}`}>{r.status}</span></div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}

/** 2. Bills History — matches "Bills History and Management.png" */
export function BillAnalysisScreen() {
    return (
        <motion.div initial="hidden" animate="visible" variants={stagger} className="px-5 pb-10 pt-2">
            <motion.div variants={fadeIn} className="flex justify-between items-center mb-5">
                <div><h2 className="text-slate-900 font-extrabold text-[20px] tracking-tight">Your Bills</h2><p className="text-slate-500 text-[10px]">Utility Overview</p></div>
                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 text-[14px]">⚙️</div>
            </motion.div>
            {/* Current Cycle */}
            <motion.div variants={scaleIn} className="bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100/60 rounded-2xl p-5 mb-7 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5"><div className="w-2 h-2 bg-emerald-500 rounded-full" /><p className="text-blue-600 font-extrabold text-[9px] tracking-widest uppercase">CURRENT CYCLE</p></div>
                        <p className="text-[30px] font-extrabold text-slate-900 leading-none mb-1 tracking-tight">$84.50</p>
                        <p className="text-slate-500 text-[11px] font-medium">Projected Bill</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm border border-blue-100 flex items-center justify-center text-blue-500 text-[18px]">⚡</div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-5 mb-4">
                    <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-50"><p className="text-slate-400 text-[9px] mb-0.5">Usage</p><p className="text-slate-900 font-bold text-[14px]">450 <span className="text-slate-400 font-medium text-[10px]">kWh</span></p></div>
                    <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-50"><p className="text-slate-400 text-[9px] mb-0.5">Remaining</p><p className="text-slate-900 font-bold text-[14px]">12 <span className="text-slate-400 font-medium text-[10px]">Days</span></p></div>
                </div>
                <a href="#" className="font-bold text-blue-600 text-[11px] flex items-center gap-1">See breakdown <span className="inline-block transition-transform group-hover:translate-x-1">→</span></a>
            </motion.div>
            {/* History */}
            <motion.div variants={fadeIn} className="flex justify-between items-center mb-3.5">
                <h3 className="text-slate-900 font-bold text-[16px]">History</h3>
                <div className="bg-slate-50 text-slate-500 text-[9px] font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1 border border-slate-200">Last 6 months <span className="text-[8px]">⌄</span></div>
            </motion.div>
            {[{ m: 'July 2023', kwh: '520', d: '16.7', p: '$98.20', badge: '↘5%', bc: 'text-emerald-600 bg-emerald-50', icon: '☀️', ibg: 'bg-orange-50' },
            { m: 'June 2023', kwh: '480', d: '16.0', p: '$92.15', badge: '0%', bc: 'text-slate-400 bg-slate-100', icon: '💧', ibg: 'bg-blue-50' },
            { m: 'May 2023', kwh: '455', d: '14.6', p: '$88.40', badge: '↗2%', bc: 'text-rose-500 bg-rose-50', icon: '☁️', ibg: 'bg-purple-50' }
            ].map((r, i) => (
                <motion.div variants={slideIn} key={i} className="bg-white border border-slate-100 shadow-sm rounded-2xl p-3.5 flex items-center gap-3 mb-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-[20px] ${r.ibg}`}>{r.icon}</div>
                    <div className="flex-1"><p className="font-bold text-slate-900 text-[12px]">{r.m}</p><p className="text-[9px] text-slate-400 mt-0.5">{r.kwh} kWh · {r.d} / day</p></div>
                    <div className="text-right"><p className="font-bold text-slate-900 text-[13px]">{r.p}</p><span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold mt-0.5 ${r.bc}`}>{r.badge}</span></div>
                </motion.div>
            ))}
            <motion.div variants={fadeIn} className="flex justify-center mt-4">
                <button className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-md shadow-blue-500/20">+ Add Bill</button>
            </motion.div>
        </motion.div>
    );
}

/** 3. Plan Management — matches "Plan Management Dashboard.png" */
export function AlertsScreen() {
    return (
        <motion.div initial="hidden" animate="visible" variants={stagger} className="px-5 pb-10 pt-2">
            <motion.div variants={fadeIn} className="flex justify-between items-center mb-5">
                <div><p className="text-slate-500 font-medium text-[10px]">Plan Overview</p><p className="text-slate-900 font-extrabold text-[20px] tracking-tight">Active Plan</p></div>
                <div className="flex items-center gap-2.5"><span className="text-slate-600 text-[16px]">🔔</span><img src="https://i.pravatar.cc/100?img=11" alt="" className="w-9 h-9 rounded-full border-2 border-white shadow-sm" /></div>
            </motion.div>
            {/* Blue Plan Card */}
            <motion.div variants={scaleIn} className="rounded-3xl bg-gradient-to-b from-blue-600 to-blue-500 p-5 shadow-xl shadow-blue-500/30 mb-6 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
                <div className="flex justify-between items-start mb-5 relative z-10">
                    <div className="flex gap-3"><div className="w-10 h-10 bg-white/15 rounded-xl backdrop-blur-sm flex items-center justify-center text-[18px]">❄️</div>
                        <div><p className="text-white font-bold text-[17px] leading-tight">Summer<br />Cooling</p><p className="text-blue-200 text-[9px] mt-1">Active since June 1</p></div>
                    </div>
                    <div className="bg-white/15 backdrop-blur-sm rounded-lg px-2.5 py-1.5 text-center"><p className="text-white/80 text-[8px]">Priority</p><p className="text-white font-bold text-[10px]">High</p></div>
                </div>
                <div className="flex justify-center my-5 relative z-10">
                    <div className="relative w-[140px] h-[140px] flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90 absolute"><circle cx="70" cy="70" r="58" stroke="rgba(255,255,255,0.15)" strokeWidth="14" fill="none" /><motion.circle initial={{ strokeDashoffset: 364 }} animate={{ strokeDashoffset: 364 - (364 * 0.85) }} transition={{ duration: 1.5, ease: "easeOut" }} cx="70" cy="70" r="58" stroke="white" strokeWidth="14" fill="none" strokeDasharray="364" strokeLinecap="round" /></svg>
                        <div className="text-center"><p className="text-white font-extrabold text-[32px] leading-none mb-1">85%</p><p className="text-white/70 text-[8px] font-bold tracking-[0.2em] uppercase">Adherence</p></div>
                    </div>
                </div>
                <button className="w-full bg-white text-blue-600 py-3 rounded-2xl font-bold text-[12px] flex items-center justify-center gap-2 shadow-sm mt-2">✓ Quick Check-in</button>
            </motion.div>
            {/* Progress + Savings */}
            <motion.div variants={fadeIn} className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white border border-slate-100 rounded-2xl p-3.5 shadow-sm">
                    <div className="flex items-center gap-1.5 mb-2"><p className="text-slate-500 font-bold text-[8px] tracking-widest uppercase">Progress</p><span className="bg-emerald-100 text-emerald-700 text-[7px] font-bold px-1.5 py-0.5 rounded-md">ON TRACK</span></div>
                    <p className="text-[22px] font-extrabold text-slate-900 leading-none mb-0.5">14<span className="text-slate-400 text-[13px] font-semibold">/30</span></p>
                    <p className="text-slate-400 text-[9px] mb-3">Days Followed</p>
                    <div className="h-2 bg-slate-100 rounded-full"><motion.div initial={{ width: 0 }} animate={{ width: '46%' }} transition={{ duration: 1 }} className="h-full bg-emerald-500 rounded-full" /></div>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-3.5 shadow-sm">
                    <div className="flex justify-between items-center mb-2"><p className="text-slate-500 font-bold text-[8px] tracking-widest uppercase">Savings</p><span className="text-blue-500 text-[12px]">💰</span></div>
                    <p className="text-[22px] font-extrabold text-slate-900 leading-none mb-0.5">$24.00</p>
                    <p className="text-slate-400 text-[9px] mb-2">Estimated this cycle</p>
                    <span className="inline-block bg-emerald-50 text-emerald-600 text-[8px] font-bold px-1.5 py-0.5 rounded">↗ +12% vs last month</span>
                </div>
            </motion.div>
            {/* Daily Actions */}
            <motion.div variants={fadeIn}>
                <div className="flex justify-between items-center mb-3"><h3 className="text-slate-900 font-bold text-[14px]">Daily Actions</h3><span className="text-blue-600 text-[10px] font-bold">Manage</span></div>
                {[{ t: 'Set AC to 26°C', s: 'Daily · 9:00 AM - 6:00 PM', icon: '🌡️', on: true, ic: 'bg-blue-50' },
                { t: 'Limit Geyser to 15 mins', s: 'Daily · Evening Only', icon: '🔥', on: false, ic: 'bg-orange-50' },
                { t: 'Unplug Standby Devices', s: 'Nightly · Before Bed', icon: '🔌', on: false, ic: 'bg-purple-50' }
                ].map((a, i) => (
                    <motion.div variants={slideIn} key={i} className="bg-white border border-slate-100 rounded-2xl p-3.5 mb-2.5 flex items-center gap-3 shadow-sm">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-[14px] ${a.ic}`}>{a.icon}</div>
                        <div className="flex-1"><p className="text-slate-900 font-bold text-[11px] mb-0.5">{a.t}</p><p className="text-slate-400 text-[9px]">{a.s}</p></div>
                        <div className={`w-10 h-[22px] rounded-full relative transition-colors ${a.on ? 'bg-blue-600' : 'bg-slate-200'}`}><div className={`absolute top-[3px] w-[16px] h-[16px] bg-white rounded-full shadow-sm transition-all ${a.on ? 'left-[21px]' : 'left-[3px]'}`} /></div>
                    </motion.div>
                ))}
            </motion.div>
            {/* Previous Plans */}
            <motion.div variants={fadeIn} className="mt-6">
                <div className="flex justify-between items-center mb-3"><h3 className="text-slate-900 font-bold text-[14px]">Previous Plans</h3><span className="text-blue-600 text-[10px] font-bold">View All</span></div>
                {[{ t: 'Winter Heating', d: 'Ended Mar 30', a: '92%', icon: '🔥', ibg: 'bg-orange-50 text-orange-500' },
                { t: 'Spring Baseline', d: 'Ended May 30', a: '78%', icon: '⚡', ibg: 'bg-blue-50 text-blue-500' }
                ].map((p, i) => (
                    <motion.div variants={slideIn} key={i} className="bg-white border border-slate-100 rounded-2xl p-3.5 mb-2.5 flex items-center gap-3 shadow-sm">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-[14px] ${p.ibg}`}>{p.icon}</div>
                        <div className="flex-1"><p className="text-slate-900 font-bold text-[11px]">{p.t}</p><p className="text-slate-400 text-[9px]">{p.d} · <span className="text-emerald-600 font-bold">{p.a} Adherence</span></p></div>
                        <span className="text-slate-300 text-[14px]">›</span>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}

/** 4. Plan Context — matches "Plan Context Gathering.png" */
export function ApplianceScreen() {
    return (
        <motion.div initial="hidden" animate="visible" variants={stagger} className="px-5 pb-8 pt-4">
            {/* Step Header */}
            <motion.div variants={fadeIn} className="flex items-center mb-4">
                <span className="text-slate-400 text-[20px] cursor-pointer mr-4">←</span>
                <div className="flex-1 text-center"><span className="text-blue-600 font-bold text-[11px]">Step 3</span><span className="text-slate-400 text-[11px]"> of 3</span></div>
                <div className="w-6" />
            </motion.div>
            <motion.div variants={scaleIn} className="h-1 bg-slate-100 rounded-full w-full mb-8 overflow-hidden">
                <motion.div initial={{ width: '66%' }} animate={{ width: '100%' }} transition={{ duration: 0.8 }} className="h-full bg-blue-600 rounded-full" />
            </motion.div>
            {/* Title */}
            <motion.div variants={fadeIn} className="mb-6">
                <h2 className="text-slate-900 font-extrabold text-[26px] leading-tight tracking-tight mb-3">Your Energy Plan<br />is Ready</h2>
                <p className="text-slate-500 text-[12px] leading-relaxed">Based on your usage patterns and goals, we&apos;ve generated a personalized savings strategy.</p>
            </motion.div>
            {/* Plan Card */}
            <motion.div variants={scaleIn} className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-3xl p-6 mb-7 shadow-xl shadow-blue-500/25 text-white relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-white/8 rounded-full blur-2xl" />
                <div className="flex justify-between items-start mb-5 relative z-10">
                    <div><h3 className="font-extrabold text-[17px] mb-1">Summer Efficiency Plan</h3><div className="flex items-center gap-1.5 text-[10px] text-blue-200"><span>📅</span>May 01 - Jul 31</div></div>
                    <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-[14px]">⚡</div>
                </div>
                <div className="mb-6 relative z-10">
                    <p className="text-blue-200 text-[8px] font-bold tracking-[0.15em] uppercase mb-1.5">TARGET SAVINGS</p>
                    <p className="font-extrabold text-[36px] leading-none tracking-tight">₹1,500<span className="text-[13px] font-normal text-blue-200 ml-1">/mo</span></p>
                </div>
                <div className="bg-black/15 backdrop-blur-sm rounded-xl p-3.5 flex items-center gap-2.5 relative z-10">
                    <span className="text-[14px]">💡</span><p className="text-[10px] font-medium">Focusing on Cooling Optimization</p>
                </div>
            </motion.div>
            {/* Action Highlights */}
            <motion.div variants={fadeIn} className="mb-8">
                <h3 className="text-slate-900 font-extrabold text-[10px] tracking-[0.15em] uppercase mb-5">ACTION HIGHLIGHTS</h3>
                {[{ icon: '❄️', title: 'Optimize AC Usage', desc: 'Keep AC at 26°C during peak hours to reduce load.', bg: 'bg-blue-50' },
                { icon: '⏱️', title: 'Shift Heavy Loads', desc: 'Shift geyser usage to non-peak times (early morning).', bg: 'bg-orange-50' },
                { icon: '🧊', title: 'Efficient Cooling', desc: 'Optimize fridge settings to medium cool.', bg: 'bg-emerald-50' }
                ].map((item, i) => (
                    <motion.div variants={slideIn} key={i} className="flex gap-3.5 mb-5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-[14px] ${item.bg}`}>{item.icon}</div>
                        <div><p className="text-slate-900 font-bold text-[12px] mb-1">{item.title}</p><p className="text-slate-500 text-[10px] leading-relaxed">{item.desc}</p></div>
                    </motion.div>
                ))}
            </motion.div>
            {/* Buttons */}
            <motion.div variants={fadeIn} className="space-y-2.5">
                <button className="w-full bg-blue-600 text-white rounded-2xl py-4 font-bold text-[13px] flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">⚡ Activate Plan</button>
                <button className="w-full bg-slate-100 text-slate-700 rounded-2xl py-4 font-bold text-[13px]">Customize Plan</button>
            </motion.div>
        </motion.div>
    );
}

/** 5. Insights — matches "Insights and Analytics Dashboard.png" */
export function InsightsScreen() {
    return (
        <motion.div initial="hidden" animate="visible" variants={stagger} className="px-5 pb-10 pt-2">
            <motion.div variants={fadeIn} className="flex justify-between items-center mb-5">
                <h2 className="text-slate-900 font-extrabold text-[22px] tracking-tight">Insights</h2>
                <div className="flex items-center gap-2.5">
                    <div className="bg-white border border-slate-200 text-slate-600 text-[10px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">Sep 2023 <span className="text-[8px]">⌄</span></div>
                    <div className="text-blue-600 text-[16px]">📤</div>
                </div>
            </motion.div>
            {/* Efficiency Score */}
            <motion.div variants={scaleIn} className="bg-gradient-to-br from-[#f8faff] to-[#edf2ff] rounded-3xl p-5 border border-blue-100/80 mb-5 shadow-sm relative overflow-hidden">
                <p className="text-slate-500 font-extrabold text-[9px] tracking-[0.15em] uppercase mb-2">EFFICIENCY SCORE</p>
                <div className="flex justify-between items-end mb-4">
                    <div className="flex items-baseline gap-1"><p className="text-blue-600 font-extrabold text-[48px] leading-none tracking-tight">82</p><p className="text-slate-400 font-medium text-[16px]">/100</p></div>
                    <div className="flex items-end gap-1.5 mb-2">
                        {[{ h: 14, c: 'bg-blue-200' }, { h: 20, c: 'bg-blue-300' }, { h: 16, c: 'bg-blue-300' }, { h: 28, c: 'bg-blue-600' }, { h: 22, c: 'bg-blue-400' }].map((b, i) => (
                            <motion.div key={i} initial={{ height: 0 }} animate={{ height: b.h }} transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }} className={`w-3 ${b.c} rounded-t-sm`} />
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-600 border-t border-blue-100/50 pt-3"><span className="text-emerald-500 text-[12px]">↗</span>Better than <span className="font-bold text-slate-800">65%</span> of similar homes</div>
            </motion.div>
            {/* Daily Intensity */}
            <motion.div variants={fadeIn} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm mb-5">
                <div className="flex justify-between items-center mb-4"><h3 className="text-slate-900 font-bold text-[14px]">Daily Intensity</h3><div className="bg-slate-50 text-slate-400 text-[8px] font-bold px-2.5 py-1 rounded-lg border border-slate-100">Last 30 Days</div></div>
                <div className="grid grid-cols-7 gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <div key={d} className="text-slate-400 text-[8px] text-center font-bold mb-1.5">{d}</div>)}
                    {[...Array(14)].map((_, i) => (
                        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }} key={i} className={`h-9 rounded-md flex items-center justify-center text-white text-[8px] font-bold ${[4, 12].includes(i) ? 'bg-blue-600' : [2, 3, 9].includes(i) ? 'bg-blue-400' : [1, 10, 13].includes(i) ? 'bg-blue-200' : 'bg-blue-50'}`}>
                            {[4, 12].includes(i) && 'HI'}
                        </motion.div>
                    ))}
                </div>
                <div className="flex justify-end items-center gap-1.5 mt-3"><span className="text-[8px] text-slate-400 font-medium mr-1">Less</span>{['bg-blue-50', 'bg-blue-200', 'bg-blue-400', 'bg-blue-600'].map((c, i) => <div key={i} className={`w-2.5 h-2.5 rounded-sm ${c}`} />)}<span className="text-[8px] text-slate-400 font-medium ml-1">More</span></div>
            </motion.div>
            {/* Appliance Breakdown */}
            <motion.div variants={fadeIn} className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm">
                <div className="flex justify-between items-center mb-5"><h3 className="text-slate-900 font-bold text-[14px]">Appliance Breakdown</h3><span className="text-blue-600 text-[10px] font-bold">Full Report →</span></div>
                <div className="flex items-center gap-6 mb-5">
                    <div className="relative w-24 h-24 flex-shrink-0">
                        <svg className="w-full h-full transform -rotate-90"><circle cx="48" cy="48" r="38" stroke="#e0e7ff" strokeWidth="12" fill="none" /><motion.circle initial={{ strokeDashoffset: 239 }} animate={{ strokeDashoffset: 239 - (239 * 0.4) }} transition={{ duration: 1, delay: 0.3 }} cx="48" cy="48" r="38" stroke="#2563eb" strokeWidth="14" fill="none" strokeDasharray="239" strokeLinecap="round" /></svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-slate-400 text-[8px] font-medium mb-0.5">Top</span><span className="text-slate-900 font-extrabold text-[16px]">AC</span></div>
                    </div>
                    <div className="flex-1 space-y-3">
                        {[{ label: 'AC', pct: '40%', c: 'bg-blue-600' }, { label: 'Fridge', pct: '20%', c: 'bg-blue-300' }, { label: 'Other', pct: '40%', c: 'bg-slate-200' }].map(r => (
                            <div key={r.label} className="flex items-center justify-between"><div className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full ${r.c}`} /><span className="text-slate-600 font-medium text-[11px]">{r.label}</span></div><span className="font-extrabold text-slate-900 text-[12px]">{r.pct}</span></div>
                        ))}
                    </div>
                </div>
                <div className="bg-orange-50/60 border border-orange-100 rounded-xl p-3.5 flex gap-3">
                    <span className="text-orange-500 text-[14px] flex-shrink-0 mt-0.5">💡</span>
                    <div><p className="text-slate-600 text-[10px] leading-relaxed mb-1.5">Your AC usage is 12% higher than average. Older models consume more power.</p><a href="#" className="text-blue-600 font-bold text-[10px]">Check Upgrade Options?</a></div>
                </div>
            </motion.div>
        </motion.div>
    );
}

