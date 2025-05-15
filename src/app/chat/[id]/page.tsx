'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
// import ChatContainer from '@/components/ChatContainer'; // Will be dynamically imported
import ErrorBoundary from '@/components/ErrorBoundary';
import { useAuth } from '@/context/AuthContext';
import dynamic from 'next/dynamic';
import { FullPageLoader, Loader } from '@/components/ui/loader'; // Import loaders

// Dynamically import ChatContainer
const ChatContainer = dynamic(() => import('@/components/ChatContainer'), {
  loading: () => <Loader message="Loading Chat Interface..." size="medium" />, // Use new Loader
  ssr: false
});

export default function ChatPage() {
  const params = useParams();
  const chatId = params.id as string;
  const router = useRouter();
  const { isLoggedIn, isLoading: authIsLoading } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !authIsLoading && !isLoggedIn) {
      router.push('/');
    }
  }, [isMounted, isLoggedIn, authIsLoading, router]);

  const fallbackUI = (
    <div className="h-full flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 max-w-md">
        <h2 className="text-xl font-semibold text-red-300 mb-3">Connection Error</h2>
        <p className="text-gray-300 mb-4">
          We couldn't connect to the AI provider. Please check your API configuration or try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    </div>
  );

  if (!isMounted || authIsLoading) { // Show FullPageLoader during initial mount or auth loading
    return <FullPageLoader message="Loading chat..." />;
  }

  if (!isLoggedIn) {
      return null;
  }

  return (
    <div className="h-full">
      <ErrorBoundary fallback={fallbackUI}>
        <ChatContainer chatId={chatId} />
      </ErrorBoundary>
    </div>
  );
}