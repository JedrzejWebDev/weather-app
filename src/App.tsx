import { useId, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "./api/weather";
import WeatherDisplay from "./components/WeatherDisplay";
import CityInput from "./components/CityInput";

const App = () => {
  const inputId = useId();
  const [city, setCity] = useState("");

  const {
    data: weather,
    isError,
    error,
  } = useQuery({
    queryKey: ["weather", city.trim().toLowerCase()],
    queryFn: () => fetchWeather(city.trim().toLowerCase()),
    enabled: Boolean(city),
    retry: false,
  });

  const handleChangeCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  return (
    <>
      <CityInput id={inputId} value={city} onChange={handleChangeCity} />

      {isError && <p style={{ color: "red" }}>{error.message}</p>}

      {weather && <WeatherDisplay {...weather} />}
    </>
  );
};

export default App;
