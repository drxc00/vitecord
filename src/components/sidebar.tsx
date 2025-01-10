import SidebarChannel from "./sidebar-channel";
import SidebarServer from "./sidebar-server";

interface SidebarProps {
  isChannelPage: boolean;
}

const Sidebar = ({ isChannelPage }: SidebarProps) => {
  console.log(isChannelPage);
  return (
    <div className="max-w-80 h-screen max-h-screen flex flex-col">
      {/* if it is channel page, then it is home page simply render the homepage sidebar if it is not simply render the channel sidebar */}

      {isChannelPage ? <SidebarChannel /> : <SidebarServer />}
    </div>
  );
};

export default Sidebar;
