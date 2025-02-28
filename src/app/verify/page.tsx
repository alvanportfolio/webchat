'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CustomMagicVerificationUI } from '@/components/ui/magic-verification';
import { useAuth } from '@/context/AuthContext';

export default function VerifyPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();
  const [showCustomUI, setShowCustomUI] = useState(true);

  useEffect(() => {
    // If the user is already logged in, redirect to the home page
    if (!isLoading && isLoggedIn) {
      router.push('/');
    }

    // Check if we're on a Magic verification page
    const checkForMagicElements = () => {
      const hasMagicElements = 
        document.querySelector('div[data-magic-dialog]') || 
        document.querySelector('.magic-iframe');
      
      // If Magic SDK has rendered its UI, hide our custom UI
      if (hasMagicElements) {
        setShowCustomUI(false);
      }
    };

    // Check immediately and then set up an interval
    checkForMagicElements();
    const intervalId = setInterval(checkForMagicElements, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [isLoggedIn, isLoading, router]);

  // Show our custom UI until Magic SDK renders its UI
  return showCustomUI ? <CustomMagicVerificationUI /> : null;
} 