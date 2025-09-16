import useMeteoData from "./hooks/useMeteoData";

import Header from "./components/Header/Header";
import SearchCity from "./components/SearchCity/SearchCity";
import TodaysWeather from "./components/TodaysWeather/TodaysWeather";
import DailyForecast from "./components/DailyForecast/DailyForecast";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";
import NoSearchResults from "./components/NoSearchResults/NoSearchResults";
import SomethingWrong from "./components/SomethingWrong/SomethingWrong";

const App = () => {
  const {
    isLoading,
    isMetric,
    todaysPrimaryData,
    todaysSecondaryData,
    dailyData,
    hourlyData,
    noSearchResults,
    isError,
    setSearchKeyword,
    resetState,
  } = useMeteoData();

  const onSearchCityChangeHandler = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const onSearchCitySearchHandler = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const onSomethingWrongRetryHandler = () => {
    resetState();
  };

  return (
    <>
      <Header />
      {isError && <SomethingWrong onRetry={onSomethingWrongRetryHandler} />}
      {!isError && (
        <div>
          <SearchCity
            onChange={onSearchCityChangeHandler}
            onSearch={onSearchCitySearchHandler}
          />
          {noSearchResults && <NoSearchResults />}
          {!noSearchResults && (
            <div className="md:mx-auto md:w-[45rem] xl:w-[75.75rem] xl:grid xl:grid-cols-3 xl:items-start xl:gap-[2rem]">
              <div className="xl:col-span-2">
                <TodaysWeather
                  primaryData={todaysPrimaryData}
                  secondaryData={todaysSecondaryData}
                  isMetric={isMetric}
                  isLoading={isLoading}
                />
                <DailyForecast
                  data={dailyData}
                  isMetric={isMetric}
                  isLoading={isLoading}
                />
              </div>
              <HourlyForecast data={hourlyData} isLoading={isLoading} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default App;
