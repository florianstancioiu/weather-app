import UnitsDropdown from "../UnitsDropdown/UnitsDropdown";
import WeatherNowLogo from "../../images/logo.svg";

const Header = () => {
  return (
    <header className="flex justify-between items-center dsktp:w-[75.75rem] dsktp:mx-auto dsktp:mb-[4rem]">
      <a href="#">
        <img src={WeatherNowLogo} alt="Weather Now Logo" />
      </a>
      <UnitsDropdown />
    </header>
  );
};

export default Header;
