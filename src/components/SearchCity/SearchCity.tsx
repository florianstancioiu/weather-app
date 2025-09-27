import { useState, useRef, useEffect } from "react";
import SearchIcon from "../../images/icon-search.svg?react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import Button from "../Button/Button";

export type SearchCity = {
  dropdownData?: string[];
  onChange: (searchKeyword: string) => void;
  onSearch: (searchKeyword: string) => void;
};

const SearchCity = ({ onChange, onSearch, dropdownData }: SearchCity) => {
  const [keyword, setKeyword] = useState("");
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(keyword);
      setDropdownIsOpen(false);
    }
  };

  const onKeyDownDropdownItemHandler = (eventKey: string, value: string) => {
    if (eventKey === "Enter") {
      onSearch(value);
      setDropdownIsOpen(false);
    }

    if (eventKey === "Escape") {
      setDropdownIsOpen(false);
    }
  };

  useOnClickOutside(searchRef, () => {
    setDropdownIsOpen(false);
  });

  return (
    <section className="mb-[2rem] pt-[4.25rem] md:mx-auto md:pt-0 xl:w-[75.75rem] md:w-[45rem]">
      <h1
        data-testid="searchCity.title"
        className="font-bricolage-grotesque text-white text-6xl text-center mb-[4.25rem] font-bold md:mb-[4rem] md:text-[3.25rem] md:leading-[120%] md:w-[30.125rem] md:mx-auto xl:w-[45.688rem]"
      >
        How's the sky looking today?
      </h1>
      <div className="md:flex md:justify-center md:items-center md:gap-[1rem] md:w-full">
        <div
          ref={searchRef}
          className="bg-neutral-2 mb-[0.75rem] relative rounded-[0.625rem] md:mb-0 md:w-full xl:w-[32rem] hover:bg-neutral-4"
        >
          <div>
            <SearchIcon className="absolute top-[1.125rem] left-[1.5rem] text-grayish-white" />
            <input
              type="text"
              id="search-input"
              data-testid="searchCity.input"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              onKeyDown={onKeyDownHandler}
              onFocus={() => setDropdownIsOpen(true)}
              aria-label="Search for a place..."
              placeholder="Search for a place..."
              className="w-full text-white h-[3.625rem] pl-[3.875rem] border-[2px] border-neutral-1 rounded-[0.75rem] focus:rounded-[0.75rem] focus:border-[2px] focus:border-white outline-none focus-visible:border-white cursor-pointer"
            />
          </div>
          {dropdownIsOpen && dropdownData && (
            <ul
              data-testid="searchCity.list"
              className="hidden md:block absolute left-0 top-[4.625rem] list-none text-white bg-neutral-2 w-full rounded-[12px] p-[0.5rem] border-[1px] border-neutral-4"
            >
              {dropdownData.map((val, index) => (
                <li
                  key={index}
                  onClick={() => {
                    onChange(val);
                    setDropdownIsOpen(false);
                    setKeyword(val);
                  }}
                  onKeyDown={(event) =>
                    onKeyDownDropdownItemHandler(event.key, val)
                  }
                  tabIndex={0}
                  className={`cursor-pointer px-[0.5rem] py-[10px] rounded-[8px] border-[1px] border-neutral-2 hover:bg-neutral-4 hover:border-lighter-blue ${
                    val === keyword ? "bg-neutral-4 border-lighter-blue " : ""
                  } ${dropdownData.length - 1 !== index ? "mb-[10px]" : ""}`}
                >
                  {val}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button onClick={() => onSearch(keyword)} title="Search" />
      </div>
    </section>
  );
};

export default SearchCity;
