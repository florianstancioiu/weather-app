import SearchIcon from "../../images/icon-search.svg?react";

import Button from "../Button/Button";

const SearchPlaces = () => {
  return (
    <div className="mb-[2rem] pt-[4.25rem]">
      <h1 className="font-bricolage-grotesque text-6xl text-center mb-[4.25rem] font-bold">
        How's the sky looking today?
      </h1>
      <div className="bg-background-2 mb-[0.75rem] relative rounded-[0.625rem] ">
        <SearchIcon className="absolute top-[1.125rem] left-[1.5rem] text-grayish-white" />
        <input
          type="text"
          placeholder="Search for a place..."
          className="w-full h-[3.625rem] pl-[3.875rem]"
        />
      </div>
      <Button title="Search" />
    </div>
  );
};

export default SearchPlaces;
