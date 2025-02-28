import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Model {
  id: string;
  name: string;
}

interface ApiConfigState {
  baseUrl: string;
  apiKey: string;
  availableModels: Model[];
  selectedModel: string;
  isConfigured: boolean;
  setBaseUrl: (url: string) => void;
  setApiKey: (key: string) => void;
  setAvailableModels: (models: Model[]) => void;
  setSelectedModel: (modelId: string) => void;
  setIsConfigured: (isConfigured: boolean) => void;
  reset: () => void;
}

export const useApiConfigStore = create<ApiConfigState>()(
  persist(
    (set) => ({
      baseUrl: '',
      apiKey: '',
      availableModels: [],
      selectedModel: '',
      isConfigured: false,
      setBaseUrl: (url) => set({ baseUrl: url }),
      setApiKey: (key) => set({ apiKey: key }),
      setAvailableModels: (models) => set({ availableModels: models }),
      setSelectedModel: (modelId) => set({ selectedModel: modelId }),
      setIsConfigured: (isConfigured) => set({ isConfigured }),
      reset: () => set({ 
        baseUrl: '', 
        apiKey: '', 
        availableModels: [], 
        selectedModel: '',
        isConfigured: false 
      }),
    }),
    {
      name: 'api-config-storage',
    }
  )
); 