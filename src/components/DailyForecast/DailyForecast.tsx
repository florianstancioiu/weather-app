import DailyForecastItem from "../DailyForecastItem/DailyForecastItem";
import IconRain from "../../images/icon-rain.webp";
import IconDrizzle from "../../images/icon-drizzle.webp";
import IconFog from "../../images/icon-fog.webp";
import IconStorm from "../../images/icon-storm.webp";
import IconOvercast from "../../images/icon-overcast.webp";
import IconSunny from "../../images/icon-sunny.webp";
import IconSnow from "../../images/icon-snow.webp";

const DailyForecast = () => {
  return (
    <div>
      <h3 className="mb-[1.5rem]">Daily forecast</h3>
      <div className="grid grid-cols-3 gap-[1rem]">
        <DailyForecastItem
          day="Tue"
          maximum="20°"
          minimum="14°"
          image={IconRain}
        />
        <DailyForecastItem
          day="Wed"
          maximum="20°"
          minimum="14°"
          image={IconDrizzle}
        />
        <DailyForecastItem
          day="Thu"
          maximum="20°"
          minimum="14°"
          image={IconFog}
        />
        <DailyForecastItem
          day="Fri"
          maximum="20°"
          minimum="14°"
          image={IconStorm}
        />
        <DailyForecastItem
          day="Sat"
          maximum="20°"
          minimum="14°"
          image={IconOvercast}
        />
        <DailyForecastItem
          day="Sun"
          maximum="20°"
          minimum="14°"
          image={IconSunny}
        />
        <DailyForecastItem
          day="Mon"
          maximum="20°"
          minimum="14°"
          image={IconSnow}
        />
      </div>
    </div>
  );
};

export default DailyForecast;
