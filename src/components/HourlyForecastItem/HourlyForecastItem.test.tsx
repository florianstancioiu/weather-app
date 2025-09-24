import { render, screen } from "@testing-library/react";

import HourlyForecastItem from "./HourlyForecastItem";

describe("<HourlyForecastItem> component", () => {
  test("renders the component", async () => {
    const hour = "9 AM";
    const temperature = 28;
    const weatherCode = 1;
    const isLoading = false;

    render(
      <HourlyForecastItem
        hour={hour}
        temperature={temperature}
        weatherCode={weatherCode}
        isLoading={isLoading}
      />
    );

    const hourElement = screen.getByTestId("hourlyForecastItem.hour");
    const temperatureElement = screen.getByTestId(
      "hourlyForecastItem.temperature"
    );
    const weatherCodeImageElement = screen.getByTestId(
      "weatherCodeImage.weatherCodeImage"
    );
    const isLoadingElement = screen.queryByTestId(
      "hourlyForecastItem.isLoadingState"
    );

    expect(hourElement).toContainHTML(hour);
    expect(temperatureElement).toContainHTML(temperature.toString());
    expect(weatherCodeImageElement).toBeInTheDocument();
    expect(isLoadingElement).not.toBeInTheDocument();
  });

  test("renders the is loading screen", async () => {
    const hour = "9 AM";
    const temperature = 28;
    const weatherCode = 1;
    const isLoading = true;

    render(
      <HourlyForecastItem
        hour={hour}
        temperature={temperature}
        weatherCode={weatherCode}
        isLoading={isLoading}
      />
    );

    const hourElement = screen.queryByTestId("hourlyForecastItem.hour");
    const temperatureElement = screen.queryByTestId(
      "hourlyForecastItem.temperature"
    );
    const weatherCodeImageElement = screen.queryByTestId(
      "weatherCodeImage.weatherCodeImage"
    );
    const isLoadingElement = screen.queryByTestId(
      "hourlyForecastItem.isLoadingState"
    );

    expect(hourElement).not.toBeInTheDocument();
    expect(temperatureElement).not.toBeInTheDocument();
    expect(weatherCodeImageElement).not.toBeInTheDocument();
    expect(isLoadingElement).toBeInTheDocument();
  });
});
