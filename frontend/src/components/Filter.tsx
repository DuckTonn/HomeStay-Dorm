import plusIcon from "@/assets/icons/CirclePlus.svg";

const Filter = ({ pos }: { pos: string }) => {
  return (
    <button className={`absolute ${pos} flex py-1 px-2 items-center gap-2 rounded-[0.5rem] bg-secondary text-lg font-medium text-background shadow-md transition-colors hover:bg-tirtiary shrink-0 hover:cursor-pointer`}>
      <img src={plusIcon} alt="Filter" className="h-6 w-6" />
      <span>Tiêu chí</span>
    </button>
  );
};

export default Filter;