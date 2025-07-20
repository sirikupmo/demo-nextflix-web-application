// apps/frontend/src/components/LoginForm.tsx
'use client'; // This directive is required for client-side components

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { authServiceInstance } from '@/lib/authServiceInstance';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
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

  const { isLoading, error, isLoggedIn, setError } = useAuthStore();
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
    <div className="rounded-md px-4 py-8 sm:px-10 md:px-14 lg:px-16 w-full mx-auto bg-netflix-light/10 dark:bg-netflix-dark/10 backdrop-blur-sm shadow-xl">
      {/* Logo */}
      <div className="mb-6 sm:mb-8 flex justify-center">
        <Image
          src="/logo-netflix.svg"
          width={40}
          height={20}
          alt="Logo"
          priority
          className="w-8 sm:w-10 md:w-12"
        />
      </div>

      {/* Form */}
      <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          className="bg-gray-100/95 rounded px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] placeholder-[#000000B2]/50"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          className="bg-gray-100/95 rounded px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E50914] placeholder-[#000000B2]/50"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`bg-[#E50914] text-white py-2 sm:py-2.5 md:py-3 rounded mt-2 font-semibold text-sm sm:text-base md:text-lg transition ${isLoading
            ? "bg-[#8A0B12] cursor-not-allowed opacity-90"
            : "hover:brightness-110 hover:scale-[1.02]"
            }`}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-xs sm:text-sm text-center mt-3 sm:mt-4">
          {error}
        </p>
      )}

      <div className="flex justify-end text-xs font-bold mt-3 sm:mt-4">
        <a href="#" className="hover:underline">
          Forgot password?
        </a>
      </div>

      <div className="mt-10 sm:mt-12 text-center text-xs sm:text-sm md:text-sm font-bold">
        Don&rsquo;t have an account?
        <a href="#" className="pl-1 sm:pl-2 text-[#B81D24] hover:underline">
          Create one
        </a>
      </div>
    </div>
  );
}