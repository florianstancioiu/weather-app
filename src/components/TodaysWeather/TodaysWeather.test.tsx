import { render, screen } from "@testing-library/react";

import TodaysWeather from "./TodaysWeather";
import { primaryData, secondaryData } from "../../utils/stories/todaysWeather";

describe("<TodaysWeather> component", () => {
  test("renders the component", async () => {
    const { city, country, date, temperature } = primaryData;

    render(
      <TodaysWeather
        primaryData={primaryData}
        secondaryData={secondaryData}
        isMetric={true}
        isLoading={false}
      />
    );

    const titleElement = screen.getByTestId("todaysWeather.title");
    const dateElement = screen.getByTestId("todaysWeather.date");
    const temperatureElement = screen.getByTestId("todaysWeather.temperature");
    const isLoadingElement = screen.queryByTestId(
      "todaysWeather.isLoadingState"
    );
    const detailsElement = screen.getByTestId("todaysWeather.details");

    expect(titleElement).toContainHTML(`${city}, ${country}`);
    expect(dateElement).toContainHTML(date);
    expect(temperatureElement).toContainHTML(`${Math.floor(temperature)}°`);
    expect(detailsElement.children).toHaveLength(4);
    expect(isLoadingElement).not.toBeInTheDocument();
  });

  test("renders the is loading screen", async () => {
    render(
      <TodaysWeather
        primaryData={primaryData}
        secondaryData={secondaryData}
        isMetric={true}
        isLoading={true}
      />
    );

    const titleElement = screen.queryByTestId("todaysWeather.title");
    const dateElement = screen.queryByTestId("todaysWeather.date");
    const temperatureElement = screen.queryByTestId(
      "todaysWeather.temperature"
    );
    const isLoadingElement = screen.getByTestId("todaysWeather.isLoadingState");
    const detailsElement = screen.getByTestId("todaysWeather.details");

    expect(isLoadingElement).toBeInTheDocument();
    expect(titleElement).not.toBeInTheDocument();
    expect(dateElement).not.toBeInTheDocument();
    expect(temperatureElement).not.toBeInTheDocument();
    expect(detailsElement.children).toHaveLength(4);
  });
});
