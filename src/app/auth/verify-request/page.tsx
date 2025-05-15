'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react'; // Added for countdown

export default function VerifyRequestPage() {
  const [countdown, setCountdown] = useState(5); // Countdown for redirect (optional)

  // Optional: Automatically redirect to home after a few seconds
  // useEffect(() => {
  //   if (countdown === 0) {
  //     // Consider redirecting to where the user was trying to go, if known,
  //     // or to their dashboard/chat page if that's more appropriate than home.
  //     // window.location.href = '/'; // Simple redirect for now
  //     return;
  //   }
  //   const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
  //   return () => clearTimeout(timer);
  // }, [countdown]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-gray-950 p-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
        className="w-full max-w-lg p-8 sm:p-12 rounded-2xl shadow-xl 
                  bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 
                  border border-gray-700/50 text-center"
      >
        {/* Animated Icon */}
        <motion.div 
          className="mx-auto w-20 h-20 mb-8 text-blue-500"
          initial={{ scale: 0.5, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 10, stiffness: 150, delay: 0.3 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="drop-shadow-lg">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.882-.41-1.9.055-2.317 1.002l-.06.176-.064.195-.052.165-.044.142-.037.123-.03.099a.75.75 0 01-1.44.299l.03-.1-.03.1c-.19-.603.033-1.25.51-1.664A3.001 3.001 0 0112 6.75c1.159 0 2.203.618 2.74 1.593.537.974.297 2.159-.57 2.838l-3.22 2.321c-.67.483-.603 1.48.15 1.85l.06.03.051.022.054.021.059.02.064.018.07.015.075.012.08.01.085.007.09.005.095.003.1.001h.105c.095 0 .19-.002.28-.008l.09-.006.085-.007.08-.01.075-.012.07-.015.064-.018.059-.02.054-.021.051-.022.06-.03c.753-.37 1.023-1.367.15-1.85L13.628 9.917z" clipRule="evenodd" />
            <path d="M12.0004 3C7.03685 3 3.00195 7.03733 3.00195 12.0026C3.00195 16.9679 7.03685 21.0052 12.0004 21.0052C16.9639 21.0052 20.9988 16.9679 20.9988 12.0026C20.9988 7.03733 16.9639 3 12.0004 3ZM16.2407 9.50088L11.5521 15.9904C11.4459 16.1384 11.2894 16.2525 11.1073 16.3178C10.9252 16.383 10.7271 16.3967 10.5368 16.3573C10.3465 16.3179 10.1729 16.2269 10.0382 16.0952C9.90339 15.9635 9.81356 15.7967 9.78125 15.6172L8.75291 10.9371C8.71289 10.7145 8.75756 10.4851 8.87882 10.2905C9.00008 10.0959 9.18965 9.94808 9.41224 9.87079C9.63483 9.7935 9.87773 9.79181 10.1015 9.86598C10.3252 9.94015 10.5168 10.0851 10.6407 10.2778L12.9166 14.0348L15.5292 9.50088C15.5983 9.38957 15.6903 9.29294 15.7993 9.21757C15.9084 9.1422 16.0322 9.08978 16.1629 9.06337C16.2936 9.03696 16.4284 9.03709 16.559 9.06376C16.6896 9.09043 16.8133 9.1431 16.9222 9.21869C17.031 9.29428 17.1228 9.39111 17.1916 9.50257C17.2604 9.61403 17.3047 9.73941 17.3217 9.87011C17.3387 10.0008 17.3281 10.1339 17.2906 10.2599C17.253 10.386 17.1894 10.5022 17.1035 10.6015L16.2407 9.50088Z" opacity="0.4" />
          </svg>
        </motion.div>
        
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Check Your Inbox!
        </motion.h2>
        
        <motion.p 
          className="text-gray-300 text-md sm:text-lg mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          We've sent a secure sign-in link to your email address. Please click the link to complete your sign-in.
          Remember to check your spam or junk folder if you don't see it.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 150 }}
        >
          <Link href="/"
            className="inline-block px-10 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700
                       text-white font-semibold text-lg tracking-wide transition-all duration-300 ease-in-out
                       focus:outline-none focus:ring-4 focus:ring-blue-500/50
                       hover:shadow-xl hover:shadow-blue-600/30 transform hover:scale-105"
          >
            Back to Home
            {/* {countdown > 0 ? `Back to Home (${countdown})` : "Back to Home"} */}
          </Link>
        </motion.div>
        
        <motion.p 
          className="text-xs text-gray-500 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          This link is valid for 24 hours. If you didn't request this, please ignore this email.
        </motion.p>
      </motion.div>
    </div>
  );
}