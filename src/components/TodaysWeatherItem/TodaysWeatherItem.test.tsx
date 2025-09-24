import { render, screen } from "@testing-library/react";

import TodaysWeatherItem from "./TodaysWeatherItem";

describe("<TodaysWeatherItem> component", () => {
  test("renders the component", () => {
    const title = "Feels Like";
    const value = 20;
    const isMetric = true;
    const isLoading = false;

    render(
      <TodaysWeatherItem
        title={title}
        value={value}
        isMetric={isMetric}
        isLoading={isLoading}
      />
    );

    const titleElement = screen.getByTestId("todaysWeatherItem.title");
    const valueElement = screen.getByTestId("todaysWeatherItem.value");
    const isLoadingElement = screen.queryByTestId(
      "todaysWeatherItem.isLoadingState"
    );

    expect(titleElement).toContainHTML(title);
    expect(valueElement).toContainHTML(value.toString());
    expect(isLoadingElement).not.toBeInTheDocument();
  });

  test("renders the wind title in imperial units", () => {
    const title = "Wind";
    const value = 20;
    const isMetric = false;
    const isLoading = false;

    render(
      <TodaysWeatherItem
        title={title}
        value={value}
        isMetric={isMetric}
        isLoading={isLoading}
      />
    );

    const titleElement = screen.getByTestId("todaysWeatherItem.title");
    const valueElement = screen.getByTestId("todaysWeatherItem.value");
    const isLoadingElement = screen.queryByTestId(
      "todaysWeatherItem.isLoadingState"
    );

    expect(titleElement).toContainHTML(title);
    expect(valueElement).toContainHTML(value + "mph");
    expect(isLoadingElement).not.toBeInTheDocument();
  });

  test("renders the precipitation title in metric units", () => {
    const title = "Precipitation";
    const value = 2;
    const isMetric = true;
    const isLoading = false;

    render(
      <TodaysWeatherItem
        title={title}
        value={value}
        isMetric={isMetric}
        isLoading={isLoading}
      />
    );

    const titleElement = screen.getByTestId("todaysWeatherItem.title");
    const valueElement = screen.getByTestId("todaysWeatherItem.value");
    const isLoadingElement = screen.queryByTestId(
      "todaysWeatherItem.isLoadingState"
    );

    expect(titleElement).toContainHTML(title);
    expect(valueElement).toContainHTML(value + "mm");
    expect(isLoadingElement).not.toBeInTheDocument();
  });

  test("renders the is loading screen", () => {
    const title = "Precipitation";
    const value = 2;
    const isMetric = true;
    const isLoading = true;

    render(
      <TodaysWeatherItem
        title={title}
        value={value}
        isMetric={isMetric}
        isLoading={isLoading}
      />
    );

    const titleElement = screen.queryByTestId("todaysWeatherItem.title");
    const valueElement = screen.queryByTestId("todaysWeatherItem.value");
    const isLoadingElement = screen.getByTestId(
      "todaysWeatherItem.isLoadingState"
    );

    expect(isLoadingElement).toBeInTheDocument();
    expect(titleElement).not.toBeInTheDocument();
    expect(valueElement).not.toBeInTheDocument();
  });
});
