export type HourlyForecastItem = {
  hour: string;
  temperature: string;
  image: string;
  isLoading: boolean;
};

const HourlyForecastItem = ({
  hour,
  temperature,
  image,
  isLoading,
}: HourlyForecastItem) => {
  return (
    <>
      {!isLoading && (
        <div className="bg-background-3 rounded-[0.313rem] flex justify-between items-center h-[3.75rem] px-[1.125rem] border-[1px] border-light-blue dsktp:h-[3.75rem]">
          <div className="flex items-center gap-[1rem]">
            <img src={image} alt="" className="w-[2.5rem]" />
            <p>{hour}</p>
          </div>
          <p>{temperature}</p>
        </div>
      )}
      {isLoading && (
        <div className="bg-background-3 rounded-[0.313rem] flex justify-between items-center h-[3.75rem] px-[1.125rem] border-[1px] border-light-blue dsktp:h-[3.75rem]"></div>
      )}
    </>
  );
};

export default HourlyForecastItem;
