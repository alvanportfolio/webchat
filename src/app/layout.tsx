'use client';

import './globals.css'
import Sidebar from '@/components/Sidebar';
import { useSidebarStore } from '@/store/sidebarStore';
import ToastProvider from '@/components/ToastProvider';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/context/AuthContext';
import { MagicVerification } from '@/components/ui/magic-verification';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useDisableNextJsErrorOverlay } from '@/hooks/useDisableNextJsErrorOverlay';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isOpen: isSidebarOpen, setOpen } = useSidebarStore();
  const pathname = usePathname();
  
  // Disable Next.js error overlay in development mode
  useDisableNextJsErrorOverlay();
  
  // Only show sidebar on chat pages
  const showSidebar = pathname?.includes('/chat');
  
  // Global error fallback UI
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
      <body className="bg-gray-900">
        <ErrorBoundary fallback={globalErrorFallback}>
          <AuthProvider>
            <ToastProvider>
              {/* Magic Verification UI Enhancement */}
              <MagicVerification />
              
              <div className="app-container flex h-screen w-full overflow-hidden">
                {/* Sidebar - only show on chat pages */}
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
                    
                    {/* Sidebar overlay for mobile */}
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
                
                {/* Main content */}
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
        </ErrorBoundary>
      </body>
    </html>
  )
}