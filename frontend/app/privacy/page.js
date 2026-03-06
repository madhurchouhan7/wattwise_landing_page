export const metadata = {
    title: 'Privacy Policy — Wattwise',
    description: 'How Wattwise handles and protects your personal data.',
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white pt-24 pb-20">
            <div className="max-w-3xl mx-auto px-6">
                <div className="mb-10">
                    <a href="/" className="text-blue-600 text-sm hover:underline">← Back to Wattwise</a>
                </div>

                <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Privacy Policy</h1>
                <p className="text-slate-500 text-sm mb-10">Last updated: March 2026</p>

                <div className="prose prose-slate max-w-none">
                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">1. Information We Collect</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        When you join the Wattwise waitlist, we collect only your email address. We may also
                        log your IP address and browser user agent for security and spam prevention purposes.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">2. How We Use Your Information</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        Your email will be used exclusively to notify you about the Wattwise beta launch and
                        product updates. We will never sell, rent, or share your email address with any third
                        parties for marketing purposes.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">3. Data Security</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        We take data security seriously. Your information is stored securely on encrypted
                        servers and is accessible only to the Wattwise team.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">4. Unsubscribe</h2>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        You can request removal from the waitlist at any time by emailing us at{' '}
                        <a href="mailto:hello@wattwise.app" className="text-blue-600 hover:underline">hello@wattwise.app</a>.
                    </p>

                    <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">5. Contact</h2>
                    <p className="text-slate-600 leading-relaxed">
                        For any privacy-related questions, contact us at{' '}
                        <a href="mailto:hello@wattwise.app" className="text-blue-600 hover:underline">hello@wattwise.app</a>.
                    </p>
                </div>
            </div>
        </main>
    );
}
