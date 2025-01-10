const MainShopPanel = () => {
  return (
    <div className="pt-14 pl-80 pr-80">
      <style>
        {`
            @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&display=swap');
            .font-fantasy {
              font-family: 'Cinzel Decorative', cursive;
            }
          `}
      </style>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-6xl font-fantasy font-bold">Fantasy</p>
          <p className="mt-6 text-md">
            You're walking in the forest and notice something magical and shiny.
          </p>
        </div>
        <div className="p-2 bg-[#ffffff] text-[#262626] text-sm rounded-sm">
          <button>Shop the Fantasy Collection</button>
        </div>
      </div>
    </div>
  );
};

export default MainShopPanel;
