import MainFriendsHeader from "./main-friends-header";

const MainFriendsView = () => {
  return (
    <div className="flex flex-col h-full">
      <MainFriendsHeader />
      <div className="flex h-full">
        {/* Main Panel Content */}
        <div className="w-4/5 h-full">Main Panel Content</div>
        {/* Sidebar */}
        <div className="w-1/5 h-full border-l border-[#3f4147]">Sidebar</div>
      </div>
    </div>
  );
};

export default MainFriendsView;
