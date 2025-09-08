import { useState } from "react";

export type ThemeSwitcher = {
  onSwitch?: (activeSwitch: number) => void;
};

const ThemeSwitcher = ({ onSwitch }: ThemeSwitcher) => {
  const [activeSwitch, setActiveSwitch] = useState(0);
  const switches = [0, 1, 2];

  const switchNumberClickHandler = (number: number) => {
    setActiveSwitch(number);

    if (typeof onSwitch === "function") {
      onSwitch(number);
    }
  };

  const switchClickHandler = () => {
    let newActiveSwitchValue = activeSwitch + 1;

    if (newActiveSwitchValue > 2) {
      newActiveSwitchValue = 0;
    }

    setActiveSwitch(newActiveSwitchValue);

    if (typeof onSwitch === "function") {
      onSwitch(newActiveSwitchValue);
    }
  };

  return (
    <div className="flex justify-between items-end text-[0.875rem] select-none">
      <p
        onClick={switchClickHandler}
        data-testid="theme-switcher-title"
        className="uppercase mr-[1.75rem] cursor-pointer"
      >
        Theme
      </p>
      <div>
        <div className="flex justify-evenly items-center mb-[0.375rem]">
          {switches.map((_, index) => (
            <p
              key={index}
              className="cursor-pointer"
              data-testid={`theme-switcher-index-${index}`}
              onClick={() => switchNumberClickHandler(index)}
            >
              {index + 1}
            </p>
          ))}
        </div>
        <div
          onClick={switchClickHandler}
          data-testid="theme-switcher-main"
          className="bg-switch-bg w-[3.5rem] p-[0.3rem] rounded-full cursor-pointer"
        >
          <div
            className={`transition-all w-[1rem] h-[1rem] bg-danger rounded-full ml-[${activeSwitch}rem]`}
          ></div>
          <span className="hidden ml-[1rem]"></span>
          <span className="hidden ml-[2rem]"></span>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
