import DaysDropdown from "../DaysDropdown/DaysDropdown";
import HourlyForecastItem from "../HourlyForecastItem/HourlyForecastItem";

import IconRain from "../../images/icon-rain.webp";
import IconDrizzle from "../../images/icon-drizzle.webp";
import IconFog from "../../images/icon-fog.webp";
import IconStorm from "../../images/icon-storm.webp";
import IconOvercast from "../../images/icon-overcast.webp";
import IconSunny from "../../images/icon-sunny.webp";
import IconSnow from "../../images/icon-snow.webp";

const HourlyForecast = () => {
  return (
    <aside className="mt-[2rem] py-[1.25rem] px-[1rem] bg-background-2 rounded-[0.625rem]">
      <div className="flex justify-between items-center mb-[1.5rem]">
        <h3>Hourly forecast</h3>
        <DaysDropdown />
      </div>
      <div className="max-h-[37rem] overflow-y-scroll grid gap-[1rem] grid-cols-1">
        <HourlyForecastItem hour="3 PM" temperature="20°" image={IconRain} />
        <HourlyForecastItem hour="4 PM" temperature="20°" image={IconDrizzle} />
        <HourlyForecastItem hour="5 PM" temperature="20°" image={IconFog} />
        <HourlyForecastItem hour="6 PM" temperature="20°" image={IconStorm} />
        <HourlyForecastItem
          hour="7 PM"
          temperature="20°"
          image={IconOvercast}
        />
        <HourlyForecastItem hour="8 PM" temperature="20°" image={IconSunny} />
        <HourlyForecastItem hour="9 PM" temperature="20°" image={IconSnow} />
        <HourlyForecastItem hour="10 PM" temperature="20°" image={IconRain} />
        <HourlyForecastItem hour="11 PM" temperature="20°" image={IconRain} />
        <HourlyForecastItem hour="12 PM" temperature="20°" image={IconRain} />
        <HourlyForecastItem hour="1 AM" temperature="20°" image={IconRain} />
        <HourlyForecastItem hour="2 AM" temperature="20°" image={IconRain} />
        <HourlyForecastItem hour="3 AM" temperature="20°" image={IconRain} />
        <HourlyForecastItem hour="4 AM" temperature="20°" image={IconRain} />
      </div>
    </aside>
  );
};

export default HourlyForecast;
