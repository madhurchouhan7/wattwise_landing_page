'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';

// Initialize PostHog
if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || 'your-posthog-key-here', {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
        capture_pageview: false // Disable automatic pageview capture, as we capture manually in Next.js/React Router
    });
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Manually capture initial pageview
        posthog.capture('$pageview');
    }, []);

    return <PHProvider client={posthog}>{children}</PHProvider>;
}
