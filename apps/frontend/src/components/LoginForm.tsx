// apps/frontend/src/components/LoginForm.tsx
'use client'; // This directive is required for client-side components

import React, { useState } from 'react';
import { AuthService } from '@/domain/auth.service';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/**
 * LoginForm component.
 * Handles user input, displays loading/error states, and redirects on success.
 */
export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const authService = new AuthService(); // Instantiate AuthService

  // Get states and actions from Zustand store
  const { isLoading, error, isLoggedIn, user, setError } = useAuthStore();
  const router = useRouter();

  // Redirect if already logged in (this component should ideally not be rendered if already logged in,
  // but this is a fallback for immediate redirect after successful login within the same page)
  React.useEffect(() => {
    if (isLoggedIn) {
      router.push('/'); // Redirect to home page or dashboard
    }
  }, [isLoggedIn, router]);

  /**
   * Handles the form submission for login.
   * Prevents default form behavior and calls the AuthService.
   * @param e - The form event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic client-side validation (backend will do more robust validation)
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    await authService.login({ email, password });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">Login to Nextflix</h1>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center text-blue-500 mb-4">
          <p>Loading...</p>
          {/* You can add a spinner here */}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {/* Success State (briefly shown before redirect) */}
      {isLoggedIn && user && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Welcome, {user.email}! Redirecting...</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <Link href="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Register?
          </Link>
        </div>
      </form>
    </div>
  );
}