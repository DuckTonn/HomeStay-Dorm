// src/components/SearchBar.tsx
import searchIcon from "@/assets/icons/Search.svg"; // Adjust path as needed

export const SearchBar = () => {
  return (
    <div className="flex h-14 w-full max-w-2xl items-center overflow-hidden rounded-[1rem] bg-white pl-6 pr-2 shadow-md">
      <input
        type="text"
        placeholder="Tìm theo tên"
        className="h-full w-full bg-transparent text-lg text-text outline-none placeholder:text-gray-400"
      />
      {/* The green search button */}
      <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-primary">
        <img src={searchIcon} alt="Search" className="h-5 w-5" />
      </button>
    </div>
  );
};