'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Page-level error:', error);
  }, [error]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 p-4">
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 max-w-md text-center">
        <h2 className="text-xl font-semibold text-red-300 mb-3">Something went wrong</h2>
        <p className="text-gray-300 mb-4">
          The application encountered an unexpected error. Please try again.
        </p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg"
        >
          Try again
        </button>
      </div>
    </div>
  );
} 