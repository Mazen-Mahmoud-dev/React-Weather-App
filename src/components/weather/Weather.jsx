import { useContext, useState } from "react";
import Search from "../search/Search";
import { weatherContext } from "./WeatherProvider";

export default function Weather() {
  const { weatherData, fetchWeatherData,loading } = useContext(weatherContext);
  const [search, setSearch] = useState("");
  const [unit,setUnit] = useState("metric");
  // async function fetchWeatherData(param) {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?q=${param}&units=${unit}&appid=e34b4c51d8c2b7bf48d5217fe52ff79e`
  //     );
      
  //     const data = await response.json();
  //     if (data) {
  //       setWeatherData(data);
  //       setLoading(false);
  //     }
  //   } catch (e) {
  //     setLoading(false);
  //   }
  // }

  async function handleSearch(search,unit) {
    fetchWeatherData(search,unit);
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  const handleToggleUnit =  () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);

    handleSearch(search, newUnit); 

  };
  return (
    <div>
      <nav>
        <h2>Weather App</h2>
          <Search
            search={search}
            setSearch={setSearch}
            handleSearch={()=>handleSearch(search,unit)}
          />
      </nav>
      

      {weatherData ? loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div>
          <div className="weather-details">
            <div className="city-name">
              <h2>
                Location: {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
              </h2>
            </div>
            <div className="date">
              <span>{getCurrentDate()}</span>
            </div>
          </div>
          <div className="temp">{weatherData?.main?.temp}°{unit === "metric" ? "C" : "F"}</div>
          <p className="description">
            {weatherData && weatherData.weather && weatherData.weather[0]
              && weatherData.weather[0].description}
          </p>
          <div className="weather-info">
            <div className="column">
              <div>
                <p>Wind Speed</p>
                <p className="wind">{weatherData?.wind?.speed} Km/h</p>
                
              </div>
            </div>
            <div className="column">
              <div>
                <p>Humidity</p>
                <p className="humidity">{weatherData?.main?.humidity}%</p>
                
              </div>
            </div>
          </div>
          <button onClick={handleToggleUnit} className="toggle-unit-btn">Change unit</button>
        </div>
      ):""}
    </div>
  );
}
