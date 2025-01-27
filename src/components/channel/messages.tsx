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
import { useStorageListener } from "@/hooks/use-storage-listener";

interface MessageInterface {
  currentChannelId: string;
  currentChannelName: string;
  serverId: string;
  messages: Chat[];
}

export function Messages({
  currentChannelId,
  currentChannelName,
  serverId,
  messages,
}: MessageInterface) {
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const { addMessage, clearNotifications } = useServersStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    scrollToBottom();

    // Programatically clear notifications for the channel if the user is in the channel
    if (user?.id) {
      clearNotifications(user.id, serverId, currentChannelId);
    }
  }, [messages]);

  // Add storage event listener
  useStorageListener();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === "") return;
    setMessage("");
    resetTextareaHeight();
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

  const resetTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "3rem";
    }
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
    <div className="flex flex-col flex-1 h-full overflow-hidden">
      <div
        className="flex-1 overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {messages.map((chat) => (
          <Message key={chat.id} message={chat} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* inputs */}
      <div className="mt-auto p-4 flex space-x-3">
        <div className="relative flex items-center w-full">
          <PlusCircle className="absolute left-2 top-3 text-muted-foreground hover:text-[#dbdee1] hover:cursor-pointer" />
          <form onSubmit={handleSubmit} className="w-full">
            {/* Use textarea instead of input */}
            <textarea
              ref={textareaRef}
              className="bg-[#383a40] border-none pl-10 pr-44 focus-visible:ring-transparent w-full overflow-x-auto resize-none min-h-[3rem] flex items-center justify-start py-3"
              placeholder={`Message #${currentChannelName}`}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                handleInputResize(e); // Resize the textarea on text change
              }}
              onKeyDown={handleKeyDown} // Handle Enter key
              rows={1}
              style={{ scrollbarWidth: "none" }}
            />
          </form>
          <div className="absolute right-2 top-3 flex space-x-4 mr-4">
            <Gift className="text-muted-foreground hover:text-[#dbdee1] hover:cursor-pointer" />
            <ImagePlay className="text-muted-foreground hover:text-[#dbdee1] hover:cursor-pointer" />
            <Sticker className="text-muted-foreground hover:text-[#dbdee1] hover:cursor-pointer" />
            <Smile className="text-muted-foreground hover:text-[#dbdee1] hover:cursor-pointer" />
          </div>
        </div>
        <div className="bg-[#383a40] self-end flex items-center justify-center h-12 w-12 max-h-12 max-w-12 p-2 rounded-lg text-muted-foreground hover:cursor-pointer hover:text-[#dbdee1]">
          <Shapes className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
