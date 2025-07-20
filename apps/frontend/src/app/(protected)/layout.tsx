// apps/frontend/src/app/(protected)/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authServiceInstance } from '@/lib/authServiceInstance';
import { useAuthStore } from '@/store/authStore';
import DropdownMenu from '@/components/DropdownMenu';
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

  // New local state to track if the initial auth check has completed
  // This prevents the flicker by ensuring we wait for the first auth check
  const [isInitialAuthCheckCompleted, setIsInitialAuthCheckCompleted] = useState(false);

  useEffect(() => {
    const performInitialAuthCheck = async () => {
      console.log('ProtectedLayout useEffect: Starting initial auth check...');
      await authService.initializeAuth(); // This will update isLoading and isLoggedIn in the store
      setIsInitialAuthCheckCompleted(true); // Mark the local check as complete
      console.log('ProtectedLayout useEffect: Initial auth check finished.');
    };

    // Only run this effect once on component mount
    if (!isInitialAuthCheckCompleted) { // Use this local state to ensure it only runs once
      performInitialAuthCheck();
    }
  }, [isInitialAuthCheckCompleted, authService]); // Added authService to dependencies

  // This useEffect handles redirection AFTER the initial check has completed
  // (or if auth state changes later).
  useEffect(() => {
    console.log('ProtectedLayout useEffect [isInitialAuthCheckCompleted, isLoading, isLoggedIn]: isInitialAuthCheckCompleted:', isInitialAuthCheckCompleted, 'isLoading:', isLoading, 'isLoggedIn:', isLoggedIn);
    // Only redirect if the initial check is complete AND not currently loading from store AND not logged in
    if (isInitialAuthCheckCompleted && !isLoading && !isLoggedIn) {
      console.log('ProtectedLayout: Auth check complete and not logged in. Redirecting to /login.');
      router.replace('/login');
    }
  }, [isInitialAuthCheckCompleted, isLoading, isLoggedIn, router]);

  // Show a loading state while authentication is being checked
  // This covers the initial load until `isInitialAuthCheckCompleted` is true.
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
    <div className="absolute top-2 right-2 z-50 p-2 sm:p-2">
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