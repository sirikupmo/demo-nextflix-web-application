// apps/frontend/src/app/(protected)/select-profile/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';
import { AuthService } from '@/domain/auth.service';
import { useRouter } from 'next/navigation';

/**
 * Select Profile page.
 * Displays user's profiles and allows logging out.
 * This is a protected route.
 */
export default function SelectProfilePage() {
  // Access profiles through the user object
  const { user } = useAuthStore(); // Only need to destructure `user` now
  const router = useRouter();
  const authService = new AuthService();

  const handleLogout = () => {
    authService.logout();
    router.push('/login'); // Redirect to login page after logout
  };

  // Empty State: If user or profiles are not loaded yet
  // Check user first, then user.profiles
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Checking authentication...</p>
      </div>
    );
  }

  // Access profiles from user object
  const profiles = user.profiles;

  // Success State: Display user and profiles
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome, {user.email}!</h1>
        {/* Removed display of user.roles as it's no longer part of UserDto */}
        <h2 className="text-xl font-semibold mb-4">Your Profiles:</h2>

        {/* Empty State for profiles */}
        {/* Check if profiles array exists and is empty */}
        {profiles && profiles.length === 0 && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">You don&apos;t have any profiles yet.</span> {/* Fixed unescaped apostrophe */}
          </div>
        )}

        {/* List of Profiles */}
        {/* Check if profiles array exists and has items */}
        {profiles && profiles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {profiles.map((profile) => (
              <div key={profile.id} className="bg-blue-50 p-4 rounded-lg shadow-sm flex items-center space-x-4">
                {/* <Image // Changed <img> to <Image>
                  src={profile.avatarUrl}
                  alt={profile.name}
                  width={64} // Specify a width
                  height={64} // Specify a height
                  className="rounded-full object-cover"
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x100/CCCCCC/000000?text=NA'; }} // Fallback for Image component
                /> */}
                <img src={profile.avatarUrl} alt={profile.name} className="w-16 h-16 rounded-full object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x100/CCCCCC/000000?text=NA'; }}/>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{profile.name}</h3>
                  <p className="text-sm text-gray-600">ID: {profile.id}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}