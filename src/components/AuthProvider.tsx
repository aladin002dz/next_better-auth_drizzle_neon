'use client';

import { authClient } from '@/lib/auth-client';
import { SessionProvider } from 'better-auth/react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider client={authClient}>
            {children}
        </SessionProvider>
    );
}
