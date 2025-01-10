import MainShopHeader from "./main-shop-header";
import MainShopPanel from "./main-shop-panel";
import discordShopBanner from "@/assets/images/discord-shop-banner.jpg";

const MainShopView = () => {
  return (
    <div className="flex flex-col h-full">
      <MainShopHeader />
      <div className="flex h-full">
        {/* Main Panel Content */}
        <div
          className="w-full p-4"
          style={{
            background: `
            linear-gradient(to bottom, rgb(0, 0, 0, 0), rgb(49, 51, 56)),
            url(${discordShopBanner}) no-repeat center
            `,
            height: "350px",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <MainShopPanel />
        </div>
      </div>
    </div>
  );
};

export default MainShopView;
