import { UserRound, CircleGauge, Store } from "lucide-react";
import { useState } from "react";
import { Separator } from "./ui/separator";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("Friends");

  return (
    <div className="flex flex-col">
      <div className="p-2">
        <button className="w-full bg-darker text-muted-foreground rounded-md text-xs pl-4 text-left h-8">
          Find or start a conversation
        </button>
      </div>
      <div>
        <Separator className="bg-darker" />
      </div>

      <div className="p-2">
        <div
          className={`mb-1 p-2 w-full rounded-md ${
            activeTab === "Friends"
              ? "bg-[#3f4248] text-[#ffffff]"
              : "bg-transparent text-muted-foreground"
          } hover:cursor-pointer hover:bg-[#35373c]`}
          onClick={() => setActiveTab("Friends")}
        >
          <div className="flex items-center justify-start font-semibold">
            <UserRound className="w-6 h-6" />
            <span className="ml-4">Friends</span>
          </div>
        </div>

        <div
          className={`mb-1 p-2 w-full rounded-md ${
            activeTab === "Nitro"
              ? "bg-[#3f4248] text-[#ffffff]"
              : "bg-transparent text-muted-foreground"
          } hover:cursor-pointer hover:bg-[#35373c]`}
          onClick={() => setActiveTab("Nitro")}
        >
          <div className="flex items-center justify-start font-semibold">
            <CircleGauge className="w-6 h-6" />
            <span className="ml-4">Nitro</span>
          </div>
        </div>

        <div
          className={`mb-1 p-2 w-full rounded-md ${
            activeTab === "Shop"
              ? "bg-[#3f4248] text-[#ffffff]"
              : "bg-transparent text-muted-foreground"
          } hover:cursor-pointer hover:bg-[#35373c]`}
          onClick={() => setActiveTab("Shop")}
        >
          <div className="flex items-center justify-start font-semibold">
            <Store className="w-6 h-6" />
            <span className="ml-4">Shop</span>
          </div>
        </div>
      </div>

      <div className="pt-8 pl-6 pr-2">
        <p className="text-muted-foreground font-semibold text-md">
          PLAY AGAIN
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
