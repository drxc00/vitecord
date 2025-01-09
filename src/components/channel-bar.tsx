import { Separator } from "./ui/separator";
import discordIcon from "@/assets/images/discord-icon.png";

const ChannelBar = () => {
  return (
    <div className="flex flex-col">
      <div className="p-2">
        <div className="bg-[#5865f2] rounded-2xl p-2">
          <img src={discordIcon} />
        </div>
      </div>
      <div className="mt-1 pl-4 pr-4">
        <Separator className="bg-[#35363c]" />
      </div>
    </div>
  );
};

export default ChannelBar;
