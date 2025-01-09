import { CircleHelp, Inbox, MessageCircle, UserRound } from "lucide-react";

type MainHeaderProps = {
  activeTab: string;
};

const MainHeader: React.FC<MainHeaderProps> = ({ activeTab }) => {
  return (
    <div className="flex p-2 border-b border-b-darker text-[#b5bac1]">
      {/* Friends */}
      <div className="flex items-center flex-1 h-8 p-2">
        <div className="flex">
          <UserRound className="h-6 w-6" />
          <span className="ml-2 font-bold">Friends</span>
        </div>
        <div className="h-full w-[1px] ml-4 bg-[#3e4047]"></div>
        <div className="ml-6 font-semibold bg-[#3f4248] text-[#ffffff] pl-2 pr-2 pt-0 pb-0 rounded-md hover:cursor-pointer">
          Online
        </div>
        <div className="ml-10 font-semibold hover:cursor-pointer">All</div>
        <div className="ml-10 font-semibold hover:cursor-pointer">Pending</div>
        <div className="ml-10 font-semibold hover:cursor-pointer">Blocked</div>
        <div className="ml-10 font-semibold bg-[#248045] pl-2 pr-2 pt-0 pb-0 rounded-md hover:cursor-pointer">
          Add Friend
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <MessageCircle />
        <Inbox />
        <CircleHelp />
      </div>
    </div>
  );
};

export default MainHeader;
