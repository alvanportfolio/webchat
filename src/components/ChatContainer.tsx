'use client';

import { useState, useRef, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import Message from './Message';
import ChatInput from './ChatInput';
import { useConversationStore, Message as MessageType } from '@/store/conversationStore';
import { useApiConfigStore } from '@/store/apiConfigStore';
import { useChatHistoryStore } from '@/store/chatHistoryStore';
import { createChatCompletion } from '@/utils/streamingUtils';
import ApiConfigModal from './ApiConfigModal';
import { useToast } from '@/components/ToastProvider';

interface ChatContainerProps {
  chatId?: string;
}

export default function ChatContainer({ chatId }: ChatContainerProps) {
  const { getMessages, addMessage, updateMessage, removeMessage } = useConversationStore();
  const { baseUrl, apiKey, selectedModel, isConfigured } = useApiConfigStore();
  const { addChat, updateChat } = useChatHistoryStore();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  
  const currentChatId = chatId || 'default';
  const messages = getMessages(currentChatId);

  // Set isClient to true on component mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show config modal if API is not configured and hasn't been shown yet
  useEffect(() => {
    // Only run this effect on the client side
    if (!isClient) return;
    
    // Check if we've shown the modal before
    const hasShownModal = localStorage.getItem('hasShownConfigModal');
    
    // If API is not configured and we haven't shown the modal yet
    if (!isConfigured && !hasShownModal) {
      setShowConfigModal(true);
      // Remember that we've shown the modal
      localStorage.setItem('hasShownConfigModal', 'true');
    }
  }, [isConfigured, isClient]);

  // Update chat history when messages change
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const chatTitle = messages.find(m => m.isUser)?.content.slice(0, 30) + '...' || 'New Chat';
      
      addChat({
        id: currentChatId,
        title: chatTitle,
        lastMessageTime: lastMessage.timestamp
      });
      
      // Update chat title and last message time
      updateChat(currentChatId, {
        title: chatTitle,
        lastMessageTime: lastMessage.timestamp
      });
    }
  }, [messages, currentChatId, addChat, updateChat]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;
    
    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date().toISOString(),
    };
    
    addMessage(currentChatId, userMessage);
    
    // Check if API is configured
    if (!isConfigured || !baseUrl || !apiKey || !selectedModel) {
      setShowConfigModal(true);
      return;
    }
    
    // Create a placeholder for the AI response
    const aiMessageId = (Date.now() + 1).toString();
    const aiMessage: MessageType = {
      id: aiMessageId,
      content: '',
      isUser: false,
      timestamp: new Date().toISOString(),
      pending: true,
    };
    
    addMessage(currentChatId, aiMessage);
    setIsLoading(true);
    
    // Format messages for the API
    const apiMessages = messages.concat(userMessage).map(msg => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.content
    }));
    
    try {
      let responseContent = '';
      
      // Stream the response
      await createChatCompletion(
        baseUrl,
        apiKey,
        selectedModel,
        apiMessages,
        (chunk) => {
          responseContent += chunk;
          updateMessage(currentChatId, aiMessageId, { 
            content: responseContent,
            pending: false,
            isStreaming: true
          });
        },
        () => {
          // On completion
          updateMessage(currentChatId, aiMessageId, { 
            content: responseContent,
            pending: false,
            isStreaming: false
          });
          setIsLoading(false);
        },
        (error) => {
          // On error
          console.error('Error in chat completion:', error);
          
          // Remove the AI message that would show the error
          removeMessage(currentChatId, aiMessageId);
          
          // Show a toast notification instead
          if (error.message.includes('401')) {
            showToast('Authentication error. Please check your API key or contact Alvan for assistance.', 'error');
          } else {
            showToast('Error connecting to AI provider. Please contact Alvan for assistance.', 'error');
          }
          
          setIsLoading(false);
        }
      );
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Remove the AI message that would show the error
      removeMessage(currentChatId, aiMessageId);
      
      // Show a toast notification
      showToast('An unexpected error occurred. Please try again or contact Alvan for assistance.', 'error');
      
      setIsLoading(false);
    }
  };

  // Handle closing the config modal
  const handleCloseConfigModal = () => {
    setShowConfigModal(false);
    // If API is configured after closing the modal, update localStorage
    if (isConfigured) {
      localStorage.setItem('hasShownConfigModal', 'true');
    }
  };

  // Render a loading state or empty div during SSR to avoid hydration mismatch
  const renderChatContent = () => {
    if (!isClient) {
      return <div className="h-full"></div>;
    }

    if (messages.length === 0) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Welcome Alvan World</h2>
            <p className="max-w-md">Start a conversation with the AI assistant by typing a message below.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="py-4 space-y-0">
        {messages.map((message) => (
          <Message
            key={message.id}
            content={message.content}
            isUser={message.isUser}
            timestamp={message.timestamp}
            isStreaming={message.isStreaming}
            pending={message.pending}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#212121]">
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto custom-scrollbar max-w-3xl mx-auto w-full h-[calc(100vh-180px)] pb-9 transform translateZ(0) will-change-transform">
        {renderChatContent()}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      
      <ApiConfigModal 
        isOpen={showConfigModal} 
        onClose={handleCloseConfigModal} 
      />
    </div>
  );
} 