import { render, screen } from "@testing-library/react";

import WeatherCodeImage from "./WeatherCodeImage";

describe("<WeatherCodeImage> component", () => {
  test("renders the component", () => {
    const code = 0;
    const className = "";

    render(<WeatherCodeImage code={code} className={className} />);

    const element = screen.getByTestId("weatherCodeImage.weatherCodeImage");

    expect(element).toBeInTheDocument();
    expect(element.classList.value).toEqual("");
  });

  test("renders the partly cloudy image with classes", () => {
    const code = 1;
    const className = "w-[20px] h-[20px]";

    render(<WeatherCodeImage code={code} className={className} />);

    const element = screen.getByTestId("weatherCodeImage.weatherCodeImage");

    expect(element).toBeInTheDocument();
    expect(element.classList.value).toEqual(className);
    expect(element.getAttribute("alt")).toEqual("Outside is partly cloudy.");
  });
});
