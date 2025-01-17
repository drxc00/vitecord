import Layout from "@/components/layout";
import MainFriendsView from "@/components/main-friends-view";
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
        {/* main panel goes here */}
        <main className="w-full">
          {activeTab === "Friends" && <MainFriendsView />}
        </main>
      </div>
    </Layout>
  );
}
