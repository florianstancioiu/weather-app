import { render, screen } from "@testing-library/react";
import { vi, type Mock } from "vitest";

import mockNavigatorGeolocation from "../utils/tests/mockNavigatorGeolocation";
import {
  BucharestDummyData,
  todaysWeatherData,
  dailyForecastData,
  hourlyForecastData,
} from "../utils/tests/dummyData";
import Index from "./Index";

describe("<Index> page", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders the component", () => {
    render(<Index />);

    const titleElement = screen.getByTestId("todaysWeather.title");

    expect(titleElement).toContainHTML("Please search for a place.");
  });

  test("renders the Dummy Data when the Geolocation Web API is turned on", async () => {
    // Instruct vitest to mock fetch on the `window` object.
    global.fetch = vi.fn(
      () => new Promise((resolve) => resolve(BucharestDummyData))
    ) as Mock;

    const { getCurrentPositionMock } = mockNavigatorGeolocation();

    getCurrentPositionMock.mockImplementationOnce((success) => {
      return Promise.resolve(
        success({
          coords: {
            latitude: 44.4268,
            longitude: 26.1025,
          },
        })
      );
    });

    render(<Index />);

    // TodaysWeather elements
    const titleElement = await screen.findByTestId("todaysWeather.title");
    const weatherCodeImageElement = await screen.findAllByTestId(
      "weatherCodeImage.weatherCodeImage"
    );
    const temperatureElement = await screen.findByTestId(
      "todaysWeather.temperature"
    );

    // DailyForecast elements
    const dailyForecastTitleElements = await screen.findAllByTestId(
      "dailyForecastItem.title"
    );
    const dailyForecastMaximumTemperatureElements =
      await screen.findAllByTestId("dailyForecastItem.maximumTemperature");
    const dailyForecastMinimumTemperatureElements =
      await screen.findAllByTestId("dailyForecastItem.minimumTemperature");

    // HourlyForecast elements
    const daysDropdownTitleElement = await screen.findByTestId(
      "daysDropdown.title"
    );
    const hourlyForecastItemHourElements = await screen.findAllByTestId(
      "hourlyForecastItem.hour"
    );
    const hourlyForecastItemTemperatureElements = await screen.findAllByTestId(
      "hourlyForecastItem.temperature"
    );

    // TodaysWeather section check
    expect(titleElement).toContainHTML(todaysWeatherData.title);
    expect(weatherCodeImageElement[0].getAttribute("alt")).toEqual(
      todaysWeatherData.weatherCodeImage
    );
    expect(temperatureElement).toContainHTML(todaysWeatherData.temperature);

    // DailyForecast section check
    dailyForecastTitleElements.map((title, index) =>
      expect(title).toContainHTML(dailyForecastData.title[index])
    );
    dailyForecastMaximumTemperatureElements.map((temp, index) =>
      expect(temp).toContainHTML(dailyForecastData.maximumTemperature[index])
    );
    dailyForecastMinimumTemperatureElements.map((temp, index) =>
      expect(temp).toContainHTML(dailyForecastData.minimumTemperature[index])
    );

    // HourlyForecast section check
    expect(daysDropdownTitleElement).toContainHTML(hourlyForecastData.title);
    hourlyForecastItemHourElements.map((hour, index) =>
      expect(hour).toContainHTML(hourlyForecastData.hour[index])
    );
    hourlyForecastItemTemperatureElements.map((temperature, index) =>
      expect(temperature).toContainHTML(hourlyForecastData.temperature[index])
    );
  });
});
