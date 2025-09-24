import WeatherCodeImage from "../WeatherCodeImage/WeatherCodeImage";
import { getDayShortName, getDayName } from "../../utils/date";

export type NumericDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type DailyForecastItem = {
  day?: NumericDay;
  weatherCode?: number;
  maximum?: number;
  minimum?: number;
  isMetric: boolean;
  isLoading: boolean;
};

const DailyForecastItem = ({
  day,
  weatherCode,
  maximum,
  minimum,
  isMetric,
  isLoading,
}: DailyForecastItem) => {
  const tempSuffix = isMetric ? "C" : "F";

  return (
    <>
      {!isLoading && (
        <li
          data-testid="dailyForecastItem.dailyForecastItem"
          className="px-[0.75rem] py-[1rem] bg-neutral-2 text-white rounded-[0.625rem] border-[2px] border-dark-blue min-w-[5.563rem] h-[10.313rem] xl:h-[10.25rem] md:py-[1rem] xl:px-[0.625rem]"
        >
          {day !== undefined && (
            <p
              className="mb-[1rem] text-center xl:leading-[120%]"
              data-testid="dailyForecastItem.title"
              title={getDayName(day)}
            >
              {getDayShortName(day)}
            </p>
          )}
          {day !== undefined ? (
            <WeatherCodeImage
              code={weatherCode}
              className="mb-[1rem] mx-auto w-[3.125rem]"
            />
          ) : (
            <></>
          )}

          <div className="flex justify-between items-center">
            {maximum !== undefined && day !== undefined && (
              <p
                data-testid="dailyForecastItem.maximumTemperature"
                title={`The maximum temperature on ${getDayName(
                  day
                )} is ${Math.round(maximum)}°${tempSuffix}.`}
              >
                {Math.round(maximum)}°
              </p>
            )}
            {minimum !== undefined && day !== undefined && (
              <p
                data-testid="dailyForecastItem.minimumTemperature"
                title={`The minimum temperature on ${getDayName(
                  day
                )} is ${Math.round(minimum)}°${tempSuffix}.`}
              >
                {Math.round(minimum)}°
              </p>
            )}
          </div>
        </li>
      )}
      {isLoading && (
        <li
          data-testid="dailyForecastItem.isLoadingState"
          className="list-none px-[0.75rem] py-[1.5rem] bg-neutral-2 rounded-[0.625rem] border-[2px] border-dark-blue min-w-[5.563rem] h-[10.313rem] xl:h-[10.25rem] xl:py-[1rem] xl:px-[0.625rem]"
        ></li>
      )}
    </>
  );
};

export default DailyForecastItem;
