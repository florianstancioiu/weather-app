import { useState, useEffect } from "react";
import { fetchWeatherApi } from "openmeteo";
import fetchJson from "../utils/fetchJson";
import { getDayName, getMonthShortName } from "../utils/date";

import { type TodaysWeather as TodaysWeatherType } from "../components/TodaysWeather/TodaysWeather";
import { type ForecastDailyData } from "../components/DailyForecast/DailyForecast";
import { type ForecastHourlyData } from "../components/HourlyForecast/HourlyForecast";
import getWeatherData from "../utils/getWeatherData";

// TODO: Extract this hook into smaller hooks if possible
const useMeteoData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [noSearchResults, setNoSearchResults] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isMetric, setIsMetric] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [todaysPrimaryData, setTodaysPrimaryData] =
    useState<TodaysWeatherType["primaryData"]>();
  const [todaysSecondaryData, setTodaysSecondaryData] =
    useState<TodaysWeatherType["secondaryData"]>();
  const [dailyData, setDailyData] = useState<ForecastDailyData>();
  const [hourlyData, setHourlyData] = useState<ForecastHourlyData>();
  const [lat, setLatitude] = useState<number>();
  const [lon, setLongitude] = useState<number>();
  const [historyOfSearches, setHistoryOfSearches] = useState<string[]>();

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

  const setSearchHistoryInLocalStorage = () => {
    const existingHistory =
      localStorage.getItem("searchHistory") !== undefined
        ? (JSON.parse(
            localStorage.getItem("searchHistory") || JSON.stringify([])
          ) as string[])
        : [];

    if (
      !existingHistory.find((val) => val === searchKeyword) &&
      searchKeyword.trim() !== ""
    ) {
      existingHistory.unshift(searchKeyword);

      localStorage.setItem(
        "searchHistory",
        JSON.stringify(existingHistory.slice(0, 4))
      );

      setHistoryOfSearches(existingHistory.slice(0, 4));
    }
  };

  const retriveDataFromOpenMeteo = async (
    latitude: number,
    longitude: number,
    city?: string,
    country?: string
  ) => {
    // set the variables from the function level scope
    setLatitude(latitude);
    setLongitude(longitude);

    try {
      let theCity = city;
      let theCountry = country;

      if (city === undefined || country === undefined) {
        theCity = "Current location";
        theCountry = "";
      }

      let params = {
        latitude,
        longitude,
        wind_speed_unit: "mph",
        temperature_unit: "fahrenheit",
        precipitation_unit: "inch",
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

      // Delete/Remove the wind_speed_unit, temperature_unit, precipitation_unit
      // from the params object
      if (isMetric) {
        delete (params as { wind_speed_unit?: string }).wind_speed_unit;
        delete (params as { temperature_unit?: string }).temperature_unit;
        delete (params as { precipitation_unit?: string }).precipitation_unit;
      }

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
      const weatherData = getWeatherData(
        current,
        utcOffsetSeconds,
        hourly,
        daily
      );

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

      setSearchHistoryInLocalStorage();
    } catch {
      setIsError(true);
    }
  };

  useEffect(() => {
    const getHistoryOfSearchesFromLocalstorage = () => {
      if (localStorage.getItem("searchHistory")) {
        const existingHistory = JSON.parse(
          localStorage.getItem("searchHistory") ?? JSON.stringify([])
        ) as string[];

        setHistoryOfSearches(existingHistory);
      }
    };

    const getMeteoDataOnPageLoad = async () => {
      try {
        if (navigator.geolocation) {
          setIsLoading(true);
          const response = new Promise<{
            latitude: number;
            longitude: number;
          }>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                return resolve(position.coords);
              },
              (error) => reject(error)
            );
          });

          response
            .then(({ latitude, longitude }) => {
              retriveDataFromOpenMeteo(latitude, longitude);
            })
            .catch(() => setIsLoading(false));
        }
      } catch (e: unknown) {
        setIsLoading(false);
        const error = e as Error;

        console.error(error.message);
      }
    };

    getHistoryOfSearchesFromLocalstorage();
    getMeteoDataOnPageLoad();
  }, []);

  useEffect(() => {
    const getMeteoDataOnDependencyChange = async () => {
      try {
        let city = "Current location";
        let country = "";
        let latitude = lat;
        let longitude = lon;

        if (searchKeyword.trim() !== "") {
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

          latitude = geocodedCity?.results[0].latitude;
          longitude = geocodedCity?.results[0].longitude;
          city = geocodedCity?.results[0].name;
          country = geocodedCity?.results[0].country;

          setLatitude(latitude);
          setLongitude(longitude);
        }

        if (latitude === undefined || longitude === undefined) {
          return;
        }

        retriveDataFromOpenMeteo(latitude, longitude, city, country);
      } catch {
        setIsError(true);
      }
    };

    getMeteoDataOnDependencyChange();
  }, [searchKeyword, isMetric]);

  return {
    isLoading,
    isMetric,
    todaysPrimaryData,
    todaysSecondaryData,
    dailyData,
    hourlyData,
    noSearchResults,
    isError,
    historyOfSearches,
    setIsLoading,
    setIsMetric,
    setTodaysPrimaryData,
    setTodaysSecondaryData,
    setDailyData,
    setHourlyData,
    setNoSearchResults,
    setIsError,
    setSearchKeyword,
    resetState,
  };
};

export default useMeteoData;
