import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

export const metadata = {
    title: 'Wattwise — Take Control of Your Power. Effortlessly.',
    description:
        'Wattwise is the smart energy tracking & electricity bill analysis app. Join the waitlist for early access.',
    keywords: ['energy tracking', 'electricity bill', 'smart energy', 'wattwise'],
    openGraph: {
        title: 'Wattwise — Take Control of Your Power. Effortlessly.',
        description:
            'Smart energy tracking & electricity bill analysis. Join the waitlist.',
        type: 'website',
        url: 'https://wattwise.app',
    },
};

export default function RootLayout({ children }) {
    const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    return (
        <html lang="en" className={inter.variable}>
            <head>
                {GA_ID && (
                    <>
                        <Script
                            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
                            strategy="afterInteractive"
                        />
                        <Script id="google-analytics" strategy="afterInteractive">
                            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
                        </Script>
                    </>
                )}
            </head>
            <body className="bg-white text-slate-900 antialiased">{children}</body>
        </html>
    );
}
