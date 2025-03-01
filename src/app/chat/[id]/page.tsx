'use client';

import { useParams } from 'next/navigation';
import ChatContainer from '@/components/ChatContainer';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function ChatPage() {
  const params = useParams();
  const chatId = params.id as string;

  // Custom fallback UI for the error boundary
  const fallbackUI = (
    <div className="h-full flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 max-w-md">
        <h2 className="text-xl font-semibold text-red-300 mb-3">Connection Error</h2>
        <p className="text-gray-300 mb-4">
          We couldn&apos;t connect to the AI provider. Please check your API configuration or try again later.
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

  return (
    <div className="h-full">
      <ErrorBoundary fallback={fallbackUI}>
        <ChatContainer chatId={chatId} />
      </ErrorBoundary>
    </div>
  );
} 