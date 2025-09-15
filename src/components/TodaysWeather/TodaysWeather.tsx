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
    <main className="mb-[2.5rem] dsktp:mb-[3.25rem]">
      <div className="mb-[1.25rem]">
        {!isLoading && (
          <div className="bg-[url('/images/bg-today-small.svg')] bg-cover bg-center rounded-[1rem] dsktp:h-[17.875rem] dsktp:flex dsktp:justify-between dsktp:items-center dsktp:px-[1.625rem] dsktp:bg-[url('/images/bg-today-large.svg')]">
            <div className="text-center pt-[3.375rem] mb-[2.75rem] dsktp:pt-0 dsktp:mb-0 dsktp:text-left">
              <h2 className="mb-[1.5rem] font-bold text-[1.5rem] dsktp:text-[1.75rem] dsktp:leading-[120%]">
                {city ? `${city}, ${country}` : "Please search for a place"}
              </h2>
              <p className="text-grayish-white">{date}</p>
            </div>
            <div className="flex justify-center items-center px-[1.25rem] pb-[4.25rem] dsktp:pb-0">
              <WeatherCode
                code={weatherCode || 100}
                className="w-[6rem] h-[6rem] dsktp:w-[7.5rem] dsktp:h-[7.5rem]"
              />
              <p className="text-[4.25rem] italic dsktp:text-[6rem] dsktp:font-semibold">
                {temperature ? Math.floor(temperature) : "NA"}°
              </p>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="bg-background-2 rounded-[1rem] h-[17.875rem] grid place-items-center dsktp:px-[1.625rem] dsktp:text-center">
            <div>
              <p>Loading...</p>
            </div>
          </div>
        )}
      </div>
      <ul className="grid gap-[1rem] grid-cols-2 dsktp:grid-cols-4">
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
