import Layout from "@/components/layout";
import MainFriendsView from "@/components/main-friends-view";
import MainShopView from "@/components/main-shop-view";
import Sidebar from "@/components/sidebar";
import { useAuth } from "@/states/users";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("Friends");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Layout>
      <div className="flex w-full">
        <div className="h-screen bg-primary w-80 max-w-80">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        {/* main panel goes here */}
        <main className="w-full">
          {activeTab === "Friends" && <MainFriendsView />}
          {activeTab === "Shop" && <MainShopView />}
        </main>
      </div>
    </Layout>
  );
}
