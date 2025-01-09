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
    </div>
  );
};

export default Sidebar;
