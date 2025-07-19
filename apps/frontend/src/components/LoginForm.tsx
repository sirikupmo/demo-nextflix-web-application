// apps/frontend/src/components/LoginForm.tsx
'use client'; // This directive is required for client-side components

import { useEffect, useState } from 'react';
import { authServiceInstance } from '@/lib/authServiceInstance';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
/**
 * LoginForm component.
 * Handles user input, displays loading/error states, and redirects on success.
 */
/**
 * LoginForm component.
 * Handles user input, displays loading/error states, and redirects on success.
 */
export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const authService = authServiceInstance;

  const { isLoading, error, isLoggedIn, user, setError } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/select-profile');
    }
  }, [isLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    await authService.login({ email, password });
  };

  if (isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-netflix-light dark:bg-netflix-dark">
        <p className="text-lg text-netflix-light-text dark:text-netflix-dark-text">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8 bg-netflix-light dark:bg-netflix-dark"> {/* Responsive padding */}
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg p-6 sm:p-8 rounded-lg shadow-xl
                  transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale
                  bg-netflix-light-dark text-netflix-light-text dark:bg-netflix-dark-light dark:text-netflix-dark-text"> {/* Responsive max-width, padding, and Netflix theme colors */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-netflix-light-text dark:text-netflix-dark-text">Login to Nextflix</h1> {/* Responsive font size */}

        {isLoading && (
          <div className="text-center text-blue-500 mb-4">
            <p>Loading...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4
                          dark:bg-red-900 dark:border-red-700 dark:text-red-300">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {isLoggedIn && user && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4
                          dark:bg-green-900 dark:border-green-700 dark:text-green-300">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Welcome, {user.email}! Redirecting...</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm sm:text-base font-bold mb-2 text-netflix-light-text dark:text-netflix-dark-text">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-netflix-light-text leading-tight focus:outline-none focus:shadow-outline
                         bg-white dark:bg-gray-700 border-netflix-light-border dark:border-netflix-dark-border dark:text-netflix-dark-text" // Netflix theme for inputs
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm sm:text-base font-bold mb-2 text-netflix-light-text dark:text-netflix-dark-text">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-netflix-light-text mb-3 leading-tight focus:outline-none focus:shadow-outline
                         bg-white dark:bg-gray-700 border-netflix-light-border dark:border-netflix-dark-border dark:text-netflix-dark-text" // Netflix theme for inputs
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4"> {/* Responsive flex */}
            <button
              type="submit"
              className="w-full sm:w-auto bg-netflix-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50
                         transition-all duration-200 ease-in-out hover:scale-105" // Netflix red button
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <Link href="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800
                                            transition-all duration-200 ease-in-out hover:scale-105 dark:text-blue-400 dark:hover:text-blue-600">
              Register?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}