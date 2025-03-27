const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchWeather = async (city: string) => {
  if (!city) return null;

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
