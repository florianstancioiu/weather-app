import Header from "./components/Header/Header";
import SearchPlaces from "./components/SearchPlaces/SearchPlaces";
import TodaysWeather from "./components/TodaysWeather/TodaysWeather";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";

const App = () => {
  return (
    <>
      <Header />
      <SearchPlaces />
      <div>
        <TodaysWeather />
        <DailyForecast />
      </div>
      <HourlyForecast />
    </>
  );
};

export default App;
