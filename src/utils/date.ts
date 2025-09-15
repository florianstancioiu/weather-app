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
