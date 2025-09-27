'use client';

import { authClient } from '@/lib/auth-client';
import { useSession } from 'better-auth/react';

export default function UserProfile() {
    const { data: session } = useSession();

    const handleSignOut = async () => {
        try {
            await authClient.signOut();
            window.location.href = '/login';
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    if (!session) {
        return null;
    }

    const userInitial = session.user.name?.charAt(0).toUpperCase() || 'U';

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">{userInitial}</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                        <p className="text-xs text-gray-500">{session.user.email}</p>
                    </div>
                </div>
                <button
                    onClick={handleSignOut}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}
