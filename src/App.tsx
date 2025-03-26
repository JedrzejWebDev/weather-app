import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useId } from "react";

const API_KEY = "3d03ab1ba6c98940ffe87819f69f9fed";

const fetchWeather = async (city: string) => {
  // if (!city) return null;

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pl`;

  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Błąd: ${response.status}`);
  }

  const data = await response.json();

  return {
    temp: Math.round(data.main.temp),
    sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString("pl-PL"),
    sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString("pl-PL"),
    pressure: data.main.pressure,
    wind: data.wind.speed,
  };
};

const App = () => {
  const inputId = useId();
  const [city, setCity] = useState("");

  const {
    data: weather,
    isError,
    error,
  } = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
    enabled: Boolean(city),
    retry: false,
  });

  const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  return (
    <>
      <label htmlFor={inputId}>Nazwa miasta:</label>
      <input
        id={inputId}
        type="text"
        value={city}
        onChange={handleChangeCity}
      />

      {isError && <p style={{color: "red"}}>{error.message}</p>}

      {weather && (
        <div>
          <p>Temperatura: {weather.temp}°C</p>
          <p>Wschód słońca: {weather.sunrise}</p>
          <p>Zachód słońca: {weather.sunset}</p>
          <p>Ciśnienie atmosferyczne: {weather.pressure} hPa</p>
          <p>Prędkość wiatru: {weather.wind} m/s</p>
        </div>
      )}
    </>
  );
};

export default App;
