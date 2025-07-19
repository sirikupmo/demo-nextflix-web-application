import { redirect } from 'next/navigation';

export default function Home() {
  // return null;
  // redirect('/select-profile');
  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 md:p-8"> {/* Background and text color set by global CSS */}
      <div className="text-center w-full max-w-sm sm:max-w-md lg:max-w-lg p-6 sm:p-8 rounded-lg shadow-xl
                  transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale
                  bg-netflix-light-dark dark:bg-netflix-dark-light"> {/* Background for card, text color inherited */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Welcome to Nextflix!</h1> {/* Text color inherited */}
        <p className="text-base sm:text-lg mb-8 text-netflix-light-secondary dark:text-netflix-dark-secondary">Please login to continue.</p> {/* This is a secondary color, so it remains */}
        <a href="/login" className="inline-block bg-netflix-red hover:bg-red-700 text-white font-bold py-2 px-4 rounded
                                    transition-all duration-200 ease-in-out hover:scale-105">
          Go to Login
        </a>
      </div>
    </div>
  );
}