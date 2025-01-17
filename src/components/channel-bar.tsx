import { Compass } from "lucide-react";
import { Separator } from "./ui/separator";
import discordIcon from "@/assets/images/discord-icon.png";
import { CreateServerDialog } from "./create-server-dialog";
import { useServersStore } from "@/states/servers";
import { LoginUser, Server, PublicUser } from "@/types";
import { useAuth } from "@/states/users";
import { useNavigate } from "react-router";
import { useState } from "react";
import { NotificationBadge } from "./notification-badge";
import { useStorageListener } from "@/hooks/use-storage-listener";

const getUserServers = (user: LoginUser) => {
  const servers = useServersStore.getState().servers;
  // Filter server if user is owner or member
  const userServers = servers.filter(
    (server: Server) =>
      server.owner.id === user?.id ||
      server.members.some((member: PublicUser) => member.id === user?.id)
  );
  // Reverse the order of the servers
  return userServers.reverse();
};


const ChannelBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const { getServerNotifications } = useServersStore();

  // Use storageListener
  useStorageListener();

  return (
    <div className="flex flex-col space-y-1">
      <div
        className="p-2"
        onClick={() => {
          navigate("/channels");
        }}
      >
        <div
          className="flex items-center justify-center bg-[#5865f2] rounded-2xl p-2 hover:cursor-pointer"
          onMouseEnter={() => setHoveredIcon("Direct Messages")}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <img src={discordIcon} />
          {hoveredIcon === "Direct Messages" && (
            <div className="absolute left-[70px] transform bg-[#1e1f22] text-[#ffffff] font-medium text-sm p-2 rounded-md shadow-lg">
              {hoveredIcon}
            </div>
          )}
        </div>
      </div>
      <div className="mt-1 pl-4 pr-4">
        <Separator className="bg-[#35363c]" />
      </div>
      <div
        className={`pl-2 pr-2 ${getUserServers(user as LoginUser).length > 0 ? "space-y-2" : ""
          }`}
      >
        {getUserServers(user as LoginUser).map((server: Server) => (
          <div key={server.id}>
            <div
              onMouseEnter={() => setHoveredIcon(server.id)}
              onMouseLeave={() => setHoveredIcon(null)}
              onClick={() => {
                navigate(`/channels/${server.id}/${server.channels.at(0)?.id}`);
              }}
              className="flex items-center justify-center text-[#ffffff] bg-primary w-12 h-12 rounded-full hover:cursor-pointer hover:bg-[#5865f2] hover:rounded-xl transition-all duration-150 ease-in-out relative overflow-visible"
            >
              {server.name.charAt(0).toUpperCase()}
              {hoveredIcon === server.id && (
                <div className="absolute left-[70px] transform bg-[#1e1f22] text-[#ffffff] font-medium text-sm p-2 rounded-md shadow-lg">
                  {server.name}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1">
                <NotificationBadge count={getServerNotifications(user?.id || "", server.id)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Server */}
      <div
        className="flex items-center justify-center p-1 pl-2 pr-2"
        onMouseEnter={() => setHoveredIcon("Add a Server")}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <CreateServerDialog />
        {hoveredIcon === "Add a Server" && (
          <div className="absolute left-[70px] transform bg-[#1e1f22] text-[#ffffff] font-medium text-sm p-2 rounded-md shadow-lg">
            {hoveredIcon}
          </div>
        )}
      </div>
      {/* Discover */}
      <div
        className="p-1 pl-2 pr-2"
        onMouseEnter={() => setHoveredIcon("Discover")}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <div className="flex items-center justify-center text-[#ffffff] bg-primary p-2 rounded-full transition-all duration-150 ease-in-out hover:bg-[#248045] hover:rounded-2xl hover:cursor-pointer">
          <Compass className="h-8 w-8" />
          {hoveredIcon === "Discover" && (
            <div className="absolute left-[70px] transform bg-[#1e1f22] text-[#ffffff] font-medium text-sm p-2 rounded-md shadow-lg">
              {hoveredIcon}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelBar;
