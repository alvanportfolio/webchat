'use client';

import { useState } from 'react';
import ModelSelector from './ModelSelector';
import ApiConfigModal from './ApiConfigModal';
import { useApiConfigStore } from '@/store/apiConfigStore';
import { GiFairyWand } from "react-icons/gi";

interface ChatHeaderProps {
  isLoading?: boolean;
}

export default function ChatHeader({ isLoading = false }: ChatHeaderProps) {
  const [showAiDialog, setShowAiDialog] = useState(false);
  const [showApiConfigModal, setShowApiConfigModal] = useState(false);
  const { isConfigured } = useApiConfigStore();

  const toggleAiDialog = () => {
    setShowAiDialog(!showAiDialog);
  };

  const openApiConfigModal = () => {
    setShowApiConfigModal(true);
  };

  const closeApiConfigModal = () => {
    setShowApiConfigModal(false);
  };

  return (
    <div className="h-14 border-b border-gray-800 flex items-center px-4">
      <div className="w-full grid grid-cols-3 items-center">
        {/* Left side - Empty or could be used for other elements */}
        <div className="flex items-center justify-start">
          {/* Left side is now empty */}
        </div>

        {/* Center - Model Selector */}
        <div className="flex items-center justify-center">
          <ModelSelector onConfigClick={openApiConfigModal} isLoading={isLoading} />
        </div>

        {/* Right side - API Config icon and Info icon */}
        <div className="flex items-center justify-end gap-2">
          <button 
            className="p-2 rounded-lg bg-transparent text-gray-200 border-none cursor-pointer flex items-center justify-center hover:bg-gray-800"
            title="API Configuration"
            onClick={openApiConfigModal}
          >
            <GiFairyWand size={20} />
          </button>
          
          {/* AI Icon - Clickable */}
          <button 
            className="w-8 h-8 rounded-full bg-[#161616] flex items-center justify-center hover:bg-gray-800 cursor-pointer"
            onClick={toggleAiDialog}
            title="Usage information"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* AI Dialog */}
      {showAiDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={toggleAiDialog}>
          <div className="bg-gray-850 rounded-lg p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-gray-100">Usage Information</h3>
              <button 
                className="text-gray-400 hover:text-gray-200"
                onClick={toggleAiDialog}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="text-left py-4">
              <h4 className="text-lg font-medium text-gray-200 mb-2">API Configuration</h4>
              <p className="text-gray-400 mb-4">
                This chat interface connects to any OpenAI-compatible API. Configure your API endpoint and key by clicking the model selector in the center of the header.
              </p>
              
              <h4 className="text-lg font-medium text-gray-200 mb-2">Features</h4>
              <ul className="list-disc pl-5 text-gray-400 space-y-1">
                <li>Connect to any OpenAI-compatible API</li>
                <li>Select from available models</li>
                <li>Markdown and code syntax highlighting</li>
                <li>Streaming responses with typing effect</li>
                <li>Conversation history is saved locally</li>
              </ul>
              
              {!isConfigured && (
                <div className="mt-4 p-3 bg-blue-900/30 border border-blue-700 rounded-lg">
                  <p className="text-blue-200 text-sm">
                    You haven&apos;t configured your API yet. Click the button below to set up your API connection.
                  </p>
                  <button 
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                    onClick={() => {
                      toggleAiDialog();
                      openApiConfigModal();
                    }}
                  >
                    Configure API
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* API Config Modal */}
      <ApiConfigModal isOpen={showApiConfigModal} onClose={closeApiConfigModal} />
    </div>
  );
} 