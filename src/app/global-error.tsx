'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global app error:', error);
  }, [error]);

  return (
    <html>
      <body className="bg-gray-900">
        <div className="flex items-center justify-center h-screen p-4">
          <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 max-w-md text-center">
            <h2 className="text-xl font-semibold text-red-300 mb-3">Application Error</h2>
            <p className="text-gray-300 mb-4">
              The application encountered a critical error. Please refresh the page to try again.
            </p>
            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
} 