import discordIcon from "@/assets/images/discord-icon.png";

const MainShopHeader = () => {
  return (
    <div className="flex p-2 bg-[rgba(27,32,49,0.4)] opacity-0 text-[#ffffff] border-b border-b-darker">
      {/* Friends */}
      <div className="flex items-center flex-1 h-8 p-2 opacity-100">
        <img src={discordIcon} className="h-6 w-6 max-h-6 max-w-6" />
        <p className="ml-2 text-md">
          <span className="font-bold">Vitecord</span> Shop
        </p>
      </div>
    </div>
  );
};

export default MainShopHeader;
