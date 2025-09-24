import UnitsDropdown from "../UnitsDropdown/UnitsDropdown";
import WeatherNowLogo from "../../images/logo.svg";

export type Header = {
  onChangeUnitSystem: (isMetric: boolean) => void;
};

const Header = ({ onChangeUnitSystem }: Header) => {
  return (
    <header className="flex justify-between items-center text-white md:mb-[4rem] md:min-w-md">
      <a href="#">
        <img
          data-testid="header.logo"
          src={WeatherNowLogo}
          alt="Weather Now Logo"
        />
      </a>
      <UnitsDropdown onChangeUnitSystem={onChangeUnitSystem} />
    </header>
  );
};

export default Header;
