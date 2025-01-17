import { MembersBar } from "@/components/channel/members-bar";
import { Messages } from "@/components/channel/messages";
import { ChannelNavBar } from "@/components/channel/nav-bar";
import Layout from "@/components/layout";
import { useServersStore } from "@/states/servers";
import { useNavigate, useParams } from "react-router";
import { Channel as ChannelType } from "@/types";

export default function Channel() {
  const { id, channelId } = useParams<{ id: string; channelId: string }>();
  const { servers } = useServersStore((state) => state);
  const navigate = useNavigate();

  const server = servers.find((server) => server.id === id);

  // Prevent the user from accessing a channel that doesn't exist
  if (!server) {
    navigate("/channels");
  }

  const activeChannel = server?.channels.find(
    (channel) => channel.id === channelId
  );

  return (
    <Layout>
      <main className="w-full h-screen overflow-hidden">
        <div className="flex flex-col w-full h-full">
          <div>
            <ChannelNavBar activeChannel={activeChannel as ChannelType} />
          </div>
          <div className="flex flex-row flex-1 overflow-hidden">
            <Messages
              currentChannelName={activeChannel?.name || ""}
              currentChannelId={activeChannel?.id || ""}
              serverId={server?.id || ""}
              messages={activeChannel?.chats || []}
            />
            <MembersBar
              owner={
                server?.owner || { id: "", email: "", userName: "", dob: "" }
              }
              members={server?.members || []}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}
