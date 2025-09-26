import { type ForecastHourlyData } from "../components/HourlyForecast/HourlyForecast";

export const getDayName = (day: number) => {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ][day];
};
export const getDayShortName = (day: number) => {
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][day];
};

export const getMonthShortName = (month: number) => {
  return [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][month];
};

export const getDaysFromHourly = (hourlyTime?: Date[]) => {
  if (hourlyTime === undefined) {
    return [];
  }

  const daysInOrderDuplicated = hourlyTime.map((time) => time.getDay());

  return [...new Set(daysInOrderDuplicated)];
};

export const getActiveFormattedHoursFromHourly = (
  activeDay: number,
  hourly?: ForecastHourlyData
) => {
  if (hourly === undefined) {
    return [];
  }

  return hourly.time
    .map((hour, index) => {
      return {
        hour: hour,
        index: index,
      };
    })
    .filter((hour) => hour.hour.getDay() === activeDay)
    .sort((a, b) => a.hour.getHours() - b.hour.getHours());
};
