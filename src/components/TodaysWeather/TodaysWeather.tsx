import IconSunny from "../../images/icon-sunny.webp";
import TodaysWeatherItem from "../TodaysWeatherItem/TodaysWeatherItem";

export type TodaysWeather = {
  isLoading: boolean;
};

const TodaysWeather = ({ isLoading }: TodaysWeather) => {
  return (
    <main className="mb-[2.5rem] dsktp:mb-[3.25rem]">
      <div className="mb-[1.25rem]">
        {!isLoading && (
          <div className="bg-[url('/images/bg-today-small.svg')] bg-cover bg-center rounded-[1rem] dsktp:h-[17.875rem] dsktp:flex dsktp:justify-between dsktp:items-center dsktp:px-[1.625rem] dsktp:bg-[url('/images/bg-today-large.svg')]">
            <div className="text-center pt-[3.375rem] mb-[2.75rem] dsktp:pt-0 dsktp:mb-0 dsktp:text-left">
              <h2 className="mb-[1.5rem] font-bold text-[1.5rem] dsktp:text-[1.75rem] dsktp:leading-[120%]">
                Berlin, Germany
              </h2>
              <p className="text-grayish-white">Tuesday, Aug 5, 2025</p>
            </div>
            <div className="flex justify-center items-center px-[1.25rem] pb-[4.25rem] dsktp:pb-0">
              <img
                src={IconSunny}
                alt=""
                className="w-[6rem] h-[6rem] dsktp:w-[7.5rem] dsktp:h-[7.5rem]"
              />
              <p className="text-[4.25rem] italic dsktp:text-[6rem] dsktp:font-semibold">
                20°
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
      <div className="grid gap-[1rem] grid-cols-2 dsktp:grid-cols-4">
        <TodaysWeatherItem
          title="Feels Like"
          value="18°"
          isLoading={isLoading}
        />
        <TodaysWeatherItem title="Humidity" value="46%" isLoading={isLoading} />
        <TodaysWeatherItem title="Wind" value="14 km/h" isLoading={isLoading} />
        <TodaysWeatherItem
          title="Precipitation"
          value="0 mm"
          isLoading={isLoading}
        />
      </div>
    </main>
  );
};

export default TodaysWeather;
