import { Channel } from "@/types";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Hash } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useParams } from "react-router";
import { CreateChannelDialog } from "./create-channel-dialog";

interface ChannelGroupProps {
    type: "text" | "voice";
    selectedChannelId: string;
    channels: Channel[];
}

export function ChannelGroup({ channels, type, selectedChannelId }: ChannelGroupProps) {
    const { id } = useParams<{ id: string }>();
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();
    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="w-full px-2">
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
                    return <div
                        key={channel.id}
                        className={
                            cn("flex items-center justify-start p-1 mx-2 text-muted-foreground hover:bg-[#35373c] px-1 font-semibold hover:rounded-md hover:cursor-pointer",
                                selectedChannelId === channel.id ? "bg-[#35373c] rounded-md" : ""
                            )
                        }
                        onClick={() => navigate(`/channels/${id}/${channel.id}`)}
                    >
                        <Hash className="w-4 h-4" />
                        <p className="ml-1">{channel.name}</p>
                    </div>
                })}
            </CollapsibleContent>
        </Collapsible>
    )
}
