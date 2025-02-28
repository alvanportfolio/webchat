import { Magic, MagicSDKAdditionalConfiguration } from 'magic-sdk';

// Initialize Magic instance
let magic: Magic | null = null;

export const getMagic = () => {
  if (typeof window === 'undefined') return null;
  
  if (!magic) {
    // Create Magic instance with API key
    magic = new Magic('pk_live_FAD04F31C089C300', {
      // We need to cast the configuration to MagicSDKAdditionalConfiguration
      // because the theme property is not included in the type definitions
      // but it is supported by the Magic SDK
      theme: {
        variables: {
          // Dark theme colors
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          background: '#171717',
          foreground: '#e3e3e3',
          primary: '#3b82f6',
          secondary: '#1e40af',
          
          // Text colors
          headingColor: '#ffffff',
          textColor: '#e3e3e3',
          labelColor: '#cdcdcd',
          inputColor: '#ffffff',
          inputBackground: '#333333',
          inputBorderColor: '#4e4e4e',
          
          // Button colors
          actionColor: '#3b82f6',
          actionBackgroundColor: '#3b82f6',
          actionBackgroundHoverColor: '#2563eb',
          actionTextColor: '#ffffff',
          
          // Border radius
          borderRadius: '12px',
        },
      },
    } as unknown as MagicSDKAdditionalConfiguration);
  }
  
  return magic;
};

// Check if user is logged in
export const isUserLoggedIn = async (): Promise<boolean> => {
  const magic = getMagic();
  if (!magic) return false;
  
  try {
    return await magic.user.isLoggedIn();
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
};

// Get user info
export const getUserInfo = async () => {
  const magic = getMagic();
  if (!magic) return null;
  
  try {
    return await magic.user.getInfo();
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
};

// Login with email
export const loginWithEmail = async (email: string): Promise<boolean> => {
  const magic = getMagic();
  if (!magic) return false;
  
  try {
    await magic.auth.loginWithMagicLink({ 
      email,
      redirectURI: new URL('/verify', window.location.origin).href,
      showUI: true,
    });
    return true;
  } catch (error) {
    console.error('Error logging in:', error);
    return false;
  }
};

// Logout
export const logout = async (): Promise<boolean> => {
  const magic = getMagic();
  if (!magic) return false;
  
  try {
    await magic.user.logout();
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    return false;
  }
}; 