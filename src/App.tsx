import { useState } from "react";

import Header from "./components/Header/Header";
import SearchPlaces from "./components/SearchPlaces/SearchPlaces";
import TodaysWeather from "./components/TodaysWeather/TodaysWeather";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";

const App = () => {
  const [isLoading, _setIsLoading] = useState(true);

  return (
    <>
      <Header />
      <SearchPlaces />
      <div className="dsktp:w-[75.75rem] dsktp:mx-auto dsktp:grid dsktp:grid-cols-3 dsktp:items-start dsktp:gap-[2rem]">
        <div className="dsktp:col-span-2">
          <TodaysWeather isLoading={isLoading} />
          <DailyForecast isLoading={isLoading} />
        </div>
        <HourlyForecast isLoading={isLoading} />
      </div>
    </>
  );
};

export default App;
