import {
  Gift,
  ImagePlay,
  PlusCircle,
  Shapes,
  Smile,
  Sticker,
} from "lucide-react";
import { Input } from "../ui/input";
import { useState, useRef, useEffect } from "react";
import { useServersStore } from "@/states/servers";
import { useAuth } from "@/states/users";
import { v4 as uuidv4 } from "uuid";
import { Chat } from "@/types";
import { Channel } from "@/types";
import { Message } from "./message";

interface MessageInterface {
  activeChannel: Channel;
  serverId: string;
}

export function Messages({ activeChannel, serverId }: MessageInterface) {

  const [message, setMessage] = useState("");
  const { user } = useAuth();

  const { addMessage } = useServersStore()

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChannel.chats, message]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message)
    setMessage("");
    addMessage({
      id: uuidv4(),
      message: message,
      sender: {
        id: user?.id || "",
        userName: user?.userName || "",
        email: user?.email || "",
        dob: user?.dob || "",
      },
      createdAt: new Date(),
      } as Chat, activeChannel.id, serverId)
  }
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-8rem)] no-scrollbar">
        {activeChannel.chats.map((chat) => (
          <Message key={chat.id} message={chat} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* inputs */}
      <div className="flex items-center justify-start space-x-2 p-2 h-16">
        <div className="relative flex items-center w-full">
          <PlusCircle className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-[#dbdee1] hover:cursor-pointer" />
          <form onSubmit={handleSubmit} className="w-full">
            <Input
              className="bg-[#383a40] border-none h-12 pl-10 pr-10 focus-visible:ring-transparent"
              placeholder={`Message #${activeChannel.name}`}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </form>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-4">
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
