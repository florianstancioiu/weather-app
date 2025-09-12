import { useState } from "react";
import DaysDropdown from "../DaysDropdown/DaysDropdown";
import HourlyForecastItem from "../HourlyForecastItem/HourlyForecastItem";
import { type DayDropdownValue } from "../DaysDropdown/DaysDropdown";

import IconRain from "../../images/icon-rain.webp";
import IconDrizzle from "../../images/icon-drizzle.webp";
import IconFog from "../../images/icon-fog.webp";
import IconStorm from "../../images/icon-storm.webp";
import IconOvercast from "../../images/icon-overcast.webp";
import IconSunny from "../../images/icon-sunny.webp";
import IconSnow from "../../images/icon-snow.webp";

export type HourlyForecast = {
  isLoading: boolean;
};

const HourlyForecast = ({ isLoading }: HourlyForecast) => {
  const [days, setDays] = useState<DayDropdownValue[]>([
    {
      id: 1,
      title: "Monday",
      isActive: true,
    },
    {
      id: 2,
      title: "Tuesday",
      isActive: false,
    },
    {
      id: 3,
      title: "Wednesday",
      isActive: false,
    },
    {
      id: 4,
      title: "Thursday",
      isActive: false,
    },
    {
      id: 5,
      title: "Friday",
      isActive: false,
    },
    {
      id: 6,
      title: "Saturday",
      isActive: false,
    },
    {
      id: 7,
      title: "Sunday",
      isActive: false,
    },
  ]);

  const onDaysDropdownChangeHandler = (value: DayDropdownValue) => {
    const newDays = days
      .map((day) => ({
        ...day,
        isActive: false,
      }))
      .map((day) => ({ ...day, isActive: day.id === value.id }));

    setDays(newDays);
  };

  return (
    <aside className="mt-[2rem] py-[1.25rem] px-[1rem] bg-background-2 rounded-[0.625rem] dsktp:mt-0 dsktp:h-[43.25rem]">
      <div className="flex justify-between items-center mb-[1.5rem]">
        <h3>Hourly forecast</h3>
        <DaysDropdown days={days} onChange={onDaysDropdownChangeHandler} />
      </div>
      <div className="max-h-[37.125rem] overflow-y-scroll grid gap-[1rem] grid-cols-1">
        <HourlyForecastItem
          hour="3 PM"
          temperature="20°"
          image={IconRain}
          isLoading={isLoading}
        />
        <HourlyForecastItem
          hour="4 PM"
          temperature="20°"
          image={IconDrizzle}
          isLoading={isLoading}
        />
        <HourlyForecastItem
          hour="5 PM"
          temperature="20°"
          image={IconFog}
          isLoading={isLoading}
        />
        <HourlyForecastItem
          hour="6 PM"
          temperature="20°"
          image={IconStorm}
          isLoading={isLoading}
        />
        <HourlyForecastItem
          hour="7 PM"
          temperature="20°"
          image={IconOvercast}
          isLoading={isLoading}
        />
        <HourlyForecastItem
          hour="8 PM"
          temperature="20°"
          image={IconSunny}
          isLoading={isLoading}
        />
        <HourlyForecastItem
          hour="9 PM"
          temperature="20°"
          image={IconSnow}
          isLoading={isLoading}
        />
        <HourlyForecastItem
          hour="10 PM"
          temperature="20°"
          image={IconRain}
          isLoading={isLoading}
        />
        <HourlyForecastItem
          hour="11 PM"
          temperature="20°"
          image={IconRain}
          isLoading={isLoading}
        />
        <HourlyForecastItem
          hour="12 PM"
          temperature="20°"
          image={IconRain}
          isLoading={isLoading}
        />
        <HourlyForecastItem
          hour="1 AM"
          temperature="20°"
          image={IconRain}
          isLoading={isLoading}
        />
        <HourlyForecastItem
          hour="2 AM"
          temperature="20°"
          image={IconRain}
          isLoading={isLoading}
        />
        <HourlyForecastItem
          hour="3 AM"
          temperature="20°"
          image={IconRain}
          isLoading={isLoading}
        />
        <HourlyForecastItem
          hour="4 AM"
          temperature="20°"
          image={IconRain}
          isLoading={isLoading}
        />
      </div>
    </aside>
  );
};

export default HourlyForecast;
