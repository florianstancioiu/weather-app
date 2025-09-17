import { VariablesWithTime } from "@openmeteo/sdk/variables-with-time";

export default (
  current: VariablesWithTime,
  utcOffsetSeconds: number,
  hourly: VariablesWithTime,
  daily: VariablesWithTime
) => {
  return {
    current: {
      time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
      temperature_2m: current.variables(0)!.value(),
      weather_code: current.variables(1)!.value(),
      precipitation: current.variables(2)!.value(),
      wind_speed_10m: current.variables(3)!.value(),
      relative_humidity_2m: current.variables(4)!.value(),
      apparent_temperature: current.variables(5)!.value(),
    },
    hourly: {
      time: [
        ...Array(
          (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval()
        ),
      ].map(
        (_, i) =>
          new Date(
            (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
              1000
          )
      ),
      temperature_2m: hourly.variables(0)!.valuesArray(),
      weather_code: hourly.variables(1)!.valuesArray(),
    },
    daily: {
      time: [
        ...Array(
          (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval()
        ),
      ].map(
        (_, i) =>
          new Date(
            (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
              1000
          )
      ),
      weather_code: daily.variables(0)!.valuesArray(),
      temperature_2m_max: daily.variables(1)!.valuesArray(),
      temperature_2m_min: daily.variables(2)!.valuesArray(),
    },
  };
};
