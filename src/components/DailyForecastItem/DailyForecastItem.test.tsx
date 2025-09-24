import { render, screen } from "@testing-library/react";
import DailyForecastItem from "./DailyForecastItem";

describe("<DailyForecastItem> component", () => {
  test("renders the component", () => {
    const day = 1;
    const weatherCode = 1;
    const maximumTemperature = 30;
    const minimumTemperature = 30;
    const isMetric = true;
    const isLoading = false;

    render(
      <DailyForecastItem
        day={day}
        weatherCode={weatherCode}
        maximum={maximumTemperature}
        minimum={minimumTemperature}
        isMetric={isMetric}
        isLoading={isLoading}
      />
    );

    const titleElement = screen.getByTestId("dailyForecastItem.title");
    const maximumTemperatureElement = screen.getByTestId(
      "dailyForecastItem.maximumTemperature"
    );
    const minimumTemperatureElement = screen.getByTestId(
      "dailyForecastItem.minimumTemperature"
    );
    const isLoadingStateElement = screen.queryByTestId(
      "dailyForecastItem.isLoadingState"
    );

    expect(titleElement).toHaveTextContent("Mon");
    expect(maximumTemperatureElement).toContainHTML(`${maximumTemperature}°`);
    expect(minimumTemperatureElement).toContainHTML(`${minimumTemperature}°`);
    expect(isLoadingStateElement).not.toBeInTheDocument();
  });

  test("renders the isLoading state", () => {
    const day = 1;
    const weatherCode = 1;
    const maximumTemperature = 30;
    const minimumTemperature = 30;
    const isMetric = true;
    const isLoading = true;

    render(
      <DailyForecastItem
        day={day}
        weatherCode={weatherCode}
        maximum={maximumTemperature}
        minimum={minimumTemperature}
        isMetric={isMetric}
        isLoading={isLoading}
      />
    );

    const titleElement = screen.queryByTestId("dailyForecastItem.title");
    const maximumTemperatureElement = screen.queryByTestId(
      "dailyForecastItem.maximumTemperature"
    );
    const minimumTemperatureElement = screen.queryByTestId(
      "dailyForecastItem.minimumTemperature"
    );
    const isLoadingStateElement = screen.getByTestId(
      "dailyForecastItem.isLoadingState"
    );

    expect(isLoadingStateElement).toBeInTheDocument();
    expect(titleElement).not.toBeInTheDocument();
    expect(maximumTemperatureElement).not.toBeInTheDocument();
    expect(minimumTemperatureElement).not.toBeInTheDocument();
  });
});
