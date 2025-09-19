import DailyForecastItem from "../DailyForecastItem/DailyForecastItem";

export type ForecastDailyData = {
  temperature_2m_max: Float32Array<ArrayBufferLike> | null;
  temperature_2m_min: Float32Array<ArrayBufferLike> | null;
  weather_code: Float32Array<ArrayBufferLike> | null;
  time: Date[];
};

export type DailyForecast = {
  data?: ForecastDailyData;
  isMetric: boolean;
  isLoading: boolean;
};

const DailyForecast = ({ data, isMetric, isLoading }: DailyForecast) => {
  return (
    <section>
      <h3 className="mb-[1.5rem] text-white">Daily forecast</h3>
      <ul className="grid grid-cols-3 gap-[1rem] md:grid-cols-7 list-none">
        {data !== undefined &&
          data.time.map((time, index) => {
            const maximum = data.temperature_2m_max![index];
            const minimum = data.temperature_2m_min![index];
            const weatherCode = data.weather_code![index];

            return (
              <DailyForecastItem
                key={index}
                day={time.getDay()}
                maximum={maximum}
                minimum={minimum}
                weatherCode={weatherCode}
                isMetric={isMetric}
                isLoading={isLoading}
              />
            );
          })}
        {data === undefined &&
          [...Array(7).keys()].map((item) => (
            <DailyForecastItem
              key={item}
              isMetric={isMetric}
              isLoading={isLoading}
            />
          ))}
      </ul>
    </section>
  );
};

export default DailyForecast;
