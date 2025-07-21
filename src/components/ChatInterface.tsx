import { useEffect } from "react";
import {
  Phone,
  Video,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';

const currentContact = {
  id: "1",
  name: "AI Assistant",
  avatar: "",
  status: "online"
};

export const ChatInterface = () => {
  useEffect(() => {
    createChat({
      webhookUrl: 'https://automation.thinknlink.in/webhook/a5ccd76a-05e7-4584-9066-e803408c4c40/chat',
      target: '#n8n-chat',
      mode: 'fullscreen',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      defaultLanguage: 'en',
      showWelcomeScreen: false,
      initialMessages: [],
      allowFileUploads: true,
      allowedFilesMimeTypes: 'image/*,application/pdf,image/jpeg,image/png,image/gif,image/webp',
      i18n: {
        en: {
          title: 'AI Assistant',
          subtitle: "Start a chat. We're here to help you 24/7.",
          footer: '',
          getStarted: 'New Conversation',
          inputPlaceholder: 'Type your message...',
          closeButtonTooltip: 'Close',
        },
      },
    });
  }, []);

  return (
    <div className="flex flex-col h-full bg-gradient-chat">
      {/* Chat Header - Fixed */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-background/80 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-gradient-primary text-white">
              AI
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">{currentContact.name}</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
        
        {/* <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Phone className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div> */}
      </div>

      {/* N8N Chat Container - Takes full remaining space */}
      <div className="flex-1 min-h-0 n8n-chat-container">
        <div id="n8n-chat" className="h-full w-full"></div>
      </div>

      <style>{`
        :root {
          --chat--color-primary: hsl(var(--primary));
          --chat--color-primary-shade-50: hsl(var(--primary) / 0.9);
          --chat--color-primary-shade-100: hsl(var(--primary) / 0.8);
          --chat--color-secondary: hsl(var(--secondary));
          --chat--color-secondary-shade-50: hsl(var(--secondary) / 0.9);
          --chat--color-white: hsl(var(--background));
          --chat--color-light: hsl(var(--muted));
          --chat--color-light-shade-50: hsl(var(--muted) / 0.8);
          --chat--color-light-shade-100: hsl(var(--muted) / 0.6);
          --chat--color-medium: hsl(var(--border));
          --chat--color-dark: hsl(var(--foreground));
          --chat--color-disabled: hsl(var(--muted-foreground));
          --chat--color-typing: hsl(var(--foreground) / 0.7);

          --chat--spacing: 1rem;
          --chat--border-radius: 18px;
          --chat--transition-duration: 0.2s;

          --chat--window--width: 100%;
          --chat--window--height: 100%;

          --chat--header-height: 0px;
          --chat--header--padding: 0;
          --chat--header--background: transparent;
          --chat--header--color: transparent;
          --chat--header--border-top: none;
          --chat--header--border-bottom: none;

          --chat--textarea--height: 50px;

          --chat--message--font-size: 14px;
          --chat--message--padding: 8px 12px;
          --chat--message--border-radius: 18px;
          --chat--message-line-height: 1.4;
          --chat--message--bot--background: hsl(var(--card));
          --chat--message--bot--color: hsl(var(--foreground));
          --chat--message--bot--border: none;
          --chat--message--user--background: hsl(var(--primary));
          --chat--message--user--color: hsl(var(--primary-foreground));
          --chat--message--user--border: none;
          --chat--message--pre--background: hsl(var(--muted) / 0.5);
        }

        .n8n-chat-container .n8n-chat {
          background: hsl(var(--background));
          font-family: inherit;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .n8n-chat-container .n8n-chat-messages {
          padding: 12px 16px;
          gap: 8px;
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow-y: auto;
          background: hsl(var(--background));
        }

        .n8n-chat-container .n8n-chat-messages-container {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .n8n-chat-container .n8n-chat-message {
          max-width: 70%;
          word-wrap: break-word;
          border-radius: var(--chat--message--border-radius);
          box-shadow: 0 1px 2px 0 hsl(var(--foreground) / 0.1);
          position: relative;
          margin-bottom: 8px;
          font-size: var(--chat--message--font-size);
          line-height: var(--chat--message-line-height);
          padding: var(--chat--message--padding);
        }

        .n8n-chat-container .n8n-chat-message.user {
          align-self: flex-end;
          background: var(--chat--message--user--background);
          color: var(--chat--message--user--color);
          border-bottom-right-radius: 4px;
          margin-left: auto;
        }

        .n8n-chat-container .n8n-chat-message.bot {
          align-self: flex-start;
          background: var(--chat--message--bot--background);
          color: var(--chat--message--bot--color);
          border-bottom-left-radius: 4px;
          margin-right: auto;
          border: 1px solid hsl(var(--border));
        }

        .n8n-chat-container .n8n-chat-message.user::before,
        .n8n-chat-container .n8n-chat-message.bot::before {
          content: '';
          position: absolute;
          bottom: 0;
          width: 0;
          height: 0;
          border: 8px solid transparent;
        }

        .n8n-chat-container .n8n-chat-message.user::before {
          right: -8px;
          border-bottom-color: var(--chat--message--user--background);
          border-right: none;
          border-bottom-left-radius: 16px;
        }

        .n8n-chat-container .n8n-chat-message.bot::before {
          left: -8px;
          border-bottom-color: var(--chat--message--bot--background);
          border-left: none;
          border-bottom-right-radius: 16px;
        }

        .n8n-chat-container .n8n-chat-input-container {
          padding: 12px 16px;
          border-top: 1px solid hsl(var(--border));
          background: hsl(var(--background));
          position: sticky;
          bottom: 0;
          z-index: 10;
        }

        .n8n-chat-container .n8n-chat-input-wrapper {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-radius: 24px;
          padding: 8px 12px;
          transition: all var(--chat--transition-duration);
        }

        .n8n-chat-container .n8n-chat-input-wrapper:focus-within {
          border-color: hsl(var(--primary));
          box-shadow: 0 0 0 3px hsl(var(--primary) / 0.1);
        }

        .n8n-chat-container .n8n-chat-input {
          border: none;
          background: transparent;
          padding: 4px 0;
          color: hsl(var(--foreground));
          font-family: inherit;
          resize: none;
          flex: 1;
          min-height: 20px;
          max-height: 120px;
          outline: none;
          font-size: 14px;
          line-height: 1.4;
        }

        .n8n-chat-container .n8n-chat-input::placeholder {
          color: hsl(var(--muted-foreground));
        }

        .n8n-chat-container .n8n-chat-send-button {
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          border: none;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--chat--transition-duration);
          cursor: pointer;
          flex-shrink: 0;
        }

        .n8n-chat-container .n8n-chat-send-button:hover {
          background: hsl(var(--primary) / 0.9);
          transform: scale(1.05);
        }

        .n8n-chat-container .n8n-chat-send-button:disabled {
          background: hsl(var(--muted));
          color: hsl(var(--muted-foreground));
          cursor: not-allowed;
          transform: none;
        }

        .n8n-chat-container .n8n-chat-attachment-button {
          background: transparent;
          border: none;
          color: hsl(var(--muted-foreground));
          cursor: pointer;
          padding: 4px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--chat--transition-duration);
          width: 24px;
          height: 24px;
          flex-shrink: 0;
        }

        .n8n-chat-container .n8n-chat-attachment-button:hover {
          background: hsl(var(--muted));
          color: hsl(var(--foreground));
        }

        .n8n-chat-container .n8n-chat-file-upload {
          border: 2px dashed hsl(var(--border));
          border-radius: 12px;
          padding: 16px;
          margin: 8px 0;
          background: hsl(var(--muted) / 0.3);
          transition: all var(--chat--transition-duration);
          text-align: center;
          color: hsl(var(--muted-foreground));
        }

        .n8n-chat-container .n8n-chat-file-upload:hover {
          border-color: hsl(var(--primary));
          background: hsl(var(--primary) / 0.05);
          color: hsl(var(--primary));
        }

        .n8n-chat-container .n8n-chat-file-preview {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px;
          background: hsl(var(--muted));
          border-radius: 8px;
          margin: 4px 0;
          border: 1px solid hsl(var(--border));
        }

        .n8n-chat-container .n8n-chat-file-preview img {
          max-width: 60px;
          max-height: 60px;
          border-radius: 4px;
          object-fit: cover;
        }

        .n8n-chat-container .n8n-chat-file-preview .file-info {
          flex: 1;
          font-size: 12px;
          color: hsl(var(--foreground));
        }

        .n8n-chat-container .n8n-chat-typing {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: var(--chat--message--bot--background);
          border-radius: var(--chat--message--border-radius);
          border-bottom-left-radius: 4px;
          align-self: flex-start;
          max-width: 70%;
          color: var(--chat--color-typing);
          margin-bottom: 8px;
          border: 1px solid hsl(var(--border));
          position: relative;
        }

        .n8n-chat-container .n8n-chat-typing::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: -8px;
          width: 0;
          height: 0;
          border: 8px solid transparent;
          border-bottom-color: var(--chat--message--bot--background);
          border-left: none;
          border-bottom-right-radius: 16px;
        }

        .n8n-chat-container .n8n-chat-typing-dots {
          display: flex;
          gap: 2px;
        }

        .n8n-chat-container .n8n-chat-typing-dot {
          width: 6px;
          height: 6px;
          background: var(--chat--color-typing);
          border-radius: 50%;
          animation: typing 1.4s infinite ease-in-out;
        }

        .n8n-chat-container .n8n-chat-typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .n8n-chat-container .n8n-chat-typing-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes typing {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }

        /* Message timestamps */
        .n8n-chat-container .n8n-chat-message-time {
          font-size: 11px;
          color: hsl(var(--muted-foreground));
          margin-top: 4px;
          text-align: right;
        }

        .n8n-chat-container .n8n-chat-message.bot .n8n-chat-message-time {
          text-align: left;
        }

        /* Hide default n8n header since we have our own */
        .n8n-chat-container .n8n-chat-header {
          display: none !important;
        }

        /* Message images */
        .n8n-chat-container .n8n-chat-message img {
          max-width: 200px;
          max-height: 200px;
          border-radius: 8px;
          margin-top: 4px;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .n8n-chat-container .n8n-chat-message img:hover {
          transform: scale(1.02);
        }

        /* Scrollbar styling */
        .n8n-chat-container .n8n-chat-messages-container::-webkit-scrollbar {
          width: 4px;
        }

        .n8n-chat-container .n8n-chat-messages-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .n8n-chat-container .n8n-chat-messages-container::-webkit-scrollbar-thumb {
          background: hsl(var(--muted-foreground) / 0.3);
          border-radius: 2px;
        }

        .n8n-chat-container .n8n-chat-messages-container::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--muted-foreground) / 0.5);
        }

        /* Dark mode specific adjustments */
        .dark .n8n-chat-container .n8n-chat-message.bot::before {
          border-bottom-color: hsl(var(--card));
        }

        .dark .n8n-chat-container .n8n-chat-typing::before {
          border-bottom-color: hsl(var(--card));
        }
      `}</style>
    </div>
  );
};