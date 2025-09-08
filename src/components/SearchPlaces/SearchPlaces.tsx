import SearchIcon from "../../images/icon-search.svg";

import Button from "../Button/Button";

const SearchPlaces = () => {
  return (
    <div>
      <h1>How's the sky looking today?</h1>
      <div className="bg-background-2 mb-[0.75rem]">
        <img src={SearchIcon} alt="" />
        <input type="text" placeholder="Search for a place..." />
      </div>
      <Button title="Search" />
    </div>
  );
};

export default SearchPlaces;
