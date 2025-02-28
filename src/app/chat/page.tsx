'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ChatIndexPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Generate a new chat ID and redirect to it
    const newChatId = Date.now().toString();
    router.push(`/chat/${newChatId}`);
  }, [router]);

  return (
    <div className="h-full flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Redirecting to new chat...</div>
    </div>
  );
} 