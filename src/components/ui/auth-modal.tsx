'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Success message is less relevant now as NextAuth redirects to a dedicated page
  // const [successMessage, setSuccessMessage] = useState<string | null>(null); 
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // setSuccessMessage(null); // Not needed as much
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // login now calls NextAuth's signIn('email', { email, redirect: true })
      // redirect: true (default) will take user to /auth/verify-request page
      await login(email); 
      
      // If signIn doesn't throw an error, NextAuth is handling the redirect.
      // We can close the modal here.
      // No need to set success message as user will be on a new page.
      onClose(); 

    } catch (err: any) {
      console.error("Sign-in error:", err);
      // Check if the error is a NextAuth specific error object
      if (err.message && typeof err.message === 'string' && err.message.includes('NEXT_AUTH_ERROR')) {
        // More specific error handling can be done here based on err.code
        setError('Failed to initiate sign-in. Please try again.');
      } else {
        setError(err.message || 'An error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form state when modal is closed/opened
  // This is important if the modal is kept in the DOM and just hidden/shown
  // If it unmounts, this is less critical but good practice.
  // For AnimatePresence, it might remount.
  // useEffect(() => {
  //   if (!isOpen) {
  //     setEmail('');
  //     setError(null);
  //     setSuccessMessage(null);
  //     setIsSubmitting(false);
  //   }
  // }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              className="w-[90%] max-w-md p-8 rounded-3xl shadow-2xl 
                        bg-gray-900 border border-gray-700/50 
                        dark:bg-black/95 dark:border-gray-800/70 pointer-events-auto" // Slightly adjusted background for better contrast
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white">Welcome to Alvan World</h2>
                <p className="text-gray-300 mt-2">
                  Sign in with your email to continue
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-600 // Darker border
                              bg-gray-800 text-white placeholder-gray-500 // Ensure placeholder is visible
                              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 // Brighter focus
                              transition-all duration-200"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                
                {error && (
                  <div className="text-red-400 text-sm font-medium p-3 bg-red-900/30 rounded-xl border border-red-700/50">
                    {error}
                  </div>
                )}
                
                {/* Success message is removed as we redirect and close modal */}
                {/* {successMessage && (
                  <div className="text-green-400 text-sm font-medium p-3 bg-green-900/20 rounded-xl border border-green-900/30">
                    {successMessage}
                  </div>
                )} */}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700
                            text-white font-semibold tracking-wide transition-all duration-200 flex items-center justify-center // Added flex for spinner
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
                            disabled:opacity-60 disabled:cursor-not-allowed
                            hover:shadow-lg hover:shadow-blue-500/30"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Sign In with Email'
                  )}
                </button>
                
                <div className="text-center text-xs text-gray-500 mt-3"> {/* Smaller text */}
                  We'll send a secure sign-in link to your email. No password needed!
                </div>
              </form>
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 // Adjusted position and colors
                          transition-colors duration-200 rounded-full p-1.5
                          hover:bg-gray-700/50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}