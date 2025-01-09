import { UserRound, CircleGauge, Store } from "lucide-react";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

type SidebarProps = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
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
            <div className="flex flex-1">
              <Store className="w-6 h-6" />
              <span className="ml-4">Shop</span>
            </div>
            <div>
              <Badge className="bg-[#da373c] pl-2 pr-2 pt-0 pb-0 text-xs font-semibold text-[#ffffff] hover:bg-[#da373c] hover:text-[#ffffff]">
                NEW
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 pl-4">
        <p className="text-muted-foreground font-bold text-xs">PLAY AGAIN</p>
      </div>
    </div>
  );
};

export default Sidebar;
