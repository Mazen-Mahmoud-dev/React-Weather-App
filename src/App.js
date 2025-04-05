import './App.css';
import Weather from './components/weather/Weather.jsx';
import WeatherProvider from './components/weather/WeatherProvider.jsx';

function App() {
  return (
    <div className="App">
     <WeatherProvider>
      <Weather/>
     </WeatherProvider>
    </div>
  );
}

export default App;
