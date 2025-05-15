'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image
import { useEffect, useState } from 'react';

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
          className="mx-auto w-20 h-20 mb-8" // Removed text-blue-500 as image has its own colors
          initial={{ scale: 0.5, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 10, stiffness: 150, delay: 0.3 }}
        >
          <Image
            src="/icon.ico" // Assuming icon.ico is in public directory
            alt="Verification Icon"
            width={80} // Adjust size as needed
            height={80}
            className="drop-shadow-lg"
          />
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