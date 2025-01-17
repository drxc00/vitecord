import { Hash } from "lucide-react";
import { IoNotificationsSharp } from "react-icons/io5";
import { TbPinFilled } from "react-icons/tb";
import { MdPeopleAlt } from "react-icons/md";
import { Input } from "../ui/input";
import { BiSolidInbox } from "react-icons/bi";
import { BsFillQuestionCircleFill } from "react-icons/bs";

interface Channel {
  name: string;
}

export function ChannelNavBar({ activeChannel }: { activeChannel: Channel }) {
  return (
    <div className="w-full h-14 z-50 bg-background border-b-[#202225] border-b-2 shadow-sm flex items-center justify-between px-4 ">
      <div className="flex items-center gap-2">
        <Hash className="w-6 h-6" />
        <p className="font-bold">{activeChannel?.name}</p>
      </div>
      <div className="flex items-center gap-2">
        <IoNotificationsSharp className="w-6 h-6 hover:cursor-pointer text-muted-foreground hover:text-[#f8f8f8]" />
        <TbPinFilled className="w-6 h-6 hover:cursor-pointer text-muted-foreground hover:text-[#f8f8f8]" />
        <MdPeopleAlt className="w-6 h-6 hover:cursor-pointer text-muted-foreground hover:text-[#f8f8f8]" />
        <Input
          placeholder="Search"
          className="w-40 h-8 rounded-sm font-semibold focus-visible:ring-transparent border-none bg-dark"
        />
        <BiSolidInbox className="w-6 h-6 hover:cursor-pointer text-muted-foreground hover:text-[#f8f8f8]" />
        <BsFillQuestionCircleFill className="w-6 h-6 hover:cursor-pointer text-muted-foreground hover:text-[#f8f8f8]" />
      </div>
    </div>
  );
}
