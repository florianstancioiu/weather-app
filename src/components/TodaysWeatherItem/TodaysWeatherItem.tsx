export type TodaysWeatherItem = {
  title: string;
  value: string;
};

const TodaysWeatherItem = ({ title, value }: TodaysWeatherItem) => {
  return (
    <div className="p-[1.625rem] bg-background-2 rounded-[0.625rem] border-[2px] border-dark-blue">
      <p className="text-grayish-white font-semibold mb-[1.875rem]">{title}</p>
      <p className="font-semibold text-2xl">{value}</p>
    </div>
  );
};

export default TodaysWeatherItem;
