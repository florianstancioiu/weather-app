import DropdownIcon from "../../images/icon-dropdown.svg";

const DaysDropdown = () => {
  return (
    <div>
      <div className="bg-lighter-blue px-[1.25rem] flex gap-[0.813rem] items-center py-[0.5rem] rounded-[0.625rem] cursor-pointer">
        <p>Tuesday</p>
        <img src={DropdownIcon} alt="" />
      </div>
    </div>
  );
};

export default DaysDropdown;
