const SidebarButtons = ({ Icon, label }) => {
  return (
    <div className="">
      <button
        className={`mt-2 pl-4 pr-4 pt-3 pb-3 rounded-md flex w-full text-md font-semibold ${
          label === "Friends" ? "bg-[#404249]" : ""
        }`}
      >
        <Icon size={30} />
        <span className="ml-5">{label}</span>
      </button>
    </div>
  );
};

export default SidebarButtons;
