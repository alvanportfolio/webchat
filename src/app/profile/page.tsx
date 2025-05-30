"use client"; // Required for Zustand to work in Next.js App Router

import { useState, useEffect } from 'react';
import { useUserProfileStore } from '@/store/userProfileStore';

export default function ProfilePage() {
  const { username, profilePicture, updateProfile } = useUserProfileStore();
  const [currentUsername, setCurrentUsername] = useState(username);
  const [currentProfilePicture, setCurrentProfilePicture] = useState(profilePicture);

  useEffect(() => {
    setCurrentUsername(username);
    setCurrentProfilePicture(profilePicture);
  }, [username, profilePicture]);

  const handleSave = () => {
    updateProfile(currentUsername, currentProfilePicture);
    // Optionally, add some feedback to the user, like a toast notification
  };

  return (
    <div className="container mx-auto p-6 bg-gray-900 text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-white">Profile Settings</h1>
      <div className="space-y-6 max-w-lg">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={currentUsername}
            onChange={(e) => setCurrentUsername(e.target.value)}
            placeholder="Enter your username"
            className="mt-1 block w-full px-4 py-2.5 border border-gray-700 bg-gray-850 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-200 placeholder-gray-500"
          />
        </div>
        <div>
          <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-400 mb-1">
            Profile Picture URL
          </label>
          <input
            type="text"
            name="profilePicture"
            id="profilePicture"
            value={currentProfilePicture}
            onChange={(e) => setCurrentProfilePicture(e.target.value)}
            placeholder="https://example.com/image.png"
            className="mt-1 block w-full px-4 py-2.5 border border-gray-700 bg-gray-850 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-200 placeholder-gray-500"
          />
        </div>
        <div>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors duration-150"
          >
            Save Changes
          </button>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3 text-white">Current Profile Picture</h2>
          {currentProfilePicture ? (
            <img src={currentProfilePicture} alt="Profile" className="w-36 h-36 rounded-full object-cover border-2 border-gray-700 shadow-md" />
          ) : (
            <div className="w-36 h-36 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-700">
              <span className="text-gray-500 text-sm">No Image</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
