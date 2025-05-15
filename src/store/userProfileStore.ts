import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserProfileState {
  userId: string; // Added userId
  username: string;
  profilePicture: string | null;
  setUserId: (userId: string) => void; // Added setUserId
  setUsername: (username: string) => void;
  setProfilePicture: (profilePicture: string | null) => void;
  updateProfile: (username: string, profilePicture: string | null) => void; // Consider if userId should be updatable here too
}

export const useUserProfileStore = create<UserProfileState>()(
  persist(
    (set) => ({
      userId: '', // Initialize userId
      username: 'User', // Default username
      profilePicture: null,
      
      setUserId: (userId) => set({ userId }), // Implement setUserId
      
      setUsername: (username) => set({ username }),
      
      setProfilePicture: (profilePicture) => set({ profilePicture }),
      
      updateProfile: (username, profilePicture) => set({ 
        username, 
        profilePicture 
        // If userId needs to be updated via this function, add it here
      }),
    }),
    {
      name: 'user-profile-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        userId: state.userId, // Persist userId
        username: state.username, 
        profilePicture: state.profilePicture 
      }),
    }
  )
);