// apps/frontend/src/app/(protected)/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authServiceInstance } from '@/lib/authServiceInstance';
import { useSessionKeepAlive } from '@/lib/useSessionKeepAlive';
import { useAuthStore } from '@/store/authStore';
import DropdownMenu from '@/components/DropdownMenu';
import SearchInput from '@/components/SearchInput';
/**
 * Protected layout for routes that require authentication.
 * Checks authentication status and redirects to login if not authenticated.
 */
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isLoggedIn, isLoading, error } = useAuthStore();
  const authService = authServiceInstance;
  const [isInitialAuthCheckCompleted, setIsInitialAuthCheckCompleted] = useState(false);

  useSessionKeepAlive(isLoggedIn);
  useEffect(() => {
    const performInitialAuthCheck = async () => {
      await authService.initializeAuth(); // This will update isLoading and isLoggedIn in the store
      setIsInitialAuthCheckCompleted(true); // Mark the local check as complete
    };

    // Only run this effect once on component mount
    if (!isInitialAuthCheckCompleted) { // Use this local state to ensure it only runs once
      performInitialAuthCheck();
    }
  }, [isInitialAuthCheckCompleted, authService]); // Added authService to dependencies

  useEffect(() => {
    if (isInitialAuthCheckCompleted && !isLoading && !isLoggedIn) {
      router.replace('/login');
    }
  }, [isInitialAuthCheckCompleted, isLoading, isLoggedIn, router]);

  if (!isInitialAuthCheckCompleted || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Checking authentication...</p>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Display error if any during check */}
      </div>
    );
  }

  // If initial auth check is complete AND logged in, render the children
  if (isLoggedIn) {
    return <>
      <div className="absolute top-2 right-2 z-50 p-2 sm:p-2 flex items-center gap-2">
        <SearchInput />
        <DropdownMenu />
      </div>
      {children}
    </>;
  }

  // Fallback: This case should ideally be handled by the redirect above.
  // If we reach here, it means isInitialAuthCheckCompleted is true, isLoading is false, and isLoggedIn is false.
  // The useEffect for redirection should have already triggered.
  return null;
}