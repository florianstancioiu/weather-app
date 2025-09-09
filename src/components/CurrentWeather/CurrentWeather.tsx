import IconSunny from "../../images/icon-sunny.webp";
import CurrentWeatherDetail from "../CurrentWeatherDetail/CurrentWeatherDetail";

const CurrentWeather = () => {
  return (
    <main>
      <div className="mb-[1.25rem]">
        <div className="bg-[url('/images/bg-today-small.svg')] bg-cover bg-center rounded-[15px]">
          <div className="text-center pt-[3.375rem] mb-[2.75rem]">
            <h2 className="mb-[1.5rem] font-bold text-[1.5rem]">
              Berlin, Germany
            </h2>
            <p className="text-grayish-white">Tuesday, Aug 5, 2025</p>
          </div>
          <div className="flex justify-center items-center px-[1.25rem] pb-[4.25rem]">
            <img src={IconSunny} alt="" className="w-[6rem] h-[6rem]" />
            <p className="text-[4.25rem] italic">20°</p>
          </div>
        </div>
      </div>
      <div className="grid gap-[1rem] grid-cols-2">
        <CurrentWeatherDetail title="Feels Like" value="18°" />
        <CurrentWeatherDetail title="Humidity" value="46%" />
        <CurrentWeatherDetail title="Wind" value="14 km/h" />
        <CurrentWeatherDetail title="Precipitation" value="0 mm" />
      </div>
    </main>
  );
};

export default CurrentWeather;
