import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type MessageDisplayDensity = "Comfortable" | "Compact";
export type PreferredLanguage = "English" | "Spanish";

interface SettingsState {
  messageDisplayDensity: MessageDisplayDensity;
  preferredLanguage: PreferredLanguage;
  updateMessageDisplayDensity: (density: MessageDisplayDensity) => void;
  updatePreferredLanguage: (language: PreferredLanguage) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      messageDisplayDensity: "Comfortable",
      preferredLanguage: "English",
      updateMessageDisplayDensity: (density) => set({ messageDisplayDensity: density }),
      updatePreferredLanguage: (language) => set({ preferredLanguage: language }),
    }),
    {
      name: 'settings-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
