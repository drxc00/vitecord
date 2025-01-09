import ChannelBar from "@/components/channel-bar";
import Layout from "@/components/layout";
import Sidebar from "@/components/sidebar";

export default function HomePage() {
  return (
    <Layout>
      <div className="flex">
        <div className="h-screen bg-darker w-20 max-w-20">
          <ChannelBar />
        </div>
        <div className="h-screen bg-primary w-60 max-w-60">
          <Sidebar />
        </div>
        {/* main panel goes here */}
        <main className=""></main>
      </div>
    </Layout>
  );
}
