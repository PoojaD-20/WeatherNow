import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const apiKey = "6f18f0cdcbc26bd9eb7d7976075f5019";
  const apiKey="ce4977d41cda86757424b3aaa38c2b3f"; 

  const fetchWeather = async () => {
    if(!city.trim()){
      setError("City not found");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error("☹ City Not Found!!");
      }
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="text-center bg-primary vh-100">
      <h1 className="mb-4 p-4">⛅Weather App</h1>
      <div>
      <input
        className="p-2 border border-secondary rounded-2"
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className="btn btn-secondary text-black text-bold fs-5 m-2 p-2" onClick={fetchWeather}>Search</button>
      </div>
      {error && <div className="alert alert-danger w-50 mx-auto fs-5 text-bold">{error}</div>}
      {loading && <div className="spinner-border text-primary" role="status">{error}</div>}
      {weatherData && (
        <div className="card w-50 mt-4 mx-auto p-4 border border-secondary border-2 rounded-4 bg-info">
          <h2 className="card-title">🌏{weatherData.name}</h2>
          <p className="fs-4">🌡<strong>Temperature: {weatherData.main.temp}°C</strong></p>
          <p className="fs-4">🌡<strong>Feels Like: {weatherData.main.feels_like}°C</strong></p>
          <strong><p className="fs-4">💧Humidity: {weatherData.main.humidity}%</p></strong>
          <strong><p className="fs-4">Weather: {weatherData.weather[0].description.toUpperCase()}</p></strong>
          <strong><p className="fs-4">💨Wind Speed: {weatherData.wind.speed*3.6}km/h</p></strong>
        </div>
      )}
    </div>
    </>
  );
}

export default App;
