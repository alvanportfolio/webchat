'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function VerifyRequestPage() {
  const [countdown, setCountdown] = useState(5);
  const [hovered, setHovered] = useState(false);
  const [particlesCount] = useState(Array(15).fill(0));
  
  // Optional countdown functionality - still commented out but improved
  // useEffect(() => {
  //   if (countdown <= 0) return;
  //   const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
  //   return () => clearTimeout(timer);
  // }, [countdown]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-gray-950 overflow-hidden">
      {/* Animated background particles */}
      {particlesCount.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
            opacity: 0
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ],
            opacity: [0, 0.4, 0],
            scale: [0, Math.random() * 1 + 1, 0]
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            width: `${Math.random() * 200 + 50}px`,
            height: `${Math.random() * 200 + 50}px`,
            filter: "blur(40px)"
          }}
        />
      ))}

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
        className="w-full max-w-lg p-8 sm:p-12 rounded-2xl relative z-10
                  bg-gradient-to-br from-gray-800/80 via-gray-850/80 to-gray-900/80 
                  backdrop-blur-lg border border-gray-700/50 text-center
                  shadow-[0_0_50px_rgba(56,189,248,0.15)]"
      >
        {/* Animated glow effect */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.2), rgba(139, 92, 246, 0.2), transparent)",
              backgroundSize: "200% 100%",
            }}
          >
            <motion.div 
              className="w-full h-full"
              animate={{ 
                x: ["0%", "100%", "0%"] 
              }}
              transition={{ 
                duration: 8, 
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop" 
              }}
            />
          </div>
        </div>
        
        {/* Spinning logo animation */}
        <motion.div 
          className="mx-auto w-24 h-24 mb-10 relative"
          initial={{ scale: 0.5, y: -10 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 10, stiffness: 150, delay: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            style={{ "--speed": "1.5s" } as any}
            animate={{ 
              rotate: 360 
            }}
            transition={{ 
              duration: 20, 
              ease: "linear", 
              repeat: Infinity 
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full opacity-70" />
          </motion.div>
          
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: [0, 360] }}
            transition={{ 
              duration: 30, 
              ease: "linear", 
              repeat: Infinity 
            }}
          >
            <div className="w-24 h-24 border border-blue-500/30 rounded-full" />
          </motion.div>
          
          <Image
            src="/icon.ico"
            alt="Alvan World"
            width={80}
            height={80}
            className="relative z-10 drop-shadow-lg animate-[pulse_3s_ease-in-out_infinite]"
          />
        </motion.div>
        
        <motion.h2 
          className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4 text-shadow"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Check Your Inbox
        </motion.h2>
        
        <motion.div
          className="space-y-3 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <p className="text-gray-200 text-lg sm:text-xl leading-relaxed">
            We've sent a secure sign-in link to your email address.
          </p>
          <div className="py-4 px-6 bg-gray-900/50 rounded-xl border border-gray-700/30 mt-4">
            <div className="flex items-center text-left">
              <div className="mr-4 p-2 rounded-full bg-blue-500/20">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-300">Please check your email and click the link to complete your sign-in.</p>
                <p className="text-xs text-gray-500 mt-1">Don't forget to check your spam folder!</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 150 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link href="/"
            className="relative inline-flex group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur-md opacity-50 group-hover:opacity-80 transition duration-500"></div>
            <div className="relative px-10 py-3.5 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold text-lg tracking-wide transition-all duration-300">
              Back to Home
              <motion.span
                className="absolute inset-0 rounded-xl"
                initial={false}
                animate={hovered ? {
                  boxShadow: [
                    "0 0 0px 0px rgba(59, 130, 246, 0)",
                    "0 0 20px 5px rgba(59, 130, 246, 0.5)",
                    "0 0 0px 0px rgba(59, 130, 246, 0)"
                  ]
                } : { boxShadow: "0 0 0px 0px rgba(59, 130, 246, 0)" }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </Link>
        </motion.div>
        
        {/* Email validity info */}
        <motion.div 
          className="mt-12 px-6 py-4 rounded-xl bg-gray-900/30 border border-gray-800/50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-gray-500">
              The sign-in link is valid for 24 hours
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}