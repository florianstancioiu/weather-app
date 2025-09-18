import DropdownIcon from "../../images/icon-dropdown.svg";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { createRef, useState, useId, type KeyboardEvent } from "react";

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
  const dropdownId = useId();

  // Close the dropdown on blur
  useOnClickOutside(wrapperRef, () => {
    setIsOpen(false);
  });

  const toggleOpenHandler = () => {
    if (days !== undefined && days.length !== 0) {
      setIsOpen((val) => !val);
    }
  };

  const onDropdownOptionClickHandler = (day: DayDropdownValue) => {
    onChange(day);
    setIsOpen(false);
  };

  const onDropdownKeyDownHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      toggleOpenHandler();
    }
  };

  const onDropdownOptionKeyDownHandler = (
    event: KeyboardEvent,
    day: DayDropdownValue
  ) => {
    if (event.key === "Enter") {
      onDropdownOptionClickHandler(day);
    }
  };

  let activeDay;

  if (days !== undefined) {
    activeDay = days.find((value) => value.isActive === true);
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div
        onClick={toggleOpenHandler}
        onKeyDown={onDropdownKeyDownHandler}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-owns={dropdownId}
        aria-haspopup="listbox"
        aria-label={
          days === undefined || (days !== undefined && days.length === 0)
            ? "There are no days to select."
            : "Select a day."
        }
        className={`bg-lighter-blue px-[1.25rem] flex gap-[0.813rem] items-center py-[0.5rem] rounded-[0.625rem] select-none ${
          days !== undefined && days.length === 0
            ? "cursor-not-allowed"
            : "cursor-pointer"
        }`}
      >
        {days !== undefined && days.length > 0 && (
          <p>{activeDay !== undefined ? activeDay.title : "Select a day"}</p>
        )}
        {days === undefined ||
          (days !== undefined && days.length === 0 && <p>No options</p>)}
        <img src={DropdownIcon} alt="" />
      </div>

      {isOpen && (
        <ul
          id={dropdownId}
          role="listbox"
          className="absolute bg-neutral-2 top-[3.313rem] right-0 w-[13.375rem] border-light-blue border-[1px] p-[0.5rem] rounded-[0.75rem]"
        >
          {days !== undefined &&
            days.map((day) => (
              <li
                key={day.id}
                onClick={() => onDropdownOptionClickHandler(day)}
                onKeyDown={(event: KeyboardEvent) =>
                  onDropdownOptionKeyDownHandler(event, day)
                }
                role="option"
                tabIndex={0}
                aria-selected={day.isActive}
                className={`${
                  day.isActive ? "bg-neutral-3" : ""
                } px-[0.5rem] h-[2.5rem] flex items-center rounded-[0.75rem] cursor-pointer hover:bg-neutral-3 focus:bg-neutral-3`}
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
