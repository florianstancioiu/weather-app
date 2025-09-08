import UnitsIcon from "../../images/icon-units.svg";
import DropdownIcon from "../../images/icon-dropdown.svg";

const UnitsDropdown = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center cursor-pointer">
        <img src={UnitsIcon} alt="" />
        <p>Units</p>
        <img src={DropdownIcon} alt="" />
      </div>
      <div></div>
    </div>
  );
};

export default UnitsDropdown;
