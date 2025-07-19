// apps/frontend/src/app/login/page.tsx
import LoginForm from '@/components/LoginForm';

/**
 * Login page container.
 * Renders the LoginForm component.
 */
export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-netflix-light dark:bg-netflix-dark"> {/* Updated background color */}
      <LoginForm />
    </div>
  );
}