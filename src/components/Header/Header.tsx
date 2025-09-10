import UnitsDropdown from "../UnitsDropdown/UnitsDropdown";
import WeatherNowLogo from "../../images/logo.svg";

const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <a href="#">
        <img src={WeatherNowLogo} alt="Weather Now Logo" />
      </a>
      <UnitsDropdown />
    </header>
  );
};

export default Header;
