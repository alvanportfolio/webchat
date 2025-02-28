import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserProfileState {
  username: string;
  profilePicture: string | null;
  setUsername: (username: string) => void;
  setProfilePicture: (profilePicture: string | null) => void;
  updateProfile: (username: string, profilePicture: string | null) => void;
}

export const useUserProfileStore = create<UserProfileState>()(
  persist(
    (set) => ({
      username: 'User',
      profilePicture: null,
      
      setUsername: (username) => set({ username }),
      
      setProfilePicture: (profilePicture) => set({ profilePicture }),
      
      updateProfile: (username, profilePicture) => set({ 
        username, 
        profilePicture 
      }),
    }),
    {
      name: 'user-profile-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        username: state.username, 
        profilePicture: state.profilePicture 
      }),
    }
  )
); 