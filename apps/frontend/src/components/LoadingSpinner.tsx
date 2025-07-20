// apps/frontend/src/components/LoadingSpinner.tsx
/**
 * LoadingSpinner component.
 * Displays a spinning animation using Tailwind CSS.
 * @param message - Optional message to display below the spinner.
 */
interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className="flex justify-center items-center py-8 flex-col space-y-2">
      {/* Tailwind CSS Spinner */}
      <div className="w-8 h-8 border-4 border-t-4 border-netflix-red border-t-transparent rounded-full animate-spin"></div>
      <span className="text-netflix-dark-secondary text-lg">{message}</span>
    </div>
  );
}
