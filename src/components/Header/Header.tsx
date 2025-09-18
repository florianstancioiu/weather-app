import UnitsDropdown from "../UnitsDropdown/UnitsDropdown";
import WeatherNowLogo from "../../images/logo.svg";

export type Header = {
  onChangeUnitSystem: (isMetric: boolean) => void;
};

const Header = ({ onChangeUnitSystem }: Header) => {
  return (
    <header className="flex justify-between items-center md:mx-auto md:mb-[4rem] xl:w-[75.75rem] md:w-[45rem]">
      <a href="#">
        <img src={WeatherNowLogo} alt="Weather Now Logo" />
      </a>
      <UnitsDropdown onChangeUnitSystem={onChangeUnitSystem} />
    </header>
  );
};

export default Header;
