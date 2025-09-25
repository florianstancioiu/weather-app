import { render, screen } from "@testing-library/react";

import Index from "./Index";

describe("<Index> page", () => {
  test("renders the component", () => {
    render(<Index />);

    const titleElement = screen.getByTestId("todaysWeather.title");

    expect(titleElement).toContainHTML("Please search for a place.");
  });
});
