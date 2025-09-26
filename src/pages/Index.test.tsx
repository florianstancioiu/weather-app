import { render, screen, fireEvent, act } from "@testing-library/react";
import { vi, type Mock } from "vitest";

import mockNavigatorGeolocation from "../utils/tests/mockNavigatorGeolocation";
import {
  bucharestData,
  todaysWeatherData,
  dailyForecastData,
  hourlyForecastData,
  geocodingData,
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
      () => new Promise((resolve) => resolve(bucharestData))
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
    dailyForecastTitleElements.forEach((title, index) =>
      expect(title).toContainHTML(dailyForecastData.title[index])
    );
    dailyForecastMaximumTemperatureElements.forEach((temp, index) =>
      expect(temp).toContainHTML(dailyForecastData.maximumTemperature[index])
    );
    dailyForecastMinimumTemperatureElements.forEach((temp, index) =>
      expect(temp).toContainHTML(dailyForecastData.minimumTemperature[index])
    );

    // HourlyForecast section check
    expect(daysDropdownTitleElement).toContainHTML(hourlyForecastData.title);
    hourlyForecastItemHourElements.forEach((hour, index) =>
      expect(hour).toContainHTML(hourlyForecastData.hour[index])
    );
    hourlyForecastItemTemperatureElements.forEach((temperature, index) =>
      expect(temperature).toContainHTML(hourlyForecastData.temperature[index])
    );
  });

  test("renders the select a location state when the Geolocation Web API is turned off", async () => {
    // Instruct vitest to mock fetch on the `window` object.
    global.fetch = vi.fn(
      () => new Promise((resolve) => resolve(bucharestData))
    ) as Mock;

    const { getCurrentPositionMock } = mockNavigatorGeolocation();

    getCurrentPositionMock.mockImplementationOnce((_success, reject) => {
      return Promise.reject(reject("The user didnt share the location"));
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
    const weatherItemValueElements = await screen.findAllByTestId(
      "todaysWeatherItem.value"
    );

    // DailyForecast elements
    const dailyForecastItemElements = await screen.findAllByTestId(
      "dailyForecastItem.dailyForecastItem"
    );

    // HourlyForecast elements
    const daysDropdownTitleElement = await screen.findByTestId(
      "daysDropdown.title"
    );
    const hourlyForecastItemIsLoadingStateElements =
      await screen.findAllByTestId("hourlyForecastItem.isLoadingState");

    // TodaysWeather section check
    expect(titleElement).toContainHTML("Please search for a place.");
    expect(weatherCodeImageElement[0].getAttribute("alt")).toEqual(
      "We don't know how the weather is outside."
    );
    expect(temperatureElement).toContainHTML("NA");
    weatherItemValueElements.forEach((value) =>
      expect(value).toHaveTextContent("-")
    );

    // DailyForecast section check
    expect(dailyForecastItemElements).toHaveLength(7);
    dailyForecastItemElements.forEach((element) =>
      expect(element).toHaveTextContent("")
    );

    // HourlyForecast section check
    expect(daysDropdownTitleElement).toHaveTextContent("No options");
    expect(hourlyForecastItemIsLoadingStateElements).toHaveLength(24);
    hourlyForecastItemIsLoadingStateElements.forEach((element) =>
      expect(element).toHaveTextContent("")
    );
  });

  test("renders the Bucharest, Romania data on searching 'Bucharest, Romania'", async () => {
    const searchkeyword = "Bucharest, Romania";

    // Mock navigator.geolocation
    const { getCurrentPositionMock } = mockNavigatorGeolocation();
    getCurrentPositionMock.mockImplementationOnce((_success, reject) => {
      return Promise.reject(reject("The user didnt share the location"));
    });

    // Mock fetch
    global.fetch = (vi.fn() as Mock)
      .mockReturnValueOnce({
        ok: true,
        json: () => Promise.resolve(geocodingData),
      } as unknown as Response)
      .mockReturnValueOnce(bucharestData as unknown as Response);

    render(<Index />);

    // Search elements
    const searchInputElement = await screen.findByTestId("searchCity.input");
    const buttonElement = await screen.findByTestId("button.button");

    // Fire events
    await act(async () => {
      fireEvent.change(searchInputElement, {
        target: { value: searchkeyword },
      });
      fireEvent.click(buttonElement);
      /*
        fireEvent.keyDown(searchInputElement, {
          key: "Enter",
          code: "Enter",
          keyCode: 13,
          charCode: 13,
        });
        */
    });

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(searchInputElement).toHaveValue(searchkeyword);
    expect(global.fetch).toHaveBeenNthCalledWith(
      1,
      "https://geocoding-api.open-meteo.com/v1/search?name=Bucharest, Romania&count=1&language=en&format=json",
      undefined
    );

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
    expect(titleElement).toHaveTextContent(searchkeyword);
    expect(weatherCodeImageElement[0].getAttribute("alt")).toEqual(
      todaysWeatherData.weatherCodeImage
    );
    expect(temperatureElement).toContainHTML(todaysWeatherData.temperature);

    // DailyForecast section check
    dailyForecastTitleElements.forEach((title, index) =>
      expect(title).toContainHTML(dailyForecastData.title[index])
    );
    dailyForecastMaximumTemperatureElements.forEach((temp, index) =>
      expect(temp).toContainHTML(dailyForecastData.maximumTemperature[index])
    );
    dailyForecastMinimumTemperatureElements.forEach((temp, index) =>
      expect(temp).toContainHTML(dailyForecastData.minimumTemperature[index])
    );

    // HourlyForecast section check
    expect(daysDropdownTitleElement).toContainHTML(hourlyForecastData.title);
    hourlyForecastItemHourElements.forEach((hour, index) =>
      expect(hour).toContainHTML(hourlyForecastData.hour[index])
    );
    hourlyForecastItemTemperatureElements.forEach((temperature, index) =>
      expect(temperature).toContainHTML(hourlyForecastData.temperature[index])
    );
  });
});
