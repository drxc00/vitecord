import {
  Gift,
  ImagePlay,
  PlusCircle,
  Shapes,
  Smile,
  Sticker,
} from "lucide-react";
import { Input } from "../ui/input";

interface Channel {
  name: string;
}

export function Messages({ activeChannel }: { activeChannel: Channel }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex-1"></div>
      {/* inputs */}
      <div className="flex items-center justify-start space-x-2 p-2 h-16">
        <div className="relative flex items-center w-full">
          <PlusCircle className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-[#dbdee1] hover:cursor-pointer" />
          <Input
            className="bg-[#383a40] border-none h-12 pl-10 pr-10 focus-visible:ring-transparent"
            placeholder={`Message #${activeChannel.name}`}
          />
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
