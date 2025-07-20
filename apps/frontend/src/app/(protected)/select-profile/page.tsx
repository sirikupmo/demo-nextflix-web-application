// apps/frontend/src/app/(protected)/select-profile/page.tsx
'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { authServiceInstance } from '@/lib/authServiceInstance';
import { FiEdit } from "react-icons/fi";
import SelectProfileList from '@/components/SelectProfileList';
import LoadingSpinner from '@/components/LoadingSpinner';
/**
 * Select Profile page.
 * Displays user's profiles and allows logging out.
 * This is a protected route.
 */
/**
 * Select Profile page.
 * Displays user's profiles and allows logging out.
 * This is a protected route.
 */
export default function SelectProfilePage() {
  const { user, isLoggedIn, isLoading, error } = useAuthStore(); // Added isLoading and error from store
  const router = useRouter();
  const authService = authServiceInstance;

  // Initial authentication check (already in layout, but good to have a fallback/re-check)
  useEffect(() => {
    if (!user && !isLoading && !error) { // Only try to initialize if not already loading and no user/error
      authService.initializeAuth();
    }
  }, [user, isLoading, error, authService]);


  if (isLoading) { // Use isLoading from store
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner message="Loading profiles..."/>
      </div>
    );
  }

  // If not logged in and not loading, redirect to login (handled by ProtectedLayout, but explicit here)
  if (!isLoggedIn || !user) {
    // This should ideally be caught by ProtectedLayout, but as a fallback
    router.replace('/login');
    return null;
  }

  const profiles = user.profiles || [];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 page-container"> {/* Adjusted background/text colors, added page-container */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8"> {/* Adjusted font sizes and weight */}
        Who&rsquo;s Watching?
      </h1>

      {/* Error State */}
      {error && (
        <p className="text-red-500 text-center max-w-xs"> {/* Kept specific red color */}
          {error}
        </p>
      )}

      {/* Success / Empty State */}
      {profiles && profiles.length === 0 ? (
        <p className="mt-6">No profiles found.</p>
      ) : (
        <SelectProfileList profiles={profiles} />
      )}

      <div className="fixed bottom-0 left-0 right-0 flex justify-center text-sm sm:text-base md:text-lg font-bold py-3 sm:py-4">
        <a href="#" className="hover:underline flex items-center">
          <span className="mr-2">Edit</span>
          <FiEdit size={16} />
        </a>
      </div>
    </main>
  );
}