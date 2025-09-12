import DailyForecastItem from "../DailyForecastItem/DailyForecastItem";

import IconRain from "../../images/icon-rain.webp";
import IconDrizzle from "../../images/icon-drizzle.webp";
import IconFog from "../../images/icon-fog.webp";
import IconStorm from "../../images/icon-storm.webp";
import IconOvercast from "../../images/icon-overcast.webp";
import IconSunny from "../../images/icon-sunny.webp";
import IconSnow from "../../images/icon-snow.webp";

export type DailyForecast = {
  isLoading: boolean;
};

const DailyForecast = ({ isLoading }: DailyForecast) => {
  return (
    <div>
      <h3 className="mb-[1.5rem]">Daily forecast</h3>
      <div className="grid grid-cols-3 gap-[1rem] dsktp:grid-cols-7">
        <DailyForecastItem
          day="Tue"
          maximum="20°"
          minimum="14°"
          image={IconRain}
          isLoading={isLoading}
        />
        <DailyForecastItem
          day="Wed"
          maximum="20°"
          minimum="14°"
          image={IconDrizzle}
          isLoading={isLoading}
        />
        <DailyForecastItem
          day="Thu"
          maximum="20°"
          minimum="14°"
          image={IconFog}
          isLoading={isLoading}
        />
        <DailyForecastItem
          day="Fri"
          maximum="20°"
          minimum="14°"
          image={IconStorm}
          isLoading={isLoading}
        />
        <DailyForecastItem
          day="Sat"
          maximum="20°"
          minimum="14°"
          image={IconOvercast}
          isLoading={isLoading}
        />
        <DailyForecastItem
          day="Sun"
          maximum="20°"
          minimum="14°"
          image={IconSunny}
          isLoading={isLoading}
        />
        <DailyForecastItem
          day="Mon"
          maximum="20°"
          minimum="14°"
          image={IconSnow}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default DailyForecast;
