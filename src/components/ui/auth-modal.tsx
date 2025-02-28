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
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await login(email);
      
      if (success) {
        setSuccessMessage('Magic link sent! Check your email to log in.');
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setError('Failed to send magic link. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                        bg-black/80 backdrop-blur-md border border-gray-800
                        dark:bg-black/90 pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white">Welcome to Alvan World</h2>
                <p className="text-gray-300 mt-2">
                  Sign in with your email to continue your journey
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
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-700
                              bg-gray-800/50 text-white placeholder-gray-400
                              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                              transition-all duration-200"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                
                {error && (
                  <div className="text-red-400 text-sm font-medium p-3 bg-red-900/20 rounded-xl border border-red-900/30">
                    {error}
                  </div>
                )}
                
                {successMessage && (
                  <div className="text-green-400 text-sm font-medium p-3 bg-green-900/20 rounded-xl border border-green-900/30">
                    {successMessage}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700
                            text-white font-medium transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                            disabled:opacity-50 disabled:cursor-not-allowed
                            hover:shadow-lg hover:shadow-blue-600/20"
                >
                  {isSubmitting ? 'Sending Magic Link...' : 'Sign In with Magic Link'}
                </button>
                
                <div className="text-center text-sm text-gray-400 mt-4">
                  No password needed! We'll send you a magic link to your email.
                </div>
              </form>
              
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-gray-400 hover:text-white
                          transition-colors duration-200 rounded-full p-1
                          hover:bg-gray-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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