export type DailyForecastItem = {
  day: string;
  image: string;
  maximum: string;
  minimum: string;
};

const DailyForecastItem = ({
  day,
  image,
  maximum,
  minimum,
}: DailyForecastItem) => {
  return (
    <div className="px-[0.75rem] py-[1.5rem] bg-background-2 rounded-[0.625rem] border-[2px] border-dark-blue">
      <p className="mb-[2.125rem] text-center">{day}</p>
      <img src={image} alt="" className="mb-[2.125rem] mx-auto w-[3.125rem]" />
      <div className="flex justify-between items-center">
        <p>{maximum}</p>
        <p>{minimum}</p>
      </div>
    </div>
  );
};

export default DailyForecastItem;
