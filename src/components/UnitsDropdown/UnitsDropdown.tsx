import { useState, createRef } from "react";
import UnitsIcon from "../../images/icon-units.svg";
import DropdownIcon from "../../images/icon-dropdown.svg";
import CheckmarkIcon from "../../images/icon-checkmark.svg?react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

export type UnitsDropdown = {
  onChangeSystem?: (isMetric: boolean) => void;
};

const UnitsDropdown = ({ onChangeSystem }: UnitsDropdown) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMetric, setIsMetric] = useState(true);
  const wrapperRef = createRef<HTMLDivElement | null>();

  const toggleDropdown = () => {
    setIsOpen((val) => !val);
  };

  const toggleMetricOrImperial = () => {
    setIsMetric((val) => {
      if (onChangeSystem) {
        onChangeSystem(!val);
      }

      return !val;
    });
  };

  // Close the dropdown on blur
  useOnClickOutside(wrapperRef, () => {
    setIsOpen(false);
  });

  return (
    <div ref={wrapperRef} className="relative">
      <div
        onClick={toggleDropdown}
        className="flex justify-between items-center cursor-pointer bg-background-2 py-[0.438rem] px-[0.625rem] rounded-[0.375rem] gap-[0.375rem]"
      >
        <img src={UnitsIcon} alt="" />
        <p>Units</p>
        <img src={DropdownIcon} alt="" />
      </div>
      {isOpen && (
        <div className="z-20 absolute bg-background-2 top-[3.313rem] right-0 w-[13.375rem] border-light-blue border-[1px] p-[0.5rem] rounded-[0.75rem]">
          <div className="mb-[0.625rem]">
            <button
              className="cursor-pointer w-full text-left px-[0.625rem] h-[2.625rem]"
              onClick={toggleMetricOrImperial}
            >
              {isMetric ? "Switch to Imperial" : "Switch to Metric"}
            </button>
          </div>
          <ul className="select-none">
            <li className="border-b-[1px] border-light-blue pb-[0.5rem] mb-[1rem]">
              <p className="text-grayish-white rounded-[0.75rem] px-[0.625rem] h-[2.5rem]">
                Temperature
              </p>
              <div
                className={`${
                  isMetric ? "bg-background-3" : ""
                } flex justify-between items-center rounded-[0.75rem] px-[0.625rem] h-[2.5rem]`}
              >
                <p>Celsius (°C)</p>
                {isMetric && <CheckmarkIcon />}
              </div>
              <div
                className={`${
                  !isMetric ? "bg-background-3" : ""
                } flex justify-between items-center rounded-[0.75rem] px-[0.625rem] h-[2.5rem]`}
              >
                <p>Fahrenheit (°F)</p>
                {!isMetric && <CheckmarkIcon />}
              </div>
            </li>
            <li className="border-b-[1px] border-light-blue pb-[0.5rem] mb-[1rem]">
              <p className="text-grayish-white rounded-[0.75rem] px-[0.625rem] h-[2.5rem]">
                Wind Speed
              </p>
              <div
                className={`${
                  isMetric ? "bg-background-3" : ""
                } flex justify-between items-center rounded-[0.75rem] px-[0.625rem] h-[2.5rem]`}
              >
                <p>km/h</p>
                {isMetric && <CheckmarkIcon />}
              </div>
              <div
                className={`${
                  !isMetric ? "bg-background-3" : ""
                } flex justify-between items-center rounded-[0.75rem] px-[0.625rem] h-[2.5rem]`}
              >
                <p>mph</p>
                {!isMetric && <CheckmarkIcon />}
              </div>
            </li>
            <li>
              <p className="text-grayish-white rounded-[0.75rem] px-[0.625rem] h-[2.5rem]">
                Precipitation
              </p>
              <div
                className={`${
                  isMetric ? "bg-background-3" : ""
                } flex justify-between items-center rounded-[0.75rem] px-[0.625rem] h-[2.5rem]`}
              >
                <p>Millimeters (mm)</p>
                {isMetric && <CheckmarkIcon />}
              </div>
              <div
                className={`${
                  !isMetric ? "bg-background-3" : ""
                } flex justify-between items-center rounded-[0.75rem] px-[0.625rem] h-[2.5rem]`}
              >
                <p>Inches (in)</p>
                {!isMetric && <CheckmarkIcon />}
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UnitsDropdown;
