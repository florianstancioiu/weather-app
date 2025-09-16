import { useState, useEffect } from "react";
import { fetchWeatherApi } from "openmeteo";
import fetchJson from "./utils/fetchJson";
import { getDayName, getMonthShortName } from "./utils/date";

import Header from "./components/Header/Header";
import SearchCity from "./components/SearchCity/SearchCity";
import TodaysWeather from "./components/TodaysWeather/TodaysWeather";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";
import NoSearchResults from "./components/NoSearchResults/NoSearchResults";

import { type TodaysWeather as TodaysWeatherType } from "./components/TodaysWeather/TodaysWeather";
import { type ForecastDailyData } from "./components/DailyForecast/DailyForecast";
import { type ForecastHourlyData } from "./components/HourlyForecast/HourlyForecast";

type TodaysData = Omit<TodaysWeatherType, "isLoading">;

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [noSearchResults, setNoSearchResults] = useState(false);
  const [isMetric, _setIsMetric] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [todaysPrimaryData, setTodaysPrimaryData] = useState<
    TodaysData["primaryData"] | undefined
  >();
  const [todaysSecondaryData, setTodaysSecondaryData] = useState<
    TodaysData["secondaryData"] | undefined
  >();
  const [dailyData, setDailyData] = useState<ForecastDailyData>();
  const [hourlyData, setHourlyData] = useState<ForecastHourlyData>();

  useEffect(() => {
    const getMeteoData = async () => {
      if (searchKeyword.trim() === "") {
        return;
      }

      setIsLoading(true);

      const geocodedCity = await fetchJson(
        `https://geocoding-api.open-meteo.com/v1/search?name=${searchKeyword}&count=1&language=en&format=json`
      );

      if (
        geocodedCity?.results === undefined ||
        geocodedCity?.results.length === 0
      ) {
        setNoSearchResults(true);
        return;
      }

      const { longitude, latitude, name, country } = geocodedCity?.results[0];

      const params = {
        latitude,
        longitude,
        daily: ["weather_code", "temperature_2m_max", "temperature_2m_min"],
        hourly: ["temperature_2m", "weather_code"],
        current: [
          "temperature_2m",
          "weather_code",
          "precipitation",
          "wind_speed_10m",
          "relative_humidity_2m",
          "apparent_temperature",
        ],
        timezone: "auto",
      };
      const url = "https://api.open-meteo.com/v1/forecast";
      const responses = await fetchWeatherApi(url, params);

      if (responses.length === 0) {
        setNoSearchResults(true);
        return;
      }

      // Process first location. Add a for-loop for multiple locations or weather models
      const response = responses[0];

      // Attributes for timezone and location
      /*
      const elevation = response.elevation();
      const timezone = response.timezone();
      const timezoneAbbreviation = response.timezoneAbbreviation();
      */
      const utcOffsetSeconds = response.utcOffsetSeconds();

      const current = response.current()!;
      const hourly = response.hourly()!;
      const daily = response.daily()!;

      // Note: The order of weather variables in the URL query and the indices below need to match!
      const weatherData = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature_2m: current.variables(0)!.value(),
          weather_code: current.variables(1)!.value(),
          precipitation: current.variables(2)!.value(),
          wind_speed_10m: current.variables(3)!.value(),
          relative_humidity_2m: current.variables(4)!.value(),
          apparent_temperature: current.variables(5)!.value(),
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
          weather_code: hourly.variables(1)!.valuesArray(),
        },
        daily: {
          time: [
            ...Array(
              (Number(daily.timeEnd()) - Number(daily.time())) /
                daily.interval()
            ),
          ].map(
            (_, i) =>
              new Date(
                (Number(daily.time()) +
                  i * daily.interval() +
                  utcOffsetSeconds) *
                  1000
              )
          ),
          weather_code: daily.variables(0)!.valuesArray(),
          temperature_2m_max: daily.variables(1)!.valuesArray(),
          temperature_2m_min: daily.variables(2)!.valuesArray(),
        },
      };

      const currentTime = weatherData.current.time;
      setTodaysPrimaryData({
        city: name,
        country: country,
        date: `${getDayName(currentTime.getDay())}, ${getMonthShortName(
          currentTime.getMonth()
        )} ${currentTime.getDate()}, ${currentTime.getFullYear()}`,
        temperature: weatherData.current.temperature_2m,
        weatherCode: weatherData.current.weather_code,
      });

      setTodaysSecondaryData({
        precipitation: weatherData.current.precipitation,
        wind: weatherData.current.wind_speed_10m,
        humidity: current.variables(4)!.value(),
        feelsLike: current.variables(5)!.value(),
      });

      setDailyData(weatherData.daily);
      setHourlyData(weatherData.hourly);

      setIsLoading(false);
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
      {noSearchResults && <NoSearchResults />}
      {!noSearchResults && (
        <div className="dsktp:w-[75.75rem] dsktp:mx-auto dsktp:grid dsktp:grid-cols-3 dsktp:items-start dsktp:gap-[2rem]">
          <div className="dsktp:col-span-2">
            <TodaysWeather
              primaryData={todaysPrimaryData}
              secondaryData={todaysSecondaryData}
              isMetric={isMetric}
              isLoading={isLoading}
            />
            <DailyForecast
              data={dailyData}
              isMetric={isMetric}
              isLoading={isLoading}
            />
          </div>
          <HourlyForecast data={hourlyData} isLoading={isLoading} />
        </div>
      )}
    </>
  );
};

export default App;
