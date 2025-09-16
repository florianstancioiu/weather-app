import UnitsDropdown from "../UnitsDropdown/UnitsDropdown";
import WeatherNowLogo from "../../images/logo.svg";

const Header = () => {
  return (
    <header className="flex justify-between items-center xl:w-[75.75rem] xl:mx-auto xl:mb-[4rem]">
      <a href="#">
        <img src={WeatherNowLogo} alt="Weather Now Logo" />
      </a>
      <UnitsDropdown />
    </header>
  );
};

export default Header;
