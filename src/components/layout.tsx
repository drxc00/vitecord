import { useLocation } from "react-router";
import ChannelBar from "./channel-bar";
import Sidebar from "./sidebar";
import { Toaster } from "./ui/toaster";

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const isChannelPage =
    location.pathname === "/channels" || location.pathname === "/channels/";

  return (
    <div className="font-sans flex">
      <div className="h-screen bg-darker w-full max-w-16">
        <ChannelBar />
      </div>
      <div className="h-screen bg-primary w-80 max-w-80">
        <Sidebar isChannelPage={isChannelPage} />
      </div>
      {children}
      <Toaster />
    </div>
  );
}
