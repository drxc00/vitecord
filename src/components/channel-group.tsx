import { Channel, PublicUser } from "@/types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Hash, Trash } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useParams } from "react-router";
import { CreateChannelDialog } from "./create-channel-dialog";
import { useServersStore } from "@/states/servers";
import { NotificationBadge } from "./notification-badge";

interface ChannelGroupProps {
  type: "text" | "voice";
  selectedChannelId: string;
  channels: Channel[];
  user: PublicUser;
}

export function ChannelGroup({
  channels,
  type,
  selectedChannelId,
  user,
}: ChannelGroupProps) {
  const { id } = useParams<{ id: string }>();
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const removeChannel = useServersStore((state) => state.removeChannel);
  const { getChannelNotifications, clearNotifications } = useServersStore();

  const handleDeleteChannel = (channelId: string) => {
    if (id) {
      if (channels.length <= 1) {
        alert("You cannot delete the last channel.");
        return;
      }
      removeChannel(channelId, id);
      const remainingChannels = channels.filter(
        (channel) => channel.id !== channelId
      );
      if (remainingChannels.length > 0) {
        navigate(`/channels/${id}/${remainingChannels[0].id}`);
      } else {
        navigate(`/channels/${id}`);
      }
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center justify-between cursor-pointer text-xs font-bold text-muted-foreground w-full">
          <div className="flex items-center justify-start">
            <ChevronDown className={`w-4 h-4 ${!isOpen ? "-rotate-90" : ""}`} />
            <p className="uppercase">{type} channels</p>
          </div>
          <div className="flex items-center justify-end">
            <div onClick={(e) => e.stopPropagation()}>
              <CreateChannelDialog />
            </div>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {channels.map((channel) => {
          return (
            <div
              key={channel.id}
              className={cn(
                "flex items-center justify-between p-1 mx-2 text-muted-foreground hover:bg-[#35373c] px-1 font-semibold hover:rounded-md hover:cursor-pointer",
                selectedChannelId === channel.id
                  ? "bg-[#35373c] rounded-md"
                  : ""
              )}
              onClick={() => {
                navigate(`/channels/${id}/${channel.id}`)
                // Clear the notifcations of the user
                clearNotifications(user?.id || "", id || "", channel.id);
              }}
            >
              <div className="flex items-center justify-center">
                <Hash className="w-4 h-4" />
                <p className="ml-1">{channel.name}</p>
              </div>
              <div className="flex gap-2">
                <NotificationBadge count={getChannelNotifications(user?.id || "", id || "", channel.id)} />
                <Trash
                  className="h-4 w-4 hover:text-[#dbdee1] mr-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteChannel(channel.id);
                  }}
                />
              </div>
            </div>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}
