import { CircleHelp, Inbox, MessageCircle, UserRound } from "lucide-react";

const MainFriendsHeader = () => {
  return (
    <div className="flex p-2 border-b border-b-darker text-[#b5bac1]">
      {/* Friends */}
      <div className="flex items-center flex-1 h-8 p-2">
        <div className="flex">
          <UserRound className="h-6 w-6" />
          <span className="ml-2 font-bold">Friends</span>
        </div>
        <div className="h-full w-[1px] ml-4 bg-[#3e4047]"></div>
        <div className="flex items-center justify-center space-x-2">
          <div className="ml-6 font-semibold bg-[#3f4248] text-[#ffffff] pl-2 pr-2 pt-0 pb-0 rounded-md hover:cursor-pointer">
            Online
          </div>
          <div className="p-0 pl-2 pr-2 rounded-lg font-semibold hover:cursor-pointer hover:bg-[#35373c] hover:text-[#f8f8f8]">
            All
          </div>
          <div className="p-0 pl-2 pr-2 rounded-lg font-semibold hover:cursor-pointer hover:bg-[#35373c] hover:text-[#f8f8f8]">
            Pending
          </div>
          <div className="p-0 pl-2 pr-2 rounded-lg font-semibold hover:cursor-pointer hover:bg-[#35373c] hover:text-[#f8f8f8]">
            Blocked
          </div>
          <div className="font-semibold bg-[#248045] pl-2 pr-2 pt-0 pb-0 rounded-md hover:cursor-pointer">
            Add Friend
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4 mr-2">
        <MessageCircle className="hover:cursor-pointer hover:text-[#f8f8f8]" />
        <Inbox className="hover:cursor-pointer hover:text-[#f8f8f8]" />
        <CircleHelp className="hover:cursor-pointer hover:text-[#f8f8f8]" />
      </div>
    </div>
  );
};

export default MainFriendsHeader;
