export type TodaysWeatherItemTitle =
  | "Feels Like"
  | "Humidity"
  | "Wind"
  | "Precipitation";

export type TodaysWeatherItem = {
  title: TodaysWeatherItemTitle;
  value?: number;
  isMetric: boolean;
  isLoading: boolean;
};

const TodaysWeatherItem = ({
  title,
  value,
  isLoading,
  isMetric,
}: TodaysWeatherItem) => {
  let titleSuffix = "";
  switch (title) {
    case "Feels Like":
      titleSuffix = "°";
      break;
    case "Humidity":
      titleSuffix = "%";
      break;
    case "Wind":
      titleSuffix = isMetric ? "km/h" : "mph";
      break;
    case "Precipitation":
      titleSuffix = isMetric ? "mm" : "in";
      break;
  }

  return (
    <>
      {!isLoading && (
        <li className="p-[1.625rem] bg-neutral-2 rounded-[0.625rem] border-[2px] border-dark-blue xl:h-[7.5rem] xl:p-[1.25rem] md:min-w-[10.5rem]">
          <p className="text-grayish-white font-medium mb-[1.875rem] xl:mb-[1.5rem] text-[1.125rem] leading-[120%]">
            {title}
          </p>
          <p className="text-white font-light text-[2rem] leading-none">
            {value !== undefined ? `${Math.round(value)}${titleSuffix}` : ""}
            {value === undefined ? "-" : ""}
          </p>
        </li>
      )}

      {isLoading && (
        <li className="p-[1.625rem] bg-neutral-2 rounded-[0.625rem] border-[2px] border-dark-blue h-[7.375rem] xl:h-[7.5rem] xl:p-[1.25rem] md:min-w-[10.5rem]"></li>
      )}
    </>
  );
};

export default TodaysWeatherItem;
