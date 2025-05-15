'use client';

import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useUserProfileStore } from '@/store/userProfileStore';

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean; // This will reflect NextAuth's session loading status
  userEmail: string | null;
  userId: string | null; // Added userId
  login: (email: string) => Promise<void>; // Changed to Promise<void> as signIn doesn't return boolean directly for email
  logoutUser: () => Promise<void>; // Changed to Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  userEmail: null,
  userId: null,
  login: async () => { console.warn('Login function not fully initialized'); },
  logoutUser: async () => { console.warn('LogoutUser function not fully initialized'); },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const { setUsername, setUserId: setUserProfileId } = useUserProfileStore();

  const isLoading = status === 'loading';
  const isLoggedIn = status === 'authenticated';
  const userEmail = session?.user?.email || null;
  const userId = session?.user?.id || null; // Get userId from session

  useEffect(() => {
    if (isLoggedIn && session?.user?.email) {
      // Set username from email if available (everything before @)
      const usernameFromEmail = session.user.email.split('@')[0];
      setUsername(usernameFromEmail);
      if (session.user.id) {
        setUserProfileId(session.user.id);
      }
    } else if (!isLoggedIn && !isLoading) {
      // Clear username and userId if not logged in
      setUsername(''); // Or a default guest name
      setUserProfileId('');
    }
  }, [isLoggedIn, isLoading, session, setUsername, setUserProfileId]);

  const login = async (email: string) => {
    // For email provider, signIn will redirect to a verification page or handle it via email link
    // It doesn't directly return a boolean success in the same way Magic.link did.
    // The session status will update automatically.
    await signIn('email', { email, redirect: true, callbackUrl: '/chat' }); // redirect: true and specify callbackUrl
    // No need to setIsLoading here, useSession status handles it.
  };

  const logoutUser = async () => {
    await signOut({ redirect: true, callbackUrl: '/' }); // Redirect to home after sign out
    // Session status will update, and useEffect will clear user profile.
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        userEmail,
        userId,
        login,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};