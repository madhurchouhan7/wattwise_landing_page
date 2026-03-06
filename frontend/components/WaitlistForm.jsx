'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WaitlistForm({ variant = 'hero' }) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error | duplicate
    const [message, setMessage] = useState('');

    const isHero = variant === 'hero';

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            if (!email || status === 'loading') return;

            setStatus('loading');

            try {
                const backendUrl =
                    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';

                const res = await fetch(`${backendUrl}/api/waitlist`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, recaptchaToken: 'dev-token' }),
                });

                const data = await res.json();

                if (res.status === 201) {
                    setStatus('success');
                    setMessage(data.message);
                    setEmail('');
                } else if (res.status === 409) {
                    setStatus('duplicate');
                    setMessage(data.error);
                } else {
                    setStatus('error');
                    setMessage(data.error || 'Something went wrong. Please try again.');
                }
            } catch {
                setStatus('error');
                setMessage('Network error. Please check your connection and try again.');
            }
        },
        [email, status]
    );

    const inputRing =
        status === 'error' || status === 'duplicate'
            ? 'ring-2 ring-red-300'
            : status === 'success'
                ? 'ring-2 ring-emerald-400'
                : 'ring-1 ring-slate-200 focus-within:ring-2 focus-within:ring-blue-400';

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {status === 'success' ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className={`flex items-center gap-3 px-5 py-4 rounded-2xl bg-emerald-50 border border-emerald-200 ${isHero ? 'max-w-lg' : 'max-w-md mx-auto'
                            }`}
                    >
                        <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-semibold text-emerald-800 text-sm">You&apos;re on the list! 🎉</p>
                            <p className="text-emerald-600 text-xs mt-0.5">{message}</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`flex flex-col sm:flex-row gap-3 ${isHero ? 'max-w-lg' : 'max-w-md mx-auto'}`}
                    >
                        <div className={`flex-1 flex items-center rounded-2xl bg-white px-4 py-1 transition-all ${inputRing}`}>
                            <svg className="w-4 h-4 text-slate-400 flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <input
                                id={isHero ? 'waitlist-email-hero' : 'waitlist-email-cta'}
                                type="email"
                                required
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); if (status !== 'idle') setStatus('idle'); }}
                                placeholder="Enter your email address"
                                className="flex-1 py-3 bg-transparent text-slate-900 placeholder-slate-400 text-sm outline-none"
                                disabled={status === 'loading'}
                                aria-label="Email address for waitlist"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="btn-glow px-6 py-3 text-sm font-semibold rounded-2xl whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {status === 'loading' ? (
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    <span>Joining...</span>
                                </span>
                            ) : (
                                <span>Join the Waitlist →</span>
                            )}
                        </button>
                    </motion.form>
                )}
            </AnimatePresence>

            {/* Error / duplicate message */}
            <AnimatePresence>
                {(status === 'error' || status === 'duplicate') && (
                    <motion.p
                        key="error-msg"
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`mt-2 text-xs text-red-500 ${isHero ? '' : 'text-center'}`}
                    >
                        {message}
                    </motion.p>
                )}
            </AnimatePresence>

            {/* Privacy note */}
            {status !== 'success' && (
                <p className={`mt-2.5 text-xs text-slate-400 ${isHero ? '' : 'text-center'}`}>
                    🔒 No spam, ever. We respect your privacy.
                </p>
            )}
        </div>
    );
}
