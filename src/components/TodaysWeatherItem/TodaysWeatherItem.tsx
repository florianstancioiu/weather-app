export type TodaysWeatherItem = {
  title: string;
  value: string;
  isLoading: boolean;
};

const TodaysWeatherItem = ({ title, value, isLoading }: TodaysWeatherItem) => {
  return (
    <>
      {!isLoading && (
        <div className="p-[1.625rem] bg-background-2 rounded-[0.625rem] border-[2px] border-dark-blue dsktp:h-[7.5rem] dsktp:p-[1.25rem]">
          <p className="text-grayish-white font-medium mb-[1.875rem] dsktp:mb-[1.5rem] text-[1.125rem] leading-[120%]">
            {title}
          </p>
          <p className="font-light text-[2rem] leading-none">{value}</p>
        </div>
      )}

      {isLoading && (
        <div className="p-[1.625rem] bg-background-2 rounded-[0.625rem] border-[2px] border-dark-blue h-[7.375rem] dsktp:h-[7.5rem] dsktp:p-[1.25rem]"></div>
      )}
    </>
  );
};

export default TodaysWeatherItem;
