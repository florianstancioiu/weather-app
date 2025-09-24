import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import TodaysWeather from "./TodaysWeather";
import { primaryData, secondaryData } from "../../utils/stories/todaysWeather";

describe("<TodaysWeather> component", () => {
  // TODO: Split this test in 2 tests
  test("renders the component", async () => {
    const onChangeMock = vi.fn();

    render(
      <TodaysWeather
        primaryData={primaryData}
        secondaryData={secondaryData}
        isMetric={true}
        isLoading={false}
      />
    );

    const titleElement = screen.getByTestId("daysDropdown.title");

    fireEvent.click(titleElement);

    const listElement = await screen.findByTestId("daysDropdown.list");
    const listItemElement = listElement.children[1];

    fireEvent.click(listItemElement);

    expect(listElement.children).toHaveLength(7);
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
