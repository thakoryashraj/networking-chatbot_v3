import React, { useState } from 'react';
import { Menu, X, PanelRight } from 'lucide-react';
import { AppSidebar } from '../components/AppSidebar';
import { ChatInterface } from '../components/ChatInterface';
import { RightSidebar } from '../components/RightSidebar';

interface ChatProps {
  leftSidebarOpen: boolean;
  setLeftSidebarOpen: (open: boolean) => void;
}

export default function Chat({ leftSidebarOpen, setLeftSidebarOpen }: ChatProps) {
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Chat</h1>
        <button
          onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <PanelRight className="w-5 h-5" />
        </button>
      </div>

      {/* Left Sidebar - Desktop */}
      <div className="hidden md:block">
        <AppSidebar />
      </div>

      {/* Left Sidebar - Mobile Overlay */}
      {leftSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setLeftSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={() => setLeftSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <AppSidebar />
          </div>
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col pt-16 md:pt-0">
        <ChatInterface />
      </div>

      {/* Right Sidebar - Desktop */}
      <div className="hidden md:block">
        <RightSidebar />
      </div>

      {/* Right Sidebar - Mobile Overlay */}
      {rightSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setRightSidebarOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <button
                onClick={() => setRightSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <RightSidebar />
          </div>
        </div>
      )}
    </div>
  );
}