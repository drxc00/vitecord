import MainFriendsHeader from "./main-friends-header";
import wumpus from "@/assets/images/wumpus.png";

const MainFriendsView = () => {
  return (
    <div className="flex flex-col h-full">
      <MainFriendsHeader />
      <div className="flex h-full">
        {/* Main Panel Content */}
        <div className="w-9/12 h-full flex flex-col items-center justify-center">
          <img src={wumpus} alt="Wumpus" />
          <p className="mt-4 text-muted-foreground">
            No one's around to play with Wumpus.
          </p>
        </div>
        {/* Sidebar */}
        <div className="w-3/12 h-full border-l border-[#3f4147]">
          <div>
            <p className="text-xl p-4 font-bold text-[rgb(255,255,255)]">
              Active Now
            </p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 text-[#ffffff]">
            <p className="text-md font-semibold">It's quiet for now...</p>
            <p className="text-center text-xs pl-6 pr-6 mt-2 text-muted-foreground">
              When a friend starts an activity-like playing a game or hanging
              out on voice-we'll show it here!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFriendsView;
