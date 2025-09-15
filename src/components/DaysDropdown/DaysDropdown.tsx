import DropdownIcon from "../../images/icon-dropdown.svg";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { createRef, useState } from "react";

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
  days?: DayDropdownValue[];
  onChange: (value: DayDropdownValue) => void;
};

const DaysDropdown = ({ days, onChange }: DaysDropdown) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = createRef<HTMLDivElement>();

  const toggleOpenHandler = () => {
    setIsOpen((val) => !val);
  };

  // Close the dropdown on blur
  useOnClickOutside(wrapperRef, () => {
    setIsOpen(false);
  });

  let activeDay;

  if (days !== undefined) {
    activeDay = days.find((value) => value.isActive === true);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div
        onClick={toggleOpenHandler}
        className="bg-lighter-blue px-[1.25rem] flex gap-[0.813rem] items-center py-[0.5rem] rounded-[0.625rem] cursor-pointer"
        tabIndex={0}
      >
        <p>{activeDay !== undefined ? activeDay.title : "Select a day"}</p>
        <img src={DropdownIcon} alt="" />
      </div>

      {isOpen && (
        <ul className="absolute bg-background-2 top-[3.313rem] right-0 w-[13.375rem] border-light-blue border-[1px] p-[0.5rem] rounded-[0.75rem]">
          {days !== undefined &&
            days.map((day) => (
              <li
                key={day.id}
                onClick={() => {
                  onChange(day);
                  setIsOpen(false);
                }}
                className={`${
                  day.isActive ? "bg-background-3" : ""
                } px-[0.5rem] h-[2.5rem] flex items-center rounded-[0.75rem] cursor-pointer hover:bg-background-3`}
              >
                {day.title}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default DaysDropdown;
