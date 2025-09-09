import UnitsIcon from "../../images/icon-units.svg";
import DropdownIcon from "../../images/icon-dropdown.svg";

const UnitsDropdown = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center cursor-pointer bg-background-2 py-[0.438rem] px-[0.625rem] rounded-[0.375rem] gap-[0.375rem]">
        <img src={UnitsIcon} alt="" />
        <p>Units</p>
        <img src={DropdownIcon} alt="" />
      </div>
      <div></div>
    </div>
  );
};

export default UnitsDropdown;
