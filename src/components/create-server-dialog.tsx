import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, Plus } from "lucide-react";
import CreateServerIcon from "@/assets/create_server_icon.svg";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FormControl, FormInput, FormLabel } from "./auth/form-control";
import { useAuth } from "@/states/users";
import { useServersStore } from "@/states/servers";
import { PublicUser, Server } from "@/types";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";

export function CreateServerDialog() {
    const [currentView, setCurrentView] = useState<'main' | 'create' | 'join'>('main');
    const [serverName, setServerName] = useState('');
    const navigate = useNavigate();

    // Stores
    const { user } = useAuth();
    const { addServer } = useServersStore();

    const renderContent = () => {
        switch (currentView) {
            case 'create':
                return (
                    <div className="flex flex-col text-center items-center gap-2">
                        <div className="flex flex-col items-center justify-center gap-2 p-6">
                            <h1 className="text-2xl font-bold">Customize your server</h1>
                            <p className="text-md text-muted-foreground">
                                Give your new server a personality with a name and an icon. You can always change it later.
                            </p>
                            <div className="w-full">
                                <FormControl>
                                    <FormLabel className="text-left text-xs font-semibold text-primary-foreground">SERVER NAME</FormLabel>
                                    <FormInput placeholder="Server Name" value={serverName} onChange={(e) => setServerName(e.target.value)} />
                                    <p className="text-xs text-muted-foreground text-left">By creating a server, you agree to Discord's <span className="text-blue-400">Community Guidelines</span>.</p>
                                </FormControl>
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 p-4 bg-dark/60 w-full">
                            <Button variant="ghost" className="text-muted-foreground" onClick={() => setCurrentView('main')}>
                                Back
                            </Button>
                            <Button
                                className="bg-blue-600 rounded-sm text-white hover:bg-green-600"
                                onClick={() => {
                                    if (serverName === '') {
                                        toast({
                                            title: 'Please enter a server name',
                                            variant: 'destructive',
                                        });
                                        return;
                                    }

                                    // Create server
                                    const serverId = uuidv4();

                                    // Convert user to public user
                                    const pUser = {
                                        id: user?.id as string,
                                        userName: user?.userName as string,
                                        email: user?.email as string,
                                    } as PublicUser

                                    // Add server to store
                                    addServer({
                                        id: serverId,
                                        name: serverName,
                                        channels: [],
                                        inviteCode: "",
                                        members: [
                                            pUser
                                        ],
                                        owner: pUser,
                                    } as Server);
                                    navigate(`/channels/${serverId}`);
                                }}
                            >Create</Button>
                        </div>
                    </div>
                );
            case 'join':
                return (
                    <div className="flex flex-col text-center items-center gap-2">
                        <div className="flex flex-col items-center justify-center gap-2 p-6 w-full">
                            <h1 className="text-2xl font-bold">Join a server</h1>
                            <p className="text-md text-muted-foreground">
                                Enter an invite below to join an existing server.
                            </p>
                            <div className="w-full">
                                <FormControl>
                                    <FormLabel className="text-left text-xs font-semibold text-primary-foreground">INVITE LINK <span className="text-red-500">*</span></FormLabel>
                                    <FormInput placeholder="Enter the code lol" />
                                </FormControl>
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-2 p-4 bg-dark/60 w-full">
                            <Button variant="ghost" className="text-muted-foreground" onClick={() => setCurrentView('main')}>
                                Back
                            </Button>
                            <Button className="bg-blue-600 rounded-sm text-white hover:bg-green-600">Join Server</Button>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="flex flex-col text-center items-center gap-2">
                        <div className="flex flex-col items-center justify-center gap-2 p-6">
                            <h1 className="text-2xl font-bold">Create a new server</h1>
                            <p className="text-md text-muted-foreground">
                                Your server is where you and your friends hang out.
                                Make yours and start talking.
                            </p>
                            <div
                                onClick={() => setCurrentView('create')}
                                className="flex p-2 border rounded-lg hover:bg-muted hover:cursor-pointer border-muted items-center justify-between gap-2 w-full">
                                <div className="flex items-center gap-2">
                                    <div>
                                        <img src={CreateServerIcon} />
                                    </div>
                                    <h1 className="font-bold">Create My Own</h1>
                                </div>
                                <ArrowRight className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2 p-4 bg-dark/60 w-full">
                            <h1 className="text-lg font-semibold">Have an invite already?</h1>
                            <Button className="w-full bg-muted rounded-sm hover:bg-muted-foreground hover:text-white" onClick={() => setCurrentView('join')}>
                                Join a Server
                            </Button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <Dialog>
            <DialogTrigger>
                <div className="flex items-center justify-center text-[#248045] bg-primary p-2 rounded-full transition-all duration-150 ease-in-out hover:bg-[#248045] hover:text-[#ffffff] hover:rounded-2xl hover:cursor-pointer">
                    <Plus className="h-8 w-8" />
                </div>
            </DialogTrigger>
            <DialogContent className="rounded-sm border-none p-0">
                {renderContent()}
            </DialogContent>
        </Dialog>
    );
}
