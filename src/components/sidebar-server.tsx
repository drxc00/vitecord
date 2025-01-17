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
  Bell,
  Calendar,
  CalendarCheck,
  CalendarPlus,
  ChevronDown,
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
} from "lucide-react";
import { useAuth } from "@/states/users";
import { Separator } from "@radix-ui/react-separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { InvitePeopleDialog } from "./invite-people-dialog";
import { useState } from "react";
import { ChannelGroup } from "./channel-group";
import { PublicUser } from "@/types";

const SidebarServer = () => {
  const { id, channelId } = useParams<{ id: string; channelId: string }>();
  const [isOpen, setIsOpen] = useState(false);

  // Subscribe to server updates
  const server = useServersStore((state) =>
    state.servers.find((server) => server.id === id)
  );

  // Separate channels into text and voice
  const textChannels =
    server?.channels.filter((channel) => channel.type === "text") || [];
  const voiceChannels =
    server?.channels.filter((channel) => channel.type === "voice") || [];

  const { user } = useAuth((state) => state);

  return (
    <>
      <div className="hover:bg-[#f8f8f8]">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger
            className="focus-visible:ring-offset-0 focus-visible:ring-0 h-14"
            asChild
          >
            <Button
              variant="default"
              className="flex items-center justify-between w-full border-b-[#202225] border-t-0 border-l-0 border-r-0 border-b-2 shadow-sm rounded-none bg-primary focus-visible:ring-0"
            >
              <p>{server ? server.name : ""}</p>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ring-0 focus:ring-0 w-60 bg-[#111214] text-[#ffebfa] border-none">
            <DropdownMenuItem className="focus:bg-[#5865f2] focus:text-[#ffebfa] flex items-center justify-between hover:cursor-pointer">
              Server Boost
              <Diamond />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="focus:bg-[#5865f2] text-[#5865f2] focus:text-[#ffebfa] flex items-center justify-between hover:cursor-pointer"
              // Prevent event building since we are triggering the dialog from the dropdown menu
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
              }}
            >
              <InvitePeopleDialog
                inviteCode={server?.inviteCode || ""}
                serverName={server?.name || ""}
              />
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#5865f2] focus:text-[#ffebfa] flex items-center justify-between hover:cursor-pointer">
              Server Settings
              <Settings />
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#5865f2] focus:text-[#ffebfa] flex items-center justify-between hover:cursor-pointer">
              Create Channel
              <CirclePlus />
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#5865f2] focus:text-[#ffebfa] flex items-center justify-between hover:cursor-pointer">
              Create Category
              <FolderPlus />
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#5865f2] focus:text-[#ffebfa] flex items-center justify-between hover:cursor-pointer">
              Create Event
              <CalendarPlus />
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#5865f2] focus:text-[#ffebfa] flex items-center justify-between hover:cursor-pointer">
              App Directory
              <Shapes />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="focus:bg-[#5865f2] focus:text-[#ffebfa] flex items-center justify-between hover:cursor-pointer">
              Notification Settings
              <Bell />
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#5865f2] focus:text-[#ffebfa] flex items-center justify-between hover:cursor-pointer">
              Privacy Settings
              <Shield />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="focus:bg-[#5865f2] focus:text-[#ffebfa] flex items-center justify-between hover:cursor-pointer">
              Edit Server Profile
              <Pen />
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[#5865f2] focus:text-[#ffebfa] flex items-center justify-between hover:cursor-pointer">
              Hide Muted Channels
              <Square />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Channel Goes here */}
      <div className="flex-1 w-full">
        <div className="p-1 pr-2 pl-2 pb-0">
          <Dialog>
            <DialogTrigger asChild>
              <div className="w-full flex items-center justify-start pt-2 pl-1 pr-1 pb-2 text-muted-foreground hover:bg-[#35373c] hover:rounded-lg hover:cursor-pointer hover:text-[#dbdee1]">
                <Calendar className="w-5 h-5" />
                <p className="ml-2">Events</p>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-[600px] max-h-[600px] p-0 m-0 border-0">
              <DialogHeader className="bg-[#1e1f22] p-4 text-bold">
                <div className="flex space-x-3 items-center justify-start">
                  <div className="flex">
                    <Calendar className="h-6 w-6" />
                    <p className="ml-2">Events</p>
                  </div>
                  <div className="w-[1px] pt-2 pb-2 bg-[#2d2f33]"></div>
                  <div className="p-1 rounded-md bg-[#4752c4] text-xs">
                    Create Event
                  </div>
                </div>
              </DialogHeader>
              <div className="h-80 p-4 pr-8 pl-8 w-full flex flex-col items-center justify-center">
                <CalendarCheck className="w-16 h-16" />
                <p className="mt-4 text-2xl font-bold">
                  There are no upcoming events.
                </p>
                <p className="text-center">
                  Schedule an event for any planned activity in your server. You
                  can give other people permission to create events in
                </p>
                <span className="text-[#04a1ed]">
                  Server Settings {">"} Role .
                </span>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="p-2 pt-2">
          <Separator className="bg-[#3e3c44] w-full h-[1px]" />
        </div>
        <div className="flex flex-col gap-2">
          <ChannelGroup
            channels={textChannels}
            user={user as PublicUser}
            selectedChannelId={channelId || ""}
            type="text"
          />
          <ChannelGroup
            channels={voiceChannels}
            user={user as PublicUser}
            selectedChannelId={channelId || ""}
            type="voice"
          />
        </div>
      </div>
      {/* account section */}
      <div className="max-h-12 h-12 bg-[#232428] flex items-center justify-between ">
        <div className="p-2">
          <div className="flex items-center justify-center max-w-36 hover:bg-[#3e3c44] p-1 pr-4 rounded-xl text-[#f8f8f8] hover:cursor-pointe">
            <div
              className=" p-2 h-8 w-8 min-w-8 rounded-full bg-cover"
              style={{
                backgroundImage: `url(https://placecats.com/millie/75/75)`,
              }}
            ></div>
            <p className="ml-2 truncate">{user?.userName}</p>
          </div>
        </div>
        <div className="flex items-center justify-end h-full mr-2 p-0 text-muted-foreground hover:cursor-pointer">
          <div className="p-2 hover:bg-[#383940] rounded-md hover:text-[#dbdee1]">
            <Mic className="w-5 h-5 min-w-5 min-h-5 hover:text-[#dbdee1]" />
          </div>
          <div className="p-2 hover:bg-[#383940] rounded-md hover:text-[#dbdee1]">
            <Headset className="w-5 h-5 min-w-5 min-h-5 hover:text-[#dbdee1] hover:bg-[#383940]" />
          </div>
          <div className="p-2 hover:bg-[#383940] rounded-md hover:text-[#dbdee1]">
            <Settings className="w-5 h-5 min-w-5 min-h-5 hover:text-[#dbdee1] hover:bg-[#383940]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarServer;
