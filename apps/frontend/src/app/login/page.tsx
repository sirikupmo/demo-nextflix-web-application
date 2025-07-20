// apps/frontend/src/app/login/page.tsx
import LoginForm from '@/components/LoginForm';
import Image from 'next/image';
/**
 * Login page container.
 * Renders the LoginForm component.
 */
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-netflix-light dark:bg-netflix-dark">
      <Image
        src="/bg-netflix.jpg"
        alt="background"
        fill
        priority
        className="object-cover opacity-60"
      />
      <div className="absolute inset-0" />

      <div className="relative z-10 w-full max-w-md px-4 sm:px-6 md:px-8 lg:px-10">
        <LoginForm />
      </div>
    </main>
  );
}