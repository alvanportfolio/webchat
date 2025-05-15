'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

export default function ChatIndexPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Generate a new UUID for a new chat session and redirect.
    // The actual chat data will be created in the store only when the first message is sent.
    const newChatId = uuidv4();
    router.replace(`/chat/${newChatId}`); // Use replace to avoid this intermediate page in history
  }, [router]);

  // This page will briefly show "Preparing new chat..." then redirect.
  // A more sophisticated approach might involve showing a chat list or a welcome screen here.
  return (
    <div className="h-full flex items-center justify-center bg-gray-900">
      <div className="animate-pulse text-gray-400">Preparing new chat...</div>
    </div>
  );
}