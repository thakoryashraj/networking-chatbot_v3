import { ChatInterface } from "@/components/ChatInterface";
import { RightSidebar } from "@/components/RightSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLeadsRealtime } from "@/hooks/useLeadsRealtime";

const Chat = () => {
  const isMobile = useIsMobile();
useLeadsRealtime();

  return (
    <div className="h-screen">
      <div className={`h-full ${isMobile ? '' : 'pr-80'}`}> {/* Add right padding only on desktop */}
        <ChatInterface />
      </div>
      {!isMobile && <RightSidebar />}
    </div>
  );
};

export default Chat;