import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import UnitsDropdown from "./UnitsDropdown";

describe("<UnitsDropdown> component", () => {
  test("renders the component", async () => {
    const onChangeUnitSystemMock = vi.fn();
    const expectedActiveListItemsValues = [
      "Celsius (°C)",
      "km/h",
      "Millimeters (mm)",
    ];

    render(<UnitsDropdown onChangeUnitSystem={onChangeUnitSystemMock} />);

    const toggleElement = screen.getByTestId("unitsDropdown.toggle");

    fireEvent.click(toggleElement);

    const switchButtonElement = screen.queryByTestId(
      "unitsDropdown.switchButton"
    );
    const listElement = screen.queryByTestId("unitsDropdown.list");

    const activeListItemElements = await screen.findAllByTestId(
      "unitsDropdown.activeListItem"
    );

    // Expect that each and every single list item was selected properly
    activeListItemElements.map((element, index) =>
      expect(element.innerHTML).toContain(expectedActiveListItemsValues[index])
    );

    expect(toggleElement).toBeInTheDocument();
    expect(switchButtonElement).toBeInTheDocument();
    expect(switchButtonElement).toHaveTextContent("Switch to Imperial");
    expect(listElement).toBeInTheDocument();

    expect(onChangeUnitSystemMock).toHaveBeenCalledTimes(0);
  });

  test("renders the selected imperial units", async () => {
    const onChangeUnitSystemMock = vi.fn();
    const expectedActiveListItemsValues = [
      "Fahrenheit (°F)",
      "mph",
      "Inches (in)",
    ];

    render(<UnitsDropdown onChangeUnitSystem={onChangeUnitSystemMock} />);

    const toggleElement = screen.getByTestId("unitsDropdown.toggle");

    fireEvent.click(toggleElement);

    const switchButtonElement = await screen.findByTestId(
      "unitsDropdown.switchButton"
    );

    fireEvent.click(switchButtonElement);

    await waitFor(async () => {
      expect(onChangeUnitSystemMock).toHaveBeenCalledTimes(1);
    });

    const listElement = screen.queryByTestId("unitsDropdown.list");

    const activeListItemElements = await screen.findAllByTestId(
      "unitsDropdown.activeListItem"
    );

    // Expect that each and every single list item was selected properly
    activeListItemElements.map((element, index) =>
      expect(element.innerHTML).toContain(expectedActiveListItemsValues[index])
    );

    expect(toggleElement).toBeInTheDocument();
    expect(switchButtonElement).toBeInTheDocument();
    expect(switchButtonElement.innerHTML).toEqual("Switch to Metric");
    expect(listElement).toBeInTheDocument();
    expect(onChangeUnitSystemMock).toHaveBeenCalledWith(false);
  });
});
