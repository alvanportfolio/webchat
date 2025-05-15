'use client';

import Sidebar from '@/components/Sidebar';
import { useSidebarStore } from '@/store/sidebarStore';
import ToastProvider from '@/components/ToastProvider';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/context/AuthContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useDisableNextJsErrorOverlay } from '@/hooks/useDisableNextJsErrorOverlay';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

export default function AppProviders({
  children,
}: {
  children: React.ReactNode
}) {
  const { isOpen: isSidebarOpen, setOpen } = useSidebarStore();
  const pathname = usePathname();
  
  useDisableNextJsErrorOverlay(); // Hook for client-side effect
  
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
                  </div>                  {isSidebarOpen && (
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
  );
}