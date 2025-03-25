import { useEffect, useId, useState, useTransition } from "react";

const API_KEY = "3d03ab1ba6c98940ffe87819f69f9fed";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<{
    temp: number;
    sunrise: string;
    sunset: string;
    pressure: number;
    wind: number;
  } | null>(null);
  const [isPending, startTransition] = useTransition();
  const inputId = useId();

  useEffect(() => {
    if (!city) return;

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pl`;

    const fetchWeather = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Błąd: ${response.status}`);
        }
        const data = await response.json();

        const convertTime = (timestamp: number) =>
          new Date(timestamp * 1000).toLocaleTimeString("pl-PL", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

        startTransition(() => {
          setWeather({
            temp: data.main.temp,
            sunrise: convertTime(data.sys.sunrise),
            sunset: convertTime(data.sys.sunset),
            pressure: data.main.pressure,
            wind: data.wind.speed,
          });
        });
      } catch (err) {
        console.error("Błąd pobierania danych:", err);
      }
    };
    fetchWeather();
  }, [city]);

  const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setCity(e.target.value);
    });
  };

  return (
    <>
      <label htmlFor={inputId}>City name:</label>
      <input
        id={inputId}
        type="text"
        value={city}
        onChange={handleChangeCity}
      />

      {isPending && <p>Ładowanie danych...</p>}

      {weather && !isPending && (
        <div>
          <p>Temperatura: {Math.round(weather?.temp)}°C</p>
          <p>Wschód słońca: {weather?.sunrise}</p>
          <p>Zachód słońca: {weather?.sunset}</p>
          <p>Ciśnienie atmosferyczne: {weather?.pressure} hPa</p>
          <p>Prędkość wiatru: {weather?.wind} m/s</p>
        </div>
      )}
    </>
  );
};

export default App;
