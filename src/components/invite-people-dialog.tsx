import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { FormControl, FormInput, FormLabel } from "./auth/form-control";
import { toast } from "@/hooks/use-toast";

interface InvitePeopleDialogProps {
    inviteCode: string;
    serverName: string;
}

export function InvitePeopleDialog({ inviteCode, serverName }: InvitePeopleDialogProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div
                    className="flex items-center gap-2 justify-between w-full"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent Event Propagation
                        setIsOpen(true);
                    }}
                >
                    <span>Invite People</span>
                    <UserPlus />
                </div>
            </DialogTrigger>
            <DialogContent className="border-none rounded-sm">
                <DialogHeader>
                    <DialogTitle>Invite People to {serverName}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <FormControl>
                        <FormLabel>SEND A SERVER INVITE TO A FRIEND</FormLabel>
                        <div className="flex items-center gap-2"> 
                            <FormInput value={inviteCode} disabled />
                            <Button 
                            onClick={() => {
                                navigator.clipboard.writeText(inviteCode);
                                toast({
                                    title: "Copied to clipboard",
                                    description: "Invite code copied to clipboard",
                                    className: "border-none rounded-sm bg-darker"
                                })
                            }} 
                            className="bg-blue-600 text-white hover:bg-blue-700 focus:ring-transparent">
                                Copy
                            </Button>
                        </div>
                    </FormControl>
                </div>
            </DialogContent>
        </Dialog>
    )
}
