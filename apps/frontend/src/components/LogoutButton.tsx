// apps/frontend/src/components/LogoutButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { authServiceInstance } from '@/lib/authServiceInstance';

export default function LogoutButton() {
    const router = useRouter();
    const authService = authServiceInstance;
    const handleLogout = async () => { // Made async to await backend logout
        await authService.logout(); // Call backend logout
        router.push('/login'); // Redirect to login page after logout
    };

    return (
        <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm"
        >
            Logout
        </button>
    );
}
