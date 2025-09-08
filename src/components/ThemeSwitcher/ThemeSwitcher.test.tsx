import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ThemeSwitcher from "./ThemeSwitcher";

describe("<ThemeSwitcher> component", () => {
  test("renders the component", () => {
    render(<ThemeSwitcher />);

    const themeElement = screen.getByText(/theme/i);
    expect(themeElement).toBeInTheDocument();
  });

  test("click on title switches active position", () => {
    const onSwitchHandler = vi.fn();

    render(<ThemeSwitcher onSwitch={onSwitchHandler} />);

    const titleText = screen.getByTestId("theme-switcher-title");

    fireEvent.click(titleText);

    expect(onSwitchHandler).toHaveBeenCalledTimes(1);
    expect(onSwitchHandler).toHaveBeenCalledWith(1);

    fireEvent.click(titleText);

    expect(onSwitchHandler).toHaveBeenCalledTimes(2);
    expect(onSwitchHandler).toHaveBeenCalledWith(2);

    fireEvent.click(titleText);

    expect(onSwitchHandler).toHaveBeenCalledTimes(3);
    expect(onSwitchHandler).toHaveBeenCalledWith(0);
  });

  test("click on index text switches active position", () => {
    const onSwitchHandler = vi.fn();

    render(<ThemeSwitcher onSwitch={onSwitchHandler} />);

    const indexText0 = screen.getByTestId("theme-switcher-index-0");
    const indexText1 = screen.getByTestId("theme-switcher-index-1");
    const indexText2 = screen.getByTestId("theme-switcher-index-2");

    fireEvent.click(indexText2);

    expect(onSwitchHandler).toHaveBeenCalledTimes(1);
    expect(onSwitchHandler).toHaveBeenCalledWith(2);

    fireEvent.click(indexText0);

    expect(onSwitchHandler).toHaveBeenCalledTimes(2);
    expect(onSwitchHandler).toHaveBeenCalledWith(0);

    fireEvent.click(indexText1);

    expect(onSwitchHandler).toHaveBeenCalledTimes(3);
    expect(onSwitchHandler).toHaveBeenCalledWith(1);
  });
});
