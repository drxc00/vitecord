import {
  Gift,
  ImagePlay,
  PlusCircle,
  Shapes,
  Smile,
  Sticker,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useServersStore } from "@/states/servers";
import { useAuth } from "@/states/users";
import { v4 as uuidv4 } from "uuid";
import { Chat } from "@/types";
import { Message } from "./message";

interface MessageInterface {
  currentChannelId: string;
  currentChannelName: string;
  serverId: string;
  messages: Chat[];
}

export function Messages({ currentChannelId, currentChannelName, serverId, messages }: MessageInterface) {
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const { addMessage } = useServersStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add storage event listener
  useEffect(() => {
    const handleStorageChange = () => {
      // Force state update when localStorage changes
      useServersStore.persist.rehydrate();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === "") return;
    setMessage("");
    addMessage(
      {
        id: uuidv4(),
        message: message,
        sender: {
          id: user?.id || "",
          userName: user?.userName || "",
          email: user?.email || "",
          dob: user?.dob || "",
        },
        createdAt: new Date(),
      } as Chat,
      currentChannelId,
      serverId
    );
  };

  const handleInputResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    if (textarea.scrollHeight > 150) {
      textarea.style.height = "150px";
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.overflowY = "hidden";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex-1 flex flex-col overflow-y-auto max-h-[calc(100vh-8rem)] no-scrollbar">
        {messages.map((chat) => (
          <Message key={chat.id} message={chat} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* inputs */}
      <div className="flex items-center justify-start space-x-2 p-2">
        <div className="relative flex items-center w-full">
          <PlusCircle className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-[#dbdee1] hover:cursor-pointer" />
          <form onSubmit={handleSubmit} className="w-full">
            {/* Use textarea instead of input */}
            <textarea
              ref={textareaRef}
              className="bg-[#383a40] border-none pl-10 pr-40 focus-visible:ring-transparent w-full overflow-x-auto resize-none min-h-[3rem] flex items-center justify-start py-3"
              placeholder={`Message #${currentChannelName}`}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                handleInputResize(e); // Resize the textarea on text change
              }}
              onKeyDown={handleKeyDown} // Handle Enter key
              rows={1}
            />
          </form>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-4 mr-4">
            <Gift className="text-muted-foreground hover:text-[#dbdee1] hover:cursor-pointer" />
            <ImagePlay className="text-muted-foreground hover:text-[#dbdee1] hover:cursor-pointer" />
            <Sticker className="text-muted-foreground hover:text-[#dbdee1] hover:cursor-pointer" />
            <Smile className="text-muted-foreground hover:text-[#dbdee1] hover:cursor-pointer" />
          </div>
        </div>
        <div className="bg-[#383a40] flex items-center justify-center h-12 w-12 max-h-12 max-w-12 p-2 rounded-lg text-muted-foreground hover:cursor-pointer hover:text-[#dbdee1]">
          <Shapes className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
