import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
  pending?: boolean;
  isStreaming?: boolean;
}

interface ConversationState {
  conversations: Record<string, Message[]>;
  addMessage: (chatId: string, message: Message) => void;
  updateMessage: (chatId: string, messageId: string, updates: Partial<Message>) => void;
  removeMessage: (chatId: string, messageId: string) => void;
  getMessages: (chatId: string) => Message[];
  clearConversation: (chatId: string) => void;
  clearAllConversations: () => void;
}

export const useConversationStore = create<ConversationState>()(
  persist(
    (set, get) => ({
      conversations: {},
      
      addMessage: (chatId, message) => set((state) => {
        const currentMessages = state.conversations[chatId] || [];
        return {
          conversations: {
            ...state.conversations,
            [chatId]: [...currentMessages, message],
          },
        };
      }),
      
      updateMessage: (chatId, messageId, updates) => set((state) => {
        const currentMessages = state.conversations[chatId] || [];
        const updatedMessages = currentMessages.map((msg) =>
          msg.id === messageId ? { ...msg, ...updates } : msg
        );
        
        return {
          conversations: {
            ...state.conversations,
            [chatId]: updatedMessages,
          },
        };
      }),
      
      removeMessage: (chatId, messageId) => set((state) => {
        const currentMessages = state.conversations[chatId] || [];
        const filteredMessages = currentMessages.filter((msg) => msg.id !== messageId);
        
        return {
          conversations: {
            ...state.conversations,
            [chatId]: filteredMessages,
          },
        };
      }),
      
      getMessages: (chatId) => {
        const state = get();
        return state.conversations[chatId] || [];
      },
      
      clearConversation: (chatId) => set((state) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [chatId]: _unused, ...restConversations } = state.conversations;
        return {
          conversations: restConversations,
        };
      }),
      
      clearAllConversations: () => set({ conversations: {} }),
    }),
    {
      name: 'conversation-storage',
    }
  )
); 