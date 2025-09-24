import { render, screen } from "@testing-library/react";

import DailyForecast from "./DailyForecast";
import { data } from "../../utils/stories/dailyForecast";

describe("<DailyForecast> component", () => {
  test("renders the component", () => {
    render(<DailyForecast data={data} isMetric={true} isLoading={false} />);

    const buttonElement = screen.getByTestId("dailyForecast.title");
    const dailyForecastItemElement = screen.getAllByTestId(
      "dailyForecastItem.dailyForecastItem"
    );

    expect(buttonElement).toBeInTheDocument();
    expect(dailyForecastItemElement).toHaveLength(7);
  });

  test("renders the is loading screen", () => {
    render(<DailyForecast data={data} isMetric={true} isLoading={true} />);

    const buttonElement = screen.getByTestId("dailyForecast.title");
    const dailyForecastItemElement = screen.getAllByTestId(
      "dailyForecastItem.isLoadingState"
    );

    expect(buttonElement).toBeInTheDocument();
    expect(dailyForecastItemElement).toHaveLength(7);
  });
});
