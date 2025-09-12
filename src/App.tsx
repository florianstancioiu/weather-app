import { useState, useEffect } from "react";
import { fetchWeatherApi } from "openmeteo";

import Header from "./components/Header/Header";
import SearchCity from "./components/SearchCity/SearchCity";
import TodaysWeather from "./components/TodaysWeather/TodaysWeather";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";

const fetchJson = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

const App = () => {
  const [isLoading, _setIsLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    const getMeteoData = async () => {
      if (searchKeyword.trim() === "") {
        return;
      }

      const geocodedCity = await fetchJson(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchKeyword}&count=1&language=en&format=json`
      );

      const { longitude, latitude } = geocodedCity?.results[0];

      console.log(geocodedCity);

      const params = {
        latitude,
        longitude,
        hourly: "temperature_2m",
        current: "temperature_2m",
      };
      const url = "https://api.open-meteo.com/v1/forecast";
      const responses = await fetchWeatherApi(url, params);

      // Process first location. Add a for-loop for multiple locations or weather models
      const response = responses[0];

      console.dir(response);

      // Attributes for timezone and location
      const elevation = response.elevation();
      const utcOffsetSeconds = response.utcOffsetSeconds();

      console.log(
        `\nCoordinates: ${latitude}°N ${longitude}°E`,
        `\nElevation: ${elevation}m asl`,
        `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`
      );

      const current = response.current()!;
      const hourly = response.hourly()!;

      // Note: The order of weather variables in the URL query and the indices below need to match!
      const weatherData = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature_2m: current.variables(0)!.value(),
        },
        hourly: {
          time: [
            ...Array(
              (Number(hourly.timeEnd()) - Number(hourly.time())) /
                hourly.interval()
            ),
          ].map(
            (_, i) =>
              new Date(
                (Number(hourly.time()) +
                  i * hourly.interval() +
                  utcOffsetSeconds) *
                  1000
              )
          ),
          temperature_2m: hourly.variables(0)!.valuesArray(),
        },
      };

      // 'weatherData' now contains a simple structure with arrays with datetime and weather data
      console.log(
        `\nCurrent time: ${weatherData.current.time}`,
        weatherData.current.temperature_2m
      );
      console.log("\nHourly data", weatherData.hourly);
    };

    getMeteoData();
  }, [searchKeyword]);

  const onSearchCityChangeHandler = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const onSearchCitySearchHandler = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  return (
    <>
      <Header />
      <SearchCity
        onChange={onSearchCityChangeHandler}
        onSearch={onSearchCitySearchHandler}
      />
      <div className="dsktp:w-[75.75rem] dsktp:mx-auto dsktp:grid dsktp:grid-cols-3 dsktp:items-start dsktp:gap-[2rem]">
        <div className="dsktp:col-span-2">
          <TodaysWeather isLoading={isLoading} />
          <DailyForecast isLoading={isLoading} />
        </div>
        <HourlyForecast isLoading={isLoading} />
      </div>
    </>
  );
};

export default App;
