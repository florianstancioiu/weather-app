import WeatherCode from "../WeatherCode/WeatherCode";

export type HourlyForecastItem = {
  hour?: string;
  temperature?: number;
  weatherCode?: number;
  isLoading: boolean;
};

const HourlyForecastItem = ({
  hour,
  temperature,
  weatherCode,
  isLoading,
}: HourlyForecastItem) => {
  return (
    <>
      {!isLoading && (
        <li className="bg-neutral-3 rounded-[0.313rem] flex justify-between items-center h-[3.75rem] px-[1.125rem] border-[1px] border-light-blue xl:h-[3.75rem]">
          <div className="flex items-center gap-[1rem]">
            <WeatherCode code={weatherCode} className="w-[2.5rem]" />
            <p>{hour}</p>
          </div>
          <p>{temperature}°</p>
        </li>
      )}
      {isLoading && (
        <li className="bg-neutral-3 rounded-[0.313rem] flex justify-between items-center h-[3.75rem] px-[1.125rem] border-[1px] border-light-blue xl:h-[3.75rem]"></li>
      )}
    </>
  );
};

export default HourlyForecastItem;
