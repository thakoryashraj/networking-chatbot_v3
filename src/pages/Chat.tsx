import { ChatInterface } from "@/components/ChatInterface";
import { RightSidebar } from "@/components/RightSidebar";

const Chat = () => {
  return (
    <div className="h-screen">
      <div className="h-full pr-80"> {/* Add right padding to avoid overlap */}
        <ChatInterface />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Chat;