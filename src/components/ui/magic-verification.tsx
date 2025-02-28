'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * This component enhances the Magic SDK verification experience
 * by adding custom styling and animations to the verification page.
 * It should be included in your layout or page component.
 */
export function MagicVerification() {
  useEffect(() => {
    // Function to apply custom styling to Magic SDK elements
    const customizeMagicUI = () => {
      // Check if we're on a Magic verification page
      const isMagicVerificationPage = 
        document.querySelector('div[data-magic-dialog]') || 
        document.querySelector('.magic-iframe');
      
      if (isMagicVerificationPage) {
        // Add a custom class to the body for additional styling
        document.body.classList.add('magic-verification-page');
        
        // Find the Magic container and add custom classes
        const magicContainer = document.querySelector('div[data-magic-overlay]');
        if (magicContainer) {
          magicContainer.classList.add('custom-magic-container');
        }
        
        // Find the Magic dialog and add custom animation
        const magicDialog = document.querySelector('div[data-magic-dialog]');
        if (magicDialog) {
          magicDialog.classList.add('custom-magic-dialog');
        }
      }
    };

    // Run immediately
    customizeMagicUI();
    
    // Also set up a mutation observer to catch dynamically added Magic elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        customizeMagicUI();
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => {
      observer.disconnect();
      document.body.classList.remove('magic-verification-page');
    };
  }, []);

  return null; // This component doesn't render anything visible
}

/**
 * This component provides a custom UI for the Magic verification page
 * It can be used on a dedicated verification page if needed
 */
export function CustomMagicVerificationUI() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900/90 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
        className="w-[90%] max-w-md p-8 rounded-3xl shadow-2xl 
                  bg-gray-850 border border-gray-800
                  dark:bg-black/90"
      >
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 mb-4 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" opacity="0.1"/>
              <path d="M12.0004 3C7.03685 3 3.00195 7.03733 3.00195 12.0026C3.00195 16.9679 7.03685 21.0052 12.0004 21.0052C16.9639 21.0052 20.9988 16.9679 20.9988 12.0026C20.9988 7.03733 16.9639 3 12.0004 3ZM16.2407 9.50088L11.5521 15.9904C11.4459 16.1384 11.2894 16.2525 11.1073 16.3178C10.9252 16.383 10.7271 16.3967 10.5368 16.3573C10.3465 16.3179 10.1729 16.2269 10.0382 16.0952C9.90339 15.9635 9.81356 15.7967 9.78125 15.6172L8.75291 10.9371C8.71289 10.7145 8.75756 10.4851 8.87882 10.2905C9.00008 10.0959 9.18965 9.94808 9.41224 9.87079C9.63483 9.7935 9.87773 9.79181 10.1015 9.86598C10.3252 9.94015 10.5168 10.0851 10.6407 10.2778L12.9166 14.0348L15.5292 9.50088C15.5983 9.38957 15.6903 9.29294 15.7993 9.21757C15.9084 9.1422 16.0322 9.08978 16.1629 9.06337C16.2936 9.03696 16.4284 9.03709 16.559 9.06376C16.6896 9.09043 16.8133 9.1431 16.9222 9.21869C17.031 9.29428 17.1228 9.39111 17.1916 9.50257C17.2604 9.61403 17.3047 9.73941 17.3217 9.87011C17.3387 10.0008 17.3281 10.1339 17.2906 10.2599C17.253 10.386 17.1894 10.5022 17.1035 10.6015L16.2407 9.50088Z" fill="currentColor"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white">Check your email</h2>
          <p className="text-gray-300 mt-2">
            We've sent you a magic link to verify your email address
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700">
            <p className="text-gray-300 text-sm">
              Please check your inbox and click the link we sent you to sign in. 
              If you don't see it, check your spam folder.
            </p>
          </div>
          
          <div className="text-center text-sm text-gray-400 mt-4">
            <p>Secured by Magic</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 