import { MembersBar } from "@/components/channel/members-bar";
import { Messages } from "@/components/channel/messages";
import { ChannelNavBar } from "@/components/channel/nav-bar";
import Layout from "@/components/layout";
import { useServersStore } from "@/states/servers";
import { useNavigate, useParams } from "react-router";

export default function Channel() {
  const { id } = useParams<{ id: string }>();
  const { servers } = useServersStore((state) => state);
  const navigate = useNavigate();

  const server = servers.find((server) => server.id === id);

  // Prevent the user from accessing a channel that doesn't exist
  if (!server) {
    navigate("/channels");
  }
  return (
    <Layout>
      <main className="w-full">
        <div className="flex flex-col w-full h-full">
          <div>
            <ChannelNavBar />
          </div>
          <div className="flex flex-row h-full">
            <Messages />
            <MembersBar members={server?.members || []} />
          </div>
        </div>
      </main>
    </Layout>
  );
}
