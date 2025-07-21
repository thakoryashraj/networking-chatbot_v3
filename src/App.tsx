import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from './components/ui/sonner';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Leads from './pages/Leads';
import Mails from './pages/Mails';
import Analytics from './pages/Analytics';
import Appointments from './pages/Appointments';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Upgrade from './pages/Upgrade';
import Tutorial from './pages/Tutorial';
import NotFound from './pages/NotFound';
import { AppSidebar } from './components/AppSidebar';

function App() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex h-screen bg-background">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <div className="flex w-full">
                    {/* Desktop Sidebar */}
                    <div className="hidden md:block">
                      <AppSidebar />
                    </div>
                    
                    {/* Mobile Sidebar Overlay */}
                    {leftSidebarOpen && (
                      <div className="fixed inset-0 z-50 md:hidden">
                        <div 
                          className="absolute inset-0 bg-black/50"
                          onClick={() => setLeftSidebarOpen(false)}
                        />
                        <div className="absolute left-0 top-0 h-full w-64 bg-background shadow-lg">
                          <AppSidebar 
                            isMobile={true}
                            onClose={() => setLeftSidebarOpen(false)}
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Main Content */}
                    <div className="flex-1 flex flex-col">
                      <Routes>
                        <Route path="/" element={<Navigate to="/chat" replace />} />
                        <Route path="/chat" element={
                          <Chat 
                            leftSidebarOpen={leftSidebarOpen}
                            setLeftSidebarOpen={setLeftSidebarOpen}
                          />
                        } />
                        <Route path="/leads" element={<Leads />} />
                        <Route path="/mails" element={<Mails />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/appointments" element={<Appointments />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/upgrade" element={<Upgrade />} />
                        <Route path="/tutorial" element={<Tutorial />} />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </div>
                  </div>
                </ProtectedRoute>
              } />
            </Routes>
          </div>
          <Toaster />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;