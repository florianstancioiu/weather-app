import { render, screen } from "@testing-library/react";
import { vi, type Mock } from "vitest";

import mockNavigatorGeolocation from "../utils/tests/mockNavigatorGeolocation";
import BucharestDummyData from "../utils/tests/openMeteoDummyData";
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
    // Here we tell Vitest to mock fetch on the `window` object.
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

    const titleElement = await screen.findByTestId("todaysWeather.title");
    const temperatureElement = await screen.findByTestId(
      "todaysWeather.temperature"
    );

    expect(titleElement).toContainHTML("Current location");
    expect(temperatureElement).toContainHTML("17°");
  });
});
