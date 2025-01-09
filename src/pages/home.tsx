import ChannelBar from "@/components/channel-bar";
import Layout from "@/components/layout";
import MainHeader from "@/components/main-header";
import Sidebar from "@/components/sidebar";
import { useState } from "react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Friends");

  return (
    <Layout>
      <div className="flex">
        <div className="h-screen bg-darker w-20 max-w-20">
          <ChannelBar />
        </div>
        <div className="h-screen bg-primary w-80 max-w-80">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        {/* main panel goes here */}
        <main className="w-full">
          <MainHeader activeTab={activeTab} />
        </main>
      </div>
    </Layout>
  );
}
