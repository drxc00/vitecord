import { Compass } from "lucide-react";
import { Separator } from "./ui/separator";
import discordIcon from "@/assets/images/discord-icon.png";
import { CreateServerDialog } from "./create-server-dialog";
import { useServersStore } from "@/states/servers";
import { LoginUser, Server, PublicUser } from "@/types";
import { useAuth } from "@/states/users";
import { useNavigate } from "react-router";

const getUserServers = (user: LoginUser) => {
  const servers = useServersStore.getState().servers;
  // Filter server if user is owner or member
  const userServers = servers.filter((server: Server) => server.owner.id === user?.id || server.members.some((member: PublicUser) => member.id === user?.id));
  return userServers;
}

const ChannelBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col space-y-1">
      <div className="p-2">
        <div className="bg-[#5865f2] rounded-2xl p-2">
          <img src={discordIcon} />
        </div>
      </div>
      <div className="mt-1 pl-4 pr-4">
        <Separator className="bg-[#35363c]" />
      </div>
      <div className="p-1 pl-2 pr-2 space-y-2">
        {getUserServers(user as LoginUser).map((server: Server) => (
          <div 
            onClick={() => {
              navigate(`/server/${server.id}`);
            }}
            key={server.id} 
            className="flex items-center justify-center text-[#ffffff] bg-primary w-12 h-12 rounded-full hover:cursor-pointer">
            {server.name.charAt(0).toUpperCase()}
          </div>
        ))}
      </div>
      {/* Add Server */}
      <div className="p-1 pl-2 pr-2">
        <CreateServerDialog />
      </div>
      {/* Discover */}
      <div className="p-1 pl-2 pr-2">
        <div className="flex items-center justify-center text-[#ffffff] bg-primary p-2 rounded-full transition-all duration-150 ease-in-out hover:bg-[#248045] hover:rounded-2xl hover:cursor-pointer">
          <Compass className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};

export default ChannelBar;
