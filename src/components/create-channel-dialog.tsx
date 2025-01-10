import { Hash, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { HiSpeakerWave } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { IoMdRadioButtonOn, IoMdRadioButtonOff } from "react-icons/io";
import { FormControl, FormInput, FormLabel } from "./auth/form-control";
import { toast } from "@/hooks/use-toast";
import { useServersStore } from "@/states/servers";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router";

export function CreateChannelDialog() {
    const [channelType, setChannelType] = useState<"text" | "voice">("text");
    const [channelName, setChannelName] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    const { addChannel } = useServersStore();
    const { id } = useParams<{ id: string }>();

    const handleCreateChannel = () => {
        if (!channelName || !channelType) {
            toast({
                title: "Please fill in all fields",
                variant: "destructive"
            });
            return;
        };

        // Check if channel name is valid 
        // There should be no spaces, special characters, or numbers
        if (channelName.includes(" ") ||
            channelName.includes("!") ||
            channelName.includes("?") ||
            channelName.includes(".") ||
            channelName.includes(",") ||
            channelName.includes(";") ||
            channelName.includes(":")) {
            toast({
                title: "Channel name cannot contain spaces",
                variant: "destructive"
            });
            return;
        }
        addChannel({
            id: uuidv4(),
            name: channelName,
            type: channelType,
            chats: [],
        }, id as string);
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button><Plus className="w-4 h-4" /></Button>
            </DialogTrigger>
            <DialogContent className="border-none rounded-sm">
                <DialogHeader>
                    <DialogTitle>
                        <div>
                            <h1 className="text-2xl font-bold">Create Channel</h1>
                            <p className="text-sm text-muted-foreground">Create a new channel to start chatting</p>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <ChannelType
                        type="text"
                        description="Send messages, images, GIFs, emoji, opinions, and puns"
                        icon={<Hash />}
                        setChannelType={setChannelType}
                        isSelected={channelType === "text"} />
                    <ChannelType
                        type="voice"
                        description="Hangout together with voice, video, and screen share"
                        icon={<HiSpeakerWave className="w-6 h-6" />}
                        setChannelType={setChannelType}
                        isSelected={channelType === "voice"} />
                </div>
                <div className="flex flex-col gap-2">
                    <FormControl>
                        <FormLabel>CHANNEL NAME</FormLabel>
                        <FormInput
                            placeholder="new-channel"
                            value={channelName}
                            onChange={(e) => setChannelName(e.target.value)} />

                    </FormControl>
                </div>
                <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        onClick={handleCreateChannel}
                        className="bg-blue-500 text-primary-foreground"
                        disabled={channelName.length === 0}
                    >Create channel</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

interface ChannelTypeProps {
    type: "text" | "voice";
    description: string;
    icon: React.ReactNode;
    setChannelType: (type: "text" | "voice") => void;
    isSelected: boolean;
}

function ChannelType({ type, description, icon, setChannelType, isSelected }: ChannelTypeProps) {
    return <div
        onClick={() => setChannelType(type)}
        className={cn("flex items-center justify-between gap-2 bg-dark/60 p-3 rounded-sm cursor-pointer", isSelected && "bg-muted")}>
        <div className="flex items-center gap-2">
            <div className="flex items-center text-muted-foreground">
                {icon}
            </div>
            <div className="flex flex-col items-start justify-start">
                <h1 className="text-md capitalize">{type} </h1>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
        <div className="flex items-center justify-end text-primary-foreground">
            {isSelected ? <IoMdRadioButtonOn className="w-6 h-6" /> : <IoMdRadioButtonOff className="w-6 h-6" />}
        </div>
    </div>
}

