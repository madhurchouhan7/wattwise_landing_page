'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WaitlistForm({ variant = 'hero' }) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            if (!email || status === 'loading') return;
            setStatus('loading');
            try {
                const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';
                const res = await fetch(`${backendUrl}/api/waitlist`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, recaptchaToken: 'dev-token' }),
                });
                const data = await res.json();
                if (res.status === 201) { setStatus('success'); setMessage(data.message); setEmail(''); }
                else if (res.status === 409) { setStatus('duplicate'); setMessage(data.error); }
                else { setStatus('error'); setMessage(data.error || 'Something went wrong.'); }
            } catch {
                setStatus('error');
                setMessage('Network error. Please check your connection.');
            }
        },
        [email, status]
    );

    const isError = status === 'error' || status === 'duplicate';
    const isDark = variant === 'cta';

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {status === 'success' ? (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        className={`flex items-center gap-3 px-5 py-4 rounded-2xl ${isDark ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'}`}>
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
                            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <p className={`font-semibold text-sm ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>You&apos;re on the list! 🎉</p>
                            <p className={`text-xs mt-0.5 ${isDark ? 'text-emerald-400/60' : 'text-emerald-600/70'}`}>{message}</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex flex-col gap-3">
                        <div className={`flex items-center rounded-xl px-4 transition-colors duration-200 ${isDark
                            ? `bg-white/10 border ${isError ? 'border-red-400' : 'border-white/10 focus-within:border-white/30'}`
                            : `bg-white border ${isError ? 'border-red-400' : 'border-slate-200 focus-within:border-blue-400'}`
                            }`}>
                            <svg className={`w-4 h-4 flex-shrink-0 mr-3 ${isDark ? 'text-white/30' : 'text-slate-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                            <input id={variant === 'hero' ? 'waitlist-email-hero' : 'waitlist-email-cta'}
                                type="email" required value={email}
                                onChange={(e) => { setEmail(e.target.value); if (status !== 'idle') setStatus('idle'); }}
                                placeholder="Enter your email address"
                                className={`flex-1 py-3.5 bg-transparent text-sm outline-none ${isDark ? 'text-white placeholder-white/30' : 'text-slate-900 placeholder-slate-400'}`}
                                disabled={status === 'loading'}
                                aria-label="Email address for waitlist"
                            />
                        </div>
                        <motion.button
                            type="submit"
                            disabled={status === 'loading'}
                            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.98 }}
                            className={`group w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${isDark
                                ? 'bg-white text-slate-900 hover:bg-slate-100'
                                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/10'
                                }`}>
                            {status === 'loading' ? (
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    <span>Joining...</span>
                                </span>
                            ) : (
                                <span>Get Early Access <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span></span>
                            )}
                        </motion.button>
                    </motion.form>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isError && (
                    <motion.p key="error-msg" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className={`mt-2 text-xs ${isDark ? 'text-red-300' : 'text-red-500'}`}>
                        {message}
                    </motion.p>
                )}
            </AnimatePresence>

            {status !== 'success' && (
                <p className={`mt-3 text-xs ${isDark ? 'text-white/30' : 'text-slate-400'}`}>
                    🔒 No spam, ever. We respect your privacy.
                </p>
            )}
        </div>
    );
}
