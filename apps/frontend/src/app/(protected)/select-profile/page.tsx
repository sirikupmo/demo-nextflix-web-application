// apps/frontend/src/app/(protected)/select-profile/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';
import { AuthService } from '@/domain/auth.service';
import { useRouter } from 'next/navigation';
import { useSessionKeepAlive } from '@/lib/useSessionKeepAlive';

/**
 * Select Profile page.
 * Displays user's profiles and allows logging out.
 * This is a protected route.
 */
export default function SelectProfilePage() {
  // Access profiles through the user object
  const { user, isLoggedIn } = useAuthStore(); // Only need to destructure `user` now
  const router = useRouter();
  const authService = new AuthService();
  const [isUserActive, setIsUserActive] = useState(false);
  useSessionKeepAlive(isLoggedIn && isUserActive);

  const handleLogout = async () => { // Made async to await backend logout
    await authService.logout(); // Call backend logout
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
    <div className="min-h-screen p-4 sm:p-8 bg-netflix-light dark:bg-netflix-dark"> {/* Responsive padding and Netflix theme */}
      <div className="bg-netflix-light-dark p-6 sm:p-8 rounded-lg shadow-xl max-w-2xl mx-auto
                  transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale
                  dark:bg-netflix-dark-light dark:text-netflix-dark-text"> {/* Responsive padding, max-width, and Netflix theme colors */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-netflix-light-text dark:text-netflix-dark-text">Welcome, {user.email}!</h1> {/* Responsive font size */}
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-netflix-light-text dark:text-netflix-dark-text">Your Profiles:</h2> {/* Responsive font size */}

        <div className="mb-4 text-center">
          <button
            onClick={() => setIsUserActive(!isUserActive)}
            className={`px-4 py-2 rounded-md text-white
                         ${isUserActive ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'}
                         transition-all duration-200 ease-in-out hover:scale-105`}
          >
            {isUserActive ? 'User Active (Pinging)' : 'User Inactive (No Pings)'}
          </button>
        </div>

        {profiles && profiles.length === 0 && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4
                          dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-300">
            <span className="block sm:inline">You don&apos;t have any profiles yet.</span>
          </div>
        )}

        {profiles && profiles.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6"> {/* Responsive gap */}
            {profiles.map((profile) => (
              <div key={profile.id} className="bg-netflix-light-dark p-4 sm:p-6 rounded-lg shadow-sm flex flex-col items-center space-y-2 sm:space-y-4
                                          transform transition-all duration-200 ease-in-out hover:scale-105 cursor-pointer
                                          dark:bg-netflix-dark dark:text-netflix-dark-text dark:shadow-md"> {/* Responsive padding, flex direction, spacing, and Netflix theme colors */}
                {/* <Image
                  src={profile.avatarUrl}
                  alt={profile.name}
                  width={80} // Increased size for better visibility
                  height={80}
                  className="rounded-full object-cover w-16 h-16 sm:w-20 sm:h-20" // Responsive image size
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x100/CCCCCC/000000?text=NA'; }}
                /> */}
                <img src={profile.avatarUrl} alt={profile.name} className="w-16 h-16 rounded-full object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/100x100/CCCCCC/000000?text=NA'; }} />
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-medium text-netflix-light-text dark:text-netflix-dark-text">{profile.name}</h3> {/* Responsive font size */}
                  <p className="text-sm sm:text-base text-netflix-light-secondary dark:text-netflix-dark-secondary">ID: {profile.id}</p> {/* Responsive font size */}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-6"> {/* Responsive margin-top */}
          <button
            onClick={handleLogout}
            className="bg-netflix-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
                       transition-all duration-200 ease-in-out hover:scale-105" // Netflix red button
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}