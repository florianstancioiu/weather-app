import { useState, useEffect } from "react";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

const Header = () => {
  const [theme, setTheme] = useState(0);

  useEffect(() => {
    const bodyElement = document.querySelector("body")!;

    switch (theme) {
      case 1:
        bodyElement.classList.remove("theme-purple");
        bodyElement.classList.add("theme-gray");
        break;
      case 2:
        bodyElement.classList.remove("theme-gray");
        bodyElement.classList.add("theme-purple");
        break;
      default:
        bodyElement.classList.remove("theme-gray", "theme-purple");
        break;
    }
  }, [theme]);

  const onSwitchThemeHandler = (themeNumber: number) => {
    setTheme(themeNumber);
  };

  return (
    <header
      data-testid="header-component"
      className="flex justify-between items-center pt-[1.75rem] mb-[2rem] xs:pt-[5.875rem]"
    >
      <div>
        <h1 className="font-bold text-3xl select-none">calc</h1>
      </div>
      <ThemeSwitcher onSwitch={onSwitchThemeHandler} />
    </header>
  );
};

export default Header;
