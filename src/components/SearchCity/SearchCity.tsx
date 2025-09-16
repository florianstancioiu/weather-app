import { useState, type KeyboardEvent } from "react";
import SearchIcon from "../../images/icon-search.svg?react";

import Button from "../Button/Button";

export type SearchCity = {
  onChange: (searchKeyword: string) => void;
  onSearch: (searchKeyword: string) => void;
};

const SearchCity = ({ onChange, onSearch }: SearchCity) => {
  const [keyword, setKeyword] = useState("");

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(keyword);
    }
  };

  return (
    <section className="mb-[2rem] pt-[4.25rem] xl:w-[75.75rem] xl:mx-auto xl:pt-0">
      <h1 className="font-bricolage-grotesque text-6xl text-center mb-[4.25rem] font-bold xl:mb-[4rem] xl:text-[3.25rem] xl:leading-[120%]">
        How's the sky looking today?
      </h1>
      <div className="xl:flex xl:justify-center xl:items-center xl:gap-[1rem]">
        <div className="bg-neutral-2 mb-[0.75rem] relative rounded-[0.625rem] xl:w-[32rem] xl:mb-0">
          <SearchIcon className="absolute top-[1.125rem] left-[1.5rem] text-grayish-white" />
          <input
            type="text"
            id="search-input"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            onKeyDown={onKeyDownHandler}
            autoFocus
            aria-label="Search for a place..."
            placeholder="Search for a place..."
            className="w-full h-[3.625rem] pl-[3.875rem]"
          />
        </div>
        <Button
          onClick={() => {
            onSearch(keyword);
            // TODO: remove onChange call after implementing it correctly
            onChange(keyword);
          }}
          title="Search"
        />
      </div>
    </section>
  );
};

export default SearchCity;
