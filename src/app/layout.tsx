'use client'; // This remains for client-side hooks and providers

import './globals.css'
import Sidebar from '@/components/Sidebar';
import { useSidebarStore } from '@/store/sidebarStore';
import ToastProvider from '@/components/ToastProvider';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/context/AuthContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useDisableNextJsErrorOverlay } from '@/hooks/useDisableNextJsErrorOverlay';
import { SessionProvider } from 'next-auth/react';
import type { Metadata } from 'next'; // Import Metadata type

// Define metadata for icons
export const metadata: Metadata = {
  title: 'Alvan World - AI Chat', // You can customize the title
  description: 'An intelligent AI chat application.', // Customize description
  icons: {
    icon: [ // Standard favicons
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      // You can also link your src/app/favicon.ico directly if preferred
      // { url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' }
    ],
    apple: '/icons/apple-touch-icon.png', // Apple touch icon
    // You can add other icons like shortcut or manifest icons here if needed
    // shortcut: '/icons/icon-192x192.png', 
  },
  // If you create a manifest.json for PWA features, link it here:
  // manifest: '/manifest.json', 
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isOpen: isSidebarOpen, setOpen } = useSidebarStore();
  const pathname = usePathname();
  
  useDisableNextJsErrorOverlay();
  
  const showSidebar = pathname?.includes('/chat');
  
  const globalErrorFallback = (
    <div className="flex items-center justify-center h-screen bg-gray-900 p-4">
      <div className="bg-red-900/20 border border-red-700 rounded-lg p-6 max-w-md text-center">
        <h2 className="text-xl font-semibold text-red-300 mb-3">Something went wrong</h2>
        <p className="text-gray-300 mb-4">
          The application encountered an unexpected error. Please refresh the page to try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
  
  return (
    <html lang="en" suppressHydrationWarning>
      {/* The <head> tag is automatically managed by Next.js based on metadata */}
      <body className="bg-gray-900">
        <ErrorBoundary fallback={globalErrorFallback}>
          <SessionProvider>
            <AuthProvider>
              <ToastProvider>
                <div className="app-container flex h-screen w-full overflow-hidden">
                  {showSidebar && (
                    <>
                      <div 
                        className={`sidebar ${isSidebarOpen ? '' : 'closed'}`}
                        style={{ 
                          transform: 'translate3d(0,0,0)',
                          WebkitTransform: 'translate3d(0,0,0)'
                        }}
                      >
                        <Sidebar />
                      </div>
                      {isSidebarOpen && (
                        <div 
                          className="sidebar-overlay visible md:hidden"
                          onClick={() => setOpen(false)}
                          style={{ 
                            transform: 'translate3d(0,0,0)',
                            WebkitTransform: 'translate3d(0,0,0)'
                          }}
                        />
                      )}
                    </>
                  )}
                  <main 
                    className={`flex-1 overflow-hidden ${showSidebar && isSidebarOpen ? 'with-sidebar' : ''}`}
                    style={{ 
                      transform: 'translate3d(0,0,0)',
                      WebkitTransform: 'translate3d(0,0,0)'
                    }}
                  >
                    {children}
                  </main>
                </div>
              </ToastProvider>
            </AuthProvider>
          </SessionProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}