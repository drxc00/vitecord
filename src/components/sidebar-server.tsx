import { useServersStore } from "@/states/servers";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowDown,
  Bell,
  CalendarPlus,
  CirclePlus,
  Diamond,
  FolderPlus,
  Headset,
  Mic,
  Pen,
  Settings,
  Shapes,
  Shield,
  Square,
  UserPlus,
} from "lucide-react";
import { useAuth } from "@/states/users";

const SidebarServer = () => {
  const { id } = useParams<{ id: string }>();

  const server = useServersStore((state) =>
    state.servers.find((server) => server.id === id)
  );

  const { user } = useAuth((state) => state);

  return (
    <>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger
            className="focus-visible:ring-offset-0 focus-visible:ring-0"
            asChild
          >
            <Button
              variant="default"
              className="flex items-center justify-between w-full border-b-[#202225] border-t-0 border-l-0 border-r-0 border-b-2 shadow-sm rounded-none bg-primary focus-visible:ring-0"
            >
              <p>{server ? server.name : ""}</p>
              <ArrowDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ring-0 focus:ring-0 w-60 bg-[#111214] text-[#ffebfa] border-none">
            <DropdownMenuItem className="focus:bg-[#5865f2] focus:text-[#ffebfa] flex items-center justify-between">
              Server Boost
              <Diamond />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="focus:bg-[#5865f2] text-[#5865f2] focus:text-[#ffebfa] flex items-center justify-between">
              Invite People
              <UserPlus />
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#5865f2] focus:text-[#ffebfa] flex items-center justify-between">
              Server Settings
              <Settings />
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#5865f2] focus:text-[#ffebfa] flex items-center justify-between">
              Create Channel
              <CirclePlus />
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#5865f2] focus:text-[#ffebfa] flex items-center justify-between">
              Create Category
              <FolderPlus />
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#5865f2] focus:text-[#ffebfa] flex items-center justify-between">
              Create Event
              <CalendarPlus />
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#5865f2] focus:text-[#ffebfa] flex items-center justify-between">
              App Directory
              <Shapes />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="focus:bg-[#5865f2] focus:text-[#ffebfa] flex items-center justify-between">
              Notification Settings
              <Bell />
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#5865f2] focus:text-[#ffebfa] flex items-center justify-between">
              Privacy Settings
              <Shield />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="focus:bg-[#5865f2] focus:text-[#ffebfa] flex items-center justify-between">
              Edit Server Profile
              <Pen />
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#5865f2] focus:text-[#ffebfa] flex items-center justify-between">
              Hide Muted Channels
              <Square />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex-1">Channels</div>
      <div className="max-h-12 h-12 bg-[#232428] flex items-center justify-between">
        <div className="p-2">
          <div className="flex items-center justify-center max-w-36 hover:bg-[#3e3c44] p-1 pr-4 rounded-xl">
            <div className="bg-blue-700 p-2 h-8 w-8 min-w-8 rounded-full"></div>
            <p className="ml-2 truncate">{user?.userName}</p>
          </div>
        </div>
        <div className="flex space-x-2 mr-4">
          <Mic className="w-5 h-5" />
          <Headset className="w-5 h-5" />
          <Settings className="w-5 h-5" />
        </div>
      </div>
    </>
  );
};

export default SidebarServer;
