'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isUserLoggedIn, getUserInfo, loginWithEmail, logout } from '@/lib/magic';
import { useUserProfileStore } from '@/store/userProfileStore';

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  userEmail: string | null;
  login: (email: string) => Promise<boolean>;
  logoutUser: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  userEmail: null,
  login: async () => false,
  logoutUser: async () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { setUsername } = useUserProfileStore();

  // Check if user is logged in on mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loggedIn = await isUserLoggedIn();
        setIsLoggedIn(loggedIn);

        if (loggedIn) {
          const userInfo = await getUserInfo();
          setUserEmail(userInfo?.email || null);
          
          // Set default username from email if available
          if (userInfo?.email) {
            // Extract username from email (everything before @)
            const username = userInfo.email.split('@')[0];
            setUsername(username);
          }
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Only run on client-side
    if (typeof window !== 'undefined') {
      checkLoginStatus();
    } else {
      setIsLoading(false);
    }
  }, [setUsername]);

  // Login function
  const login = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const success = await loginWithEmail(email);
      if (success) {
        setIsLoggedIn(true);
        setUserEmail(email);
        
        // Set default username from email
        const username = email.split('@')[0];
        setUsername(username);
      }
      return success;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logoutUser = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const success = await logout();
      if (success) {
        setIsLoggedIn(false);
        setUserEmail(null);
      }
      return success;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        userEmail,
        login,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 