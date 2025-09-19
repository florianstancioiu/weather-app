import { useState, useEffect, useRef } from "react";
import DaysDropdown from "../DaysDropdown/DaysDropdown";
import HourlyForecastItem from "../HourlyForecastItem/HourlyForecastItem";
import { type DayDropdownValue, type Day } from "../DaysDropdown/DaysDropdown";

import {
  getDaysFromHourly,
  getDayName,
  getActiveFormattedHoursFromHourly,
} from "../../utils/date";

export type ForecastHourlyData = {
  temperature_2m: Float32Array<ArrayBufferLike> | null;
  weather_code: Float32Array<ArrayBufferLike> | null;
  time: Date[];
};

export type HourlyForecast = {
  data?: ForecastHourlyData;
  isLoading: boolean;
};

const HourlyForecast = ({ data, isLoading }: HourlyForecast) => {
  const hourlyItemsRef = useRef<HTMLUListElement>(null);
  const [days, setDays] =
    useState<{ id: number; title: Day; isActive: boolean }[]>();
  const [hours, setHours] = useState<{ index: number; hour: Date }[]>();

  useEffect(() => {
    // get the correct days in the correct order from the data object
    const numericDays = getDaysFromHourly(data?.time);

    // create the days values in the form of DayDropdownValue type
    const actualDays = numericDays.map((day, index) => {
      return {
        id: day,
        title: getDayName(day) as Day,
        isActive: index === 0 ? true : false,
      };
    });

    setDays(actualDays);
    setHours(getActiveFormattedHoursFromHourly(numericDays[0], data));
  }, [data]);

  const onDaysDropdownChangeHandler = (value: DayDropdownValue) => {
    const newDays = days!
      .map((day) => ({
        ...day,
        isActive: false,
      }))
      .map((day) => ({ ...day, isActive: day.id === value.id }));

    setHours(getActiveFormattedHoursFromHourly(value.id, data));
    setDays(newDays);

    if (hourlyItemsRef.current) {
      hourlyItemsRef.current.scrollTop = 0;
    }
  };

  return (
    <aside className="mt-[2rem] py-[1.25rem] px-[1rem] bg-neutral-2 rounded-[0.625rem] xl:mt-0 xl:h-[43.25rem]">
      <div className="flex justify-between items-center mb-[1.5rem]">
        <h3 className="text-white mr-2">Hourly forecast</h3>
        <DaysDropdown days={days} onChange={onDaysDropdownChangeHandler} />
      </div>
      <ul
        ref={hourlyItemsRef}
        className="max-h-[37.125rem] overflow-y-scroll grid gap-[1rem] grid-cols-1 list-none"
        aria-label="Hourly forecast items."
      >
        {hours !== undefined &&
          hours.map((hour) => {
            const index = hour.index;
            const actualHour = hour.hour.toLocaleString("en-US", {
              hour: "numeric",
              hour12: true,
            });
            const temperature = data?.temperature_2m![index];
            const weatherCode = data?.weather_code![index];

            return (
              <HourlyForecastItem
                key={index}
                hour={actualHour}
                temperature={Math.round(temperature!)}
                weatherCode={weatherCode}
                isLoading={isLoading}
              />
            );
          })}
        {((hours !== undefined && hours.length === 0) || isLoading === true) &&
          [...Array(24).keys()].map((_dummy, index) => {
            return <HourlyForecastItem key={index} isLoading={true} />;
          })}
      </ul>
    </aside>
  );
};

export default HourlyForecast;
