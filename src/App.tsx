import Header from "./components/Header/Header";
import SearchPlaces from "./components/SearchPlaces/SearchPlaces";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";

const App = () => {
  return (
    <>
      <Header />
      <SearchPlaces />
      <div>
        <CurrentWeather />
        <DailyForecast />
      </div>
      <HourlyForecast />
    </>
  );
};

export default App;
