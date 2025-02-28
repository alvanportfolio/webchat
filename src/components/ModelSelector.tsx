import { useState, useRef, useEffect } from 'react';
import { useApiConfigStore } from '@/store/apiConfigStore';

interface ModelSelectorProps {
  onConfigClick: () => void;
}

export default function ModelSelector({ onConfigClick }: ModelSelectorProps) {
  const { availableModels, selectedModel, setSelectedModel, isConfigured } = useApiConfigStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
    setIsOpen(false);
  };
  
  const currentModel = availableModels.find(model => model.id === selectedModel);
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => isConfigured ? setIsOpen(!isOpen) : onConfigClick()}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-750 text-sm text-gray-300 border border-gray-700"
      >
        {isConfigured ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"></path>
            </svg>
            <span className="max-w-[150px] truncate">
              {currentModel?.name || 'Select model'}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"></path>
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>Configure API</span>
          </>
        )}
      </button>
      
      {isOpen && availableModels.length > 0 && (
        <div className="absolute top-full mt-1 right-0 bg-gray-850 border border-gray-700 rounded-lg shadow-lg z-50 py-1 min-w-[200px] max-h-[300px] overflow-y-auto custom-scrollbar">
          {availableModels.map((model) => (
            <button
              key={model.id}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-800 flex items-center gap-2 ${
                model.id === selectedModel ? 'text-blue-400 bg-gray-800/50' : 'text-gray-300'
              }`}
              onClick={() => handleModelSelect(model.id)}
            >
              {model.id === selectedModel && (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              )}
              <span className={model.id === selectedModel ? 'ml-0' : 'ml-5'}>
                {model.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 