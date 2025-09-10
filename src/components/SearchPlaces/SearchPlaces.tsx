import SearchIcon from "../../images/icon-search.svg?react";

import Button from "../Button/Button";

const SearchPlaces = () => {
  return (
    <div className="mb-[2rem] pt-[4.25rem] dsktp:w-[75.75rem] dsktp:mx-auto dsktp:pt-0">
      <h1 className="font-bricolage-grotesque text-6xl text-center mb-[4.25rem] font-bold dsktp:mb-[4rem] dsktp:text-[3.25rem] dsktp:leading-[120%]">
        How's the sky looking today?
      </h1>
      <div className="dsktp:flex dsktp:justify-center dsktp:items-center dsktp:gap-[1rem]">
        <div className="bg-background-2 mb-[0.75rem] relative rounded-[0.625rem] dsktp:w-[32rem] dsktp:mb-0">
          <SearchIcon className="absolute top-[1.125rem] left-[1.5rem] text-grayish-white" />
          <label htmlFor="search-input" className="hidden">
            Search for a place...
          </label>
          <input
            type="text"
            id="search-input"
            placeholder="Search for a place..."
            className="w-full h-[3.625rem] pl-[3.875rem]"
          />
        </div>
        <Button title="Search" />
      </div>
    </div>
  );
};

export default SearchPlaces;
