import DropdownIcon from "../../images/icon-dropdown.svg";
import { useState } from "react";

export type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type DayDropdownValue = {
  id: number;
  title: Day;
  isActive: boolean;
};

export type DaysDropdown = {
  days: DayDropdownValue[];
  onChange: (value: DayDropdownValue) => void;
};

const DaysDropdown = ({ days, onChange }: DaysDropdown) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpenHandler = () => {
    setIsOpen((val) => !val);
  };

  const activeDay = days.find((value) => value.isActive === true);

  return (
    <div className="relative">
      <div
        onClick={toggleOpenHandler}
        className="bg-lighter-blue px-[1.25rem] flex gap-[0.813rem] items-center py-[0.5rem] rounded-[0.625rem] cursor-pointer"
      >
        <p>{activeDay ? activeDay.title : "Select a day"}</p>
        <img src={DropdownIcon} alt="" />
      </div>

      {isOpen && (
        <div className="absolute bg-background-2 top-[3.313rem] right-0 w-[214px] border-light-blue border-[1px] p-[8px] rounded-[12px]">
          {days.map((day) => (
            <div
              key={day.id}
              onClick={() => {
                onChange(day);
                setIsOpen(false);
              }}
              className={`${
                day.isActive ? "bg-background-3" : ""
              } px-[8px] h-[40px] flex items-center rounded-[12px] cursor-pointer hover:bg-background-3`}
            >
              {day.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DaysDropdown;
