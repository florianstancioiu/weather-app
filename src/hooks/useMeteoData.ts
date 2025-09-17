import { useState, useEffect } from "react";
import { fetchWeatherApi } from "openmeteo";
import fetchJson from "../utils/fetchJson";
import { getDayName, getMonthShortName } from "../utils/date";

import { type TodaysWeather as TodaysWeatherType } from "../components/TodaysWeather/TodaysWeather";
import { type ForecastDailyData } from "../components/DailyForecast/DailyForecast";
import { type ForecastHourlyData } from "../components/HourlyForecast/HourlyForecast";

const useMeteoData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [noSearchResults, setNoSearchResults] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isMetric, _setIsMetric] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [todaysPrimaryData, setTodaysPrimaryData] =
    useState<TodaysWeatherType["primaryData"]>();
  const [todaysSecondaryData, setTodaysSecondaryData] =
    useState<TodaysWeatherType["secondaryData"]>();
  const [dailyData, setDailyData] = useState<ForecastDailyData>();
  const [hourlyData, setHourlyData] = useState<ForecastHourlyData>();

  const resetState = () => {
    setIsLoading(false);
    setNoSearchResults(false);
    setIsError(false);
    setSearchKeyword("");
    setTodaysPrimaryData(undefined);
    setTodaysSecondaryData(undefined);
    setDailyData(undefined);
    setHourlyData(undefined);
  };

  const retriveDataFromOpenMeteo = async (
    latitude: number,
    longitude: number,
    city?: string,
    country?: string
  ) => {
    try {
      let theCity = city;
      let theCountry = country;

      if (city === undefined || country === undefined) {
        theCity = "Current location";
        theCountry = "";
      }

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
        city: theCity !== undefined ? theCity : "",
        country: theCountry !== undefined ? theCountry : "",
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
      setNoSearchResults(false);
    } catch {
      setIsError(true);
    }
  };

  useEffect(() => {
    const getMeteoDataOnPageLoad = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            setIsLoading(true);
            setIsError(false);
            retriveDataFromOpenMeteo(latitude, longitude);
          },
          () => {
            resetState();
          }
        );
      }
    };

    getMeteoDataOnPageLoad();
  }, []);

  useEffect(() => {
    const getMeteoDataOnKeywordChange = async () => {
      try {
        if (searchKeyword.trim() === "") {
          return;
        }

        setIsLoading(true);
        setIsError(false);

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

        const {
          longitude,
          latitude,
          name: city,
          country,
        } = geocodedCity?.results[0];

        retriveDataFromOpenMeteo(latitude, longitude, city, country);
      } catch {
        setIsError(true);
      }
    };

    getMeteoDataOnKeywordChange();
  }, [searchKeyword]);

  return {
    isLoading,
    isMetric,
    todaysPrimaryData,
    todaysSecondaryData,
    dailyData,
    hourlyData,
    noSearchResults,
    isError,
    setIsLoading,
    setNoSearchResults,
    setIsError,
    setSearchKeyword,
    setTodaysPrimaryData,
    setTodaysSecondaryData,
    setDailyData,
    setHourlyData,
    resetState,
  };
};

export default useMeteoData;
