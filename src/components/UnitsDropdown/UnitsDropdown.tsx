import { useState, createRef, useId, type KeyboardEvent } from "react";
import UnitsIcon from "../../images/icon-units.svg";
import DropdownIcon from "../../images/icon-dropdown.svg";
import CheckmarkIcon from "../../images/icon-checkmark.svg?react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import useDebounce from "../../hooks/useDebounce";

export type DataInnerValue = {
  id: number;
  title: string;
  isMetric: boolean;
  isActive: boolean;
};

export type DataValue = {
  id: number;
  title: string;
  values: [DataInnerValue, DataInnerValue];
};

export type UnitsDropdown = {
  onChangeUnitSystem?: (isMetric: boolean) => void;
};

const UnitsDropdown = ({ onChangeUnitSystem }: UnitsDropdown) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMetric, setIsMetric] = useState(true);
  const wrapperRef = createRef<HTMLDivElement | null>();
  const dropdownId = useId();
  const [data, setData] = useState<DataValue[]>([
    {
      id: 1,
      title: "Temperature",
      values: [
        {
          id: 1,
          title: "Celsius (°C)",
          isMetric: true,
          isActive: true,
        },
        {
          id: 2,
          title: "Fahrenheit (°F)",
          isMetric: false,
          isActive: false,
        },
      ],
    },
    {
      id: 2,
      title: "Wind Speed",
      values: [
        {
          id: 1,
          title: "km/h",
          isMetric: true,
          isActive: true,
        },
        {
          id: 2,
          title: "mph",
          isMetric: false,
          isActive: false,
        },
      ],
    },
    {
      id: 3,
      title: "Precipitation",
      values: [
        {
          id: 1,
          title: "Millimeters (mm)",
          isMetric: true,
          isActive: true,
        },
        {
          id: 2,
          title: "Inches (in)",
          isMetric: false,
          isActive: false,
        },
      ],
    },
  ]);

  // Close the dropdown on blur
  useOnClickOutside(wrapperRef, () => {
    setIsOpen(false);
  });

  const toggleDropdown = () => {
    setIsOpen((val) => !val);
  };

  const toggleMetricOrImperial = useDebounce((isMetric: boolean) => {
    setIsMetric((val) => !val);

    const newData = data.map((unit) => {
      return {
        ...unit,
        values: unit.values.map((unitValue) => {
          return {
            ...unitValue,
            isActive: !isMetric === unitValue.isMetric,
          };
        }),
      };
    });

    setData(newData as DataValue[]);

    if (onChangeUnitSystem) {
      onChangeUnitSystem(!isMetric);
    }
  }, 400);

  const onDropdownKeyDownHandler = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      toggleDropdown();
    }
  };

  const onDropdownOptionKeyDownHandler = (
    event: KeyboardEvent,
    isMetric: boolean
  ) => {
    if (event.key === "Enter") {
      toggleMetricOrImperial(isMetric);
      setIsOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div
        onClick={toggleDropdown}
        onKeyDown={onDropdownKeyDownHandler}
        className="flex justify-between items-center cursor-pointer bg-neutral-2 py-[0.438rem] px-[0.625rem] rounded-[0.375rem] gap-[0.375rem] select-none"
        tabIndex={0}
        data-testid="unitsDropdown.toggle"
        role="combobox"
        aria-expanded={isOpen}
        aria-owns={dropdownId}
        aria-haspopup="listbox"
        aria-label="Select metric or imperial units."
      >
        <img src={UnitsIcon} alt="" />
        <p className="text-white">Units</p>
        <img src={DropdownIcon} alt="" />
      </div>
      {isOpen && (
        <div className="z-20 absolute bg-neutral-2 top-[3.313rem] right-0 w-[13.375rem] border-light-blue border-[1px] p-[0.5rem] rounded-[0.75rem]">
          <div id={dropdownId} role="listbox" className="mb-[0.625rem]">
            <button
              role="option"
              className="cursor-pointer w-full text-left text-white px-[0.625rem] h-[2.625rem] rounded-[0.75rem] hover:bg-neutral-3 focus:bg-neutral-3"
              data-testid="unitsDropdown.switchButton"
              onClick={() => toggleMetricOrImperial(isMetric)}
              onKeyDown={(event: KeyboardEvent) =>
                onDropdownOptionKeyDownHandler(event, isMetric)
              }
              aria-selected={isMetric}
            >
              {isMetric ? "Switch to Imperial" : "Switch to Metric"}
            </button>
          </div>
          <ul data-testid="unitsDropdown.list" className="select-none">
            {data.map((dataValue, index) => {
              const dataValueClasses =
                index === data.length - 1
                  ? ""
                  : "border-b-[1px] border-light-blue pb-[0.5rem] mb-[1rem]";

              return (
                <li key={dataValue.id} className={dataValueClasses}>
                  <p className="text-grayish-white rounded-[0.75rem] px-[0.625rem] h-[2.5rem]">
                    {dataValue.title}
                  </p>
                  {dataValue.values.map((value) => {
                    return (
                      <div
                        key={value.id}
                        className={`${
                          value.isActive ? "bg-neutral-3" : ""
                        } flex justify-between items-center rounded-[0.75rem] px-[0.625rem] h-[2.5rem]`}
                      >
                        <p
                          {...(value.isActive === true && {
                            "data-testid": "unitsDropdown.activeListItem",
                          })}
                          className="text-white"
                        >
                          {value.title}
                        </p>
                        {value.isActive && <CheckmarkIcon />}
                      </div>
                    );
                  })}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UnitsDropdown;
