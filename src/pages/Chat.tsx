import { useState } from "react";
import { Menu, PanelRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatInterface } from "@/components/ChatInterface";
import { RightSidebar } from "@/components/RightSidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { cn } from "@/lib/utils";

const Chat = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  const closeSidebars = () => {
    setLeftSidebarOpen(false);
    setRightSidebarOpen(false);
  };

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Mobile Header with Toggle Buttons */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-background/80 backdrop-blur-sm z-50 relative">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setLeftSidebarOpen(true)}
          className="text-muted-foreground hover:text-foreground"
        >
          <Menu className="w-5 h-5" />
        </Button>
        
        <h1 className="text-lg font-semibold text-foreground">AI Assistant</h1>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setRightSidebarOpen(true)}
          className="text-muted-foreground hover:text-foreground"
        >
          <PanelRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex h-full">
        {/* Left Sidebar - Desktop */}
        <div className="w-64 flex-shrink-0">
          <AppSidebar />
        </div>
        
        {/* Chat Area - Desktop */}
        <div className="flex-1 pr-80">
          <ChatInterface />
        </div>
        
        {/* Right Sidebar - Desktop */}
        <RightSidebar />
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden h-full flex flex-col">
        {/* Chat Area - Mobile (full width) */}
        <div className="flex-1 overflow-hidden">
          <ChatInterface />
        </div>
      </div>

      {/* Mobile Overlay Background */}
      {(leftSidebarOpen || rightSidebarOpen) && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebars}
        />
      )}

      {/* Left Sidebar - Mobile Overlay */}
      <div className={cn(
        "md:hidden fixed top-0 left-0 h-full w-80 bg-background border-r border-border z-50 transform transition-transform duration-300 ease-in-out",
        leftSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Menu</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLeftSidebarOpen(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="h-full overflow-hidden">
          <AppSidebar />
        </div>
      </div>

      {/* Right Sidebar - Mobile Overlay */}
      <div className={cn(
        "md:hidden fixed top-0 right-0 h-full w-80 bg-background border-l border-border z-50 transform transition-transform duration-300 ease-in-out",
        rightSidebarOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setRightSidebarOpen(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        <div className="h-full overflow-hidden">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Chat;
        <ChatInterface />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Chat;