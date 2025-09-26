import { render, screen } from "@testing-library/react";

import HourlyForecast from "./HourlyForecast";
import { data } from "../../utils/stories/hourlyForecast";
import {
  getDaysFromHourly,
  getActiveFormattedHoursFromHourly,
} from "../../utils/date";

// TODO: test the dropdown as well
describe("<HourlyForecast> component", () => {
  test("renders the component", async () => {
    render(<HourlyForecast data={data} isLoading={false} />);

    const titleElement = screen.getByTestId("hourlyForecast.title");
    const listElement = screen.getByTestId("hourlyForecast.list");
    const temperatureElements = await screen.findAllByTestId(
      "hourlyForecastItem.temperature"
    );

    // get temperature values
    const numericDays = getDaysFromHourly(data.time);
    const hours = getActiveFormattedHoursFromHourly(numericDays[0], data);
    const temperatureValues = hours.map((hour) => {
      return `${Math.round(data?.temperature_2m![hour.index])}°`;
    });

    const temperatures = temperatureElements.map((el) =>
      el.textContent?.trim()
    );
    expect(temperatures).toEqual(temperatureValues);

    expect(titleElement).toBeInTheDocument();
    expect(listElement.children).toHaveLength(24);
  });

  test("renders the is loading screen", async () => {
    render(<HourlyForecast data={data} isLoading={true} />);

    const listElement = screen.getByTestId("hourlyForecast.list");

    expect(listElement.children).toHaveLength(24);
  });
});
