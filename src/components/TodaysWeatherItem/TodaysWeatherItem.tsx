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
  let valueSuffix = "";
  switch (title) {
    case "Feels Like":
      valueSuffix = "°";
      break;
    case "Humidity":
      valueSuffix = "%";
      break;
    case "Wind":
      valueSuffix = isMetric ? "km/h" : "mph";
      break;
    case "Precipitation":
      valueSuffix = isMetric ? "mm" : "in";
      break;
  }

  return (
    <>
      {!isLoading && (
        <li className="p-[1.625rem] bg-neutral-2 rounded-[0.625rem] border-[2px] border-dark-blue xl:h-[7.5rem] xl:p-[1.25rem] md:min-w-[10.5rem]">
          <p
            data-testid="todaysWeatherItem.title"
            className="text-grayish-white font-medium mb-[1.875rem] xl:mb-[1.5rem] text-[1.125rem] leading-[120%]"
          >
            {title}
          </p>
          <p
            data-testid="todaysWeatherItem.value"
            className="text-white font-light text-[2rem] leading-none"
          >
            {value !== undefined ? `${Math.round(value)}${valueSuffix}` : ""}
            {value === undefined ? "-" : ""}
          </p>
        </li>
      )}

      {isLoading && (
        <li
          data-testid="todaysWeatherItem.isLoadingState"
          className="p-[1.625rem] bg-neutral-2 rounded-[0.625rem] border-[2px] border-dark-blue h-[7.375rem] xl:h-[7.5rem] xl:p-[1.25rem] md:min-w-[10.5rem]"
        ></li>
      )}
    </>
  );
};

export default TodaysWeatherItem;
