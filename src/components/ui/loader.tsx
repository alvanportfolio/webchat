'use client';

import { motion } from 'framer-motion';

interface LoaderProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export function Loader({ message = "Loading...", size = 'medium' }: LoaderProps) {
  const sizeMap = {
    small: 'w-6 h-6 border-2',
    medium: 'w-10 h-10 border-4',
    large: 'w-16 h-16 border-[6px]',
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <motion.div
        className={`rounded-full ${sizeMap[size]} border-blue-500 border-t-transparent animate-spin`}
        style={{ borderTopColor: 'transparent' }} // Ensure tailwind JIT picks this up
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      {message && (
        <motion.p 
          className="mt-4 text-sm text-gray-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}

export function FullPageLoader({ message = "Loading Alvan World..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 z-[100]">
      <Loader message={message} size="large" />
    </div>
  );
}