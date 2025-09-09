import SearchIcon from "../../images/icon-search.svg";

import Button from "../Button/Button";

const SearchPlaces = () => {
  return (
    <div className="mb-[2rem] pt-[4.25rem]">
      <h1 className="font-bricolage-grotesque text-6xl text-center mb-[4.25rem] font-bold">
        How's the sky looking today?
      </h1>
      <div className="bg-background-2 mb-[0.75rem]">
        <img src={SearchIcon} alt="" />
        <input type="text" placeholder="Search for a place..." />
      </div>
      <Button title="Search" />
    </div>
  );
};

export default SearchPlaces;
