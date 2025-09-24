import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import Header from "./Header";

// TODO: Add a new test case where you should test out the onChangeUnitSystem function prop
describe("<Header> component", () => {
  test("renders the component", async () => {
    const onChangeUnitSystemMock = vi.fn();

    render(<Header onChangeUnitSystem={onChangeUnitSystemMock} />);

    const logoElement = screen.getByTestId("header.logo");

    expect(logoElement.getAttribute("alt")).toEqual("Weather Now Logo");
    expect(onChangeUnitSystemMock).toHaveBeenCalledTimes(0);
  });
});
