import { useEffect } from 'react';

/**
 * A hook that disables the Next.js error overlay in development mode.
 * This is useful when you want to handle errors yourself without the overlay appearing.
 */
export function useDisableNextJsErrorOverlay() {
  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV === 'development') {
      // Store the original console.error
      const originalConsoleError = console.error;
      
      // Override console.error to filter out specific React errors
      console.error = (...args: unknown[]) => {
        // Check if this is a React error that would trigger the overlay
        const isReactRefreshError = args.some(arg => 
          typeof arg === 'string' && 
          (arg.includes('React RefreshRuntime') || 
           arg.includes('Uncaught Error: API request failed') ||
           arg.includes('Error: API request failed'))
        );
        
        // If it's not a React error that would trigger the overlay, log it normally
        if (!isReactRefreshError) {
          originalConsoleError(...args);
        }
      };
      
      // Restore the original console.error when the component unmounts
      return () => {
        console.error = originalConsoleError;
      };
    }
  }, []);
} 