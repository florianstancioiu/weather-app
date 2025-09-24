import { render, screen } from "@testing-library/react";

import HourlyForecast from "./HourlyForecast";
import { data } from "../../utils/stories/hourlyForecast";

describe("<HourlyForecast> component", () => {
  test("renders the component", async () => {
    render(<HourlyForecast data={data} isLoading={false} />);

    const titleElement = screen.getByTestId("hourlyForecast.title");
    const listElement = screen.getByTestId("hourlyForecast.list");

    expect(titleElement).toBeInTheDocument();
    expect(listElement.children).toHaveLength(24);
  });

  test("renders the is loading screen", async () => {
    render(<HourlyForecast data={data} isLoading={true} />);

    const listElement = screen.getByTestId("hourlyForecast.list");

    expect(listElement.children).toHaveLength(24);
  });
});
