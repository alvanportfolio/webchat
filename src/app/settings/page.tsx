"use client";

import { useState, useEffect } from 'react';
import { useSettingsStore, MessageDisplayDensity, PreferredLanguage } from '@/store/settingsStore';

export default function SettingsPage() {
  const {
    messageDisplayDensity,
    preferredLanguage,
    updateMessageDisplayDensity,
    updatePreferredLanguage,
  } = useSettingsStore();

  // Local state to manage form inputs
  const [currentDensity, setCurrentDensity] = useState<MessageDisplayDensity>(messageDisplayDensity);
  const [currentLanguage, setCurrentLanguage] = useState<PreferredLanguage>(preferredLanguage);

  // Effect to update local state when store changes (e.g., on initial load from localStorage)
  useEffect(() => {
    setCurrentDensity(messageDisplayDensity);
  }, [messageDisplayDensity]);

  useEffect(() => {
    setCurrentLanguage(preferredLanguage);
  }, [preferredLanguage]);

  const handleSave = () => {
    updateMessageDisplayDensity(currentDensity);
    updatePreferredLanguage(currentLanguage);
    // Optionally, add user feedback (e.g., toast notification)
    alert('Settings saved!');
  };

  return (
    <div className="container mx-auto p-6 bg-gray-900 text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-white">Application Settings</h1>
      <div className="space-y-6 max-w-lg"> {/* Changed max-w-md to max-w-lg to match profile page */}
        <div>
          <label htmlFor="messageDisplayDensity" className="block text-sm font-medium text-gray-400 mb-1">
            Message Display Density
          </label>
          <select
            id="messageDisplayDensity"
            name="messageDisplayDensity"
            value={currentDensity}
            onChange={(e) => setCurrentDensity(e.target.value as MessageDisplayDensity)}
            className="mt-1 block w-full px-4 py-2.5 border border-gray-700 bg-gray-850 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-200"
          >
            <option value="Comfortable">Comfortable</option>
            <option value="Compact">Compact</option>
          </select>
        </div>

        <div>
          <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-400 mb-1">
            Preferred Language
          </label>
          <select
            id="preferredLanguage"
            name="preferredLanguage"
            value={currentLanguage}
            onChange={(e) => setCurrentLanguage(e.target.value as PreferredLanguage)}
            className="mt-1 block w-full px-4 py-2.5 border border-gray-700 bg-gray-850 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-200"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            {/* Add a disabled option for styling if needed, e.g. for placeholder text color if select had one */}
            {/* <option value="" disabled hidden>Select a language</option> */}
          </select>
        </div>

        <div>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors duration-150"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
