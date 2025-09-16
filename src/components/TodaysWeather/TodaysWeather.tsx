import TodaysWeatherItem from "../TodaysWeatherItem/TodaysWeatherItem";
import WeatherCode from "../WeatherCode/WeatherCode";

export type TodaysWeather = {
  primaryData?: {
    city: string;
    country: string;
    date: string;
    temperature: number;
    weatherCode: number;
  };
  secondaryData?: {
    feelsLike: number;
    humidity: number;
    wind: number;
    precipitation: number;
  };
  isMetric: boolean;
  isLoading: boolean;
};

const TodaysWeather = ({
  primaryData,
  secondaryData,
  isMetric,
  isLoading,
}: TodaysWeather) => {
  const { city, country, date, temperature, weatherCode } = primaryData || {};
  const { feelsLike, humidity, wind, precipitation } = secondaryData || {};

  return (
    <main className="mb-[2.5rem] xl:mb-[3.25rem]">
      <div className="mb-[1.25rem]">
        {!isLoading && (
          <div className="bg-[url('/images/bg-today-small.svg')] bg-cover bg-center rounded-[1rem] xl:h-[17.875rem] xl:flex xl:justify-between xl:items-center xl:px-[1.625rem] xl:bg-[url('/images/bg-today-large.svg')]">
            <div className="text-center pt-[3.375rem] mb-[2.75rem] xl:pt-0 xl:mb-0 xl:text-left">
              <h2 className="mb-[1.5rem] font-bold text-[1.5rem] xl:text-[1.75rem] xl:leading-[120%]">
                {city ? `${city}, ${country}` : "Please search for a place"}
              </h2>
              <p className="text-grayish-white">{date}</p>
            </div>
            <div className="flex justify-center items-center px-[1.25rem] pb-[4.25rem] xl:pb-0">
              <WeatherCode
                code={weatherCode || 100}
                className="w-[6rem] h-[6rem] xl:w-[7.5rem] xl:h-[7.5rem]"
              />
              <p className="text-[4.25rem] italic xl:text-[6rem] xl:font-semibold">
                {temperature ? Math.floor(temperature) : "NA"}°
              </p>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="bg-background-2 rounded-[1rem] h-[17.875rem] grid place-items-center xl:px-[1.625rem] xl:text-center">
            <div>
              <p>Loading...</p>
            </div>
          </div>
        )}
      </div>
      <ul className="grid gap-[1rem] grid-cols-2 xl:grid-cols-4">
        <TodaysWeatherItem
          title="Feels Like"
          value={feelsLike}
          isLoading={isLoading}
          isMetric={isMetric}
        />
        <TodaysWeatherItem
          title="Humidity"
          value={humidity}
          isLoading={isLoading}
          isMetric={isMetric}
        />
        <TodaysWeatherItem
          title="Wind"
          value={wind}
          isLoading={isLoading}
          isMetric={isMetric}
        />
        <TodaysWeatherItem
          title="Precipitation"
          value={precipitation}
          isLoading={isLoading}
          isMetric={isMetric}
        />
      </ul>
    </main>
  );
};

export default TodaysWeather;
