import { Hash } from "lucide-react";
import { IoNotificationsSharp } from "react-icons/io5";
import { TbPinFilled } from "react-icons/tb";
import { MdPeopleAlt } from "react-icons/md";
import { Input } from "../ui/input";
import { BiSolidInbox } from "react-icons/bi";
import { BsFillQuestionCircleFill } from "react-icons/bs";

export function ChannelNavBar() {
  // TODO: Add the server name to the navbar
  // Should be the current channel name: # general ***
  return (
    <div className="w-full h-14 z-50 bg-background border-b-[#202225] border-b-2 shadow-sm flex items-center justify-between px-4 ">
      <div className="flex items-center gap-2">
        <Hash className="w-4 h-4" />
        <p className="font-semibold">Channel=temp</p>
      </div>
      <div className="flex items-center gap-2">
        <IoNotificationsSharp className="w-6 h-6" />
        <TbPinFilled className="w-6 h-6" />
        <MdPeopleAlt className="w-6 h-6" />
        <Input
          placeholder="Search"
          className="w-40 h-6 rounded-sm font-semibold focus-visible:ring-transparent border-none bg-dark"
        />
        <BiSolidInbox className="w-6 h-6" />
        <BsFillQuestionCircleFill className="w-6 h-6" />
      </div>
    </div>
  );
}
