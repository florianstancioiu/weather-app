export type DailyForecastItem = {
  day: string;
  image: string;
  maximum: string;
  minimum: string;
  isLoading: boolean;
};

const DailyForecastItem = ({
  day,
  image,
  maximum,
  minimum,
  isLoading,
}: DailyForecastItem) => {
  return (
    <>
      {!isLoading && (
        <div className="px-[0.75rem] py-[1.5rem] bg-background-2 rounded-[0.625rem] border-[2px] border-dark-blue dsktp:h-[10.25rem] dsktp:py-[1rem] dsktp:px-[0.625rem]">
          <p className="mb-[2.125rem] text-center dsktp:mb-[1rem] dsktp:leading-[120%]">
            {day}
          </p>
          <img
            src={image}
            alt=""
            className="mb-[2.125rem] mx-auto w-[3.125rem] dsktp:mb-[1rem]"
          />
          <div className="flex justify-between items-center">
            <p>{maximum}</p>
            <p>{minimum}</p>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="px-[0.75rem] py-[1.5rem] bg-background-2 rounded-[0.625rem] border-[2px] border-dark-blue h-[10.313rem] dsktp:h-[10.25rem] dsktp:py-[1rem] dsktp:px-[0.625rem]"></div>
      )}
    </>
  );
};

export default DailyForecastItem;
