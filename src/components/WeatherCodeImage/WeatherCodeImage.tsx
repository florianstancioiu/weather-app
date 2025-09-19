import IconSunny from "../../images/icon-sunny.webp";
import IconPartlyClody from "../../images/icon-partly-cloudy.webp";
import IconOvercast from "../../images/icon-overcast.webp";
import IconFog from "../../images/icon-fog.webp";
import IconDrizzle from "../../images/icon-drizzle.webp";
import IconRain from "../../images/icon-rain.webp";
import IconSnow from "../../images/icon-snow.webp";
import IconStorm from "../../images/icon-storm.webp";

export type WeatherCode = {
  code?: number;
  className?: string;
};

const WeatherCode = ({ code, className = "" }: WeatherCode) => {
  switch (code) {
    case 0:
      return (
        <img src={IconSunny} className={className} alt="Outside is sunny." />
      );
      break;
    case 1:
    case 2:
      return (
        <img
          src={IconPartlyClody}
          className={className}
          alt="Outside is partly cloudy."
        />
      );
      break;
    case 3:
      return (
        <img
          src={IconOvercast}
          className={className}
          alt="Outside is cloudy."
        />
      );
      break;
    case 45:
    case 48:
      return (
        <img src={IconFog} className={className} alt="Outside is foggy." />
      );
      break;
    case 51:
    case 53:
    case 55:
      return (
        <img
          src={IconDrizzle}
          className={className}
          alt="Outside is drizzling."
        />
      );
      break;
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return (
        <img src={IconRain} className={className} alt="Outside is raining." />
      );
      break;
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return (
        <img src={IconSnow} className={className} alt="Outside is snowing." />
      );
      break;
    case 95:
    case 96:
    case 99:
      return (
        <img src={IconStorm} className={className} alt="Outside is a storm." />
      );
      break;
    default:
      return (
        <img
          src={IconOvercast}
          className={className}
          alt="We don't know how the weather is outside."
        />
      );
  }
};

export default WeatherCode;
