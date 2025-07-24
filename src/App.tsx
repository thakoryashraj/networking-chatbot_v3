import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster as HotToaster } from 'react-hot-toast';
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useIsMobile } from "@/hooks/use-mobile";

// Pages
import Chat from "./pages/Chat";
import Analytics from "./pages/Analytics";
import Leads from "./pages/Leads";
import Appointments from "./pages/Appointments";
import Mails from "./pages/Mails";
import KnowledgeBase from "./pages/KnowledgeBase";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Upgrade from "./pages/Upgrade";
import Tutorial from "./pages/Tutorial";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const isMobile = useIsMobile();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={
        <ProtectedRoute>
          <SidebarProvider defaultOpen={!isMobile}>
            <div className="flex min-h-screen w-full">
              <AppSidebar />
              <div className={`flex-1 flex flex-col ${isMobile ? 'pt-16' : ''}`}>
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Chat />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/leads" element={<Leads />} />
                    <Route path="/appointments" element={<Appointments />} />
                    <Route path="/mails" element={<Mails />} />
                    <Route path="/knowledge-base" element={<KnowledgeBase />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/upgrade" element={<Upgrade />} />
                    <Route path="/tutorial" element={<Tutorial />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="ai-assistant-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <HotToaster />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
