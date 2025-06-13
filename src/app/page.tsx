'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BackgroundPaths } from '@/components/ui/background-paths';
import { AuthModal } from '@/components/ui/auth-modal';
import { useAuth } from '@/context/AuthContext';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { FullPageLoader } from '@/components/ui/loader'; // Import the loader

export default function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  // Effect to redirect to /chat if user is already logged in when visiting home
  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      // Don't create a new chat ID here, just go to the main chat page
      // The /chat page will handle creating a new chat or loading an existing one.
      router.push('/chat');
    }
  }, [isLoading, isLoggedIn, router]);

  // Handle the "Start Your Journey" button click
  const handleStartJourney = () => {
    if (isLoggedIn) {
      // If user is logged in, redirect to chat (already handled by above useEffect, but good for explicit action)
      router.push('/chat');
    } else {
      // If not logged in, show auth modal
      setShowAuthModal(true);
    }
  };

  // If user logs in (e.g. through modal, then email link, then comes back),
  // the main useEffect above should handle the redirect to /chat.
  // This specific effect for showAuthModal might be redundant or can be simplified.
  // For now, let's keep it, but the primary redirect is the new useEffect.
  useEffect(() => {
    if (isLoggedIn && showAuthModal) {
      setShowAuthModal(false);
      // router.push('/chat'); // Already handled by the main redirect effect
    }
  }, [isLoggedIn, showAuthModal, router]);


  // If loading or already logged in (and redirecting), show minimal UI or loading
  if (isLoading || (!isLoading && isLoggedIn)) { // Show loader while auth state is resolving or redirecting
    return <FullPageLoader message="Initializing..." />;
  }

  return (
    <div className="h-full">
      <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-neutral-950">
        <div className="absolute inset-0">
          <BackgroundPaths title="Welcome To Alvan World Start Your Journey" />
        </div>
        
        {/* Main content area with title */}
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center flex-grow flex items-center justify-center">
          {/* Title is handled by BackgroundPaths component */}
        </div>
        
        {/* Bottom button area */}
        <div className="relative z-10 w-full pb-16 flex justify-center">
          <ShimmerButton
            onClick={handleStartJourney}
            disabled={isLoading}
            shimmerColor="rgba(255, 255, 255, 0.4)"
            shimmerSize="0.1em"
            shimmerDuration="2.5s"
            borderRadius="1.15rem"
            background="rgba(0, 0, 0, 0.8)"
            className="px-8 py-3 text-lg font-semibold backdrop-blur-md"
          >
            <span className="text-white opacity-100 group-hover:opacity-100 transition-opacity text-shadow">
              {isLoading ? 'Loading...' : 'Start Your Journey'}
            </span>
            <span
              className="ml-3 text-white opacity-90 group-hover:opacity-100 group-hover:translate-x-1.5 
                      transition-all duration-300"
            >
              →
            </span>
          </ShimmerButton>
        </div>
      </div>

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}
