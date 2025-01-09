import { Separator } from "@/components/ui/separator";
import SidebarButtons from "./sidebar-buttons";
import { UserRound, CircleGauge, Store } from "lucide-react";

const Sidebar = () => {
  const SidebarButtonsItems = [
    { icon: UserRound, label: "Friends" },
    { icon: CircleGauge, label: "Nitro" },
    { icon: Store, label: "Shop" },
  ];
  return (
    <div className="flex flex-col">
      <div className="p-4">
        <button className="w-full bg-darker text-muted-foreground rounded-md text-xl pl-4 text-left h-10">
          Find or start a conversation
        </button>
      </div>
      <div>
        <Separator className="bg-darker" />
      </div>
      <div className="pl-2 pr-2">
        {SidebarButtonsItems.map((item, index) => (
          <SidebarButtons Icon={item.icon} label={item.label} />
        ))}
      </div>
      <div className="pt-8 pl-6 pr-2">
        <p className="text-muted-foreground font-semibold text-md">
          PLAY AGAIN
        </p>
      </div>
      <div className="flex items-center justify-between pt-8 pl-6 pr-6">
        <p className="text-muted-foreground font-semibold text-md">
          DIRECT MESSAGES
        </p>
        <p className="text-muted-foreground font-semibold text-2xl"> + </p>
      </div>
    </div>
  );
};

export default Sidebar;
