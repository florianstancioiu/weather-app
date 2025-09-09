export type HourlyForecastItem = {
  hour: string;
  temperature: string;
  image: string;
};

const HourlyForecastItem = ({
  hour,
  temperature,
  image,
}: HourlyForecastItem) => {
  return (
    <div className="bg-background-3 rounded-[5px] flex justify-between items-center h-[3.75rem] px-[1.125rem] border-[1px] border-light-blue">
      <div className="flex items-center gap-[1rem]">
        <img src={image} alt="" className="w-[40px]" />
        <p>{hour}</p>
      </div>
      <p>{temperature}</p>
    </div>
  );
};

export default HourlyForecastItem;
