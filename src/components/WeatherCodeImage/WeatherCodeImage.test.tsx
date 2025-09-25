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

  test("renders the partly cloudy image with classes", () => {
    const code = 1;
    const className = "w-[20px] h-[20px]";

    render(<WeatherCodeImage code={code} className={className} />);

    const element = screen.getByTestId("weatherCodeImage.weatherCodeImage");

    expect(element).toBeInTheDocument();
    expect(element.classList.value).toEqual(className);
    expect(element.getAttribute("alt")).toEqual("Outside is partly cloudy.");
  });

  test("renders the partly cloudy image without classes", () => {
    render(<WeatherCodeImage code={1} />);

    const element = screen.getByTestId("weatherCodeImage.weatherCodeImage");

    expect(element).toBeInTheDocument();
    expect(element.classList.value).toEqual("");
    expect(element.getAttribute("alt")).toEqual("Outside is partly cloudy.");
  });

  test("renders the default image without classes", () => {
    render(<WeatherCodeImage />);

    const element = screen.getByTestId("weatherCodeImage.weatherCodeImage");

    expect(element).toBeInTheDocument();
    expect(element.classList.value).toEqual("");
    expect(element.getAttribute("alt")).toEqual(
      "We don't know how the weather is outside."
    );
  });

  test("renders the drizzle image without classes", () => {
    render(<WeatherCodeImage code={51} />);

    const element = screen.getByTestId("weatherCodeImage.weatherCodeImage");

    expect(element).toBeInTheDocument();
    expect(element.classList.value).toEqual("");
    expect(element.getAttribute("alt")).toEqual("Outside is drizzling.");
  });

  test("renders the snow image without classes", () => {
    render(<WeatherCodeImage code={71} />);

    const element = screen.getByTestId("weatherCodeImage.weatherCodeImage");

    expect(element).toBeInTheDocument();
    expect(element.classList.value).toEqual("");
    expect(element.getAttribute("alt")).toEqual("Outside is snowing.");
  });

  test("renders the storm image without classes", () => {
    render(<WeatherCodeImage code={95} />);

    const element = screen.getByTestId("weatherCodeImage.weatherCodeImage");

    expect(element).toBeInTheDocument();
    expect(element.classList.value).toEqual("");
    expect(element.getAttribute("alt")).toEqual("Outside is a storm.");
  });
});
