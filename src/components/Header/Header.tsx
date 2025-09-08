import UnitsDropdown from "../UnitsDropdown/UnitsDropdown";
import WeatherNowLogo from "../../images/logo.svg";

const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <img src={WeatherNowLogo} alt="Weather Now Logo" />
      <UnitsDropdown />
    </header>
  );
};

export default Header;
