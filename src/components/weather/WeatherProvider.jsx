import React, { createContext, useState } from 'react'


export const weatherContext = createContext()
const WeatherProvider = ({children}) => {
  const [loading,setLoading] = useState(false)
  const [weatherData,setWeather] = useState(null)
  // const [unit, setUnit] = useState("metric");
  async function fetchWeatherData(param,unit) {
    setLoading(true);
    try {
      if(!param){
        return "Please enter a city name"
      }
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&units=${unit}&appid=e34b4c51d8c2b7bf48d5217fe52ff79e`
      );
      
      const data = await response.json();
      if (data && data?.cod !== "400" ) {
        setWeather(data);
        setLoading(false);
        console.log(data);
        
      }
      
    } catch (e) {
      setLoading(false);
    }
  }
  // const toggleUnit = () => {
  //   setUnit(unit === "metric" ? "imperial" : "metric");
  // };
  return (
    <weatherContext.Provider value={{ weatherData, fetchWeatherData , loading }} >
        {children}
    </weatherContext.Provider>
  )
}

export default WeatherProvider
