interface WeatherProps {
    temp: number;
    sunrise: string;
    sunset: string;
    pressure: number;
    wind: number;
  }
  
  const WeatherDisplay = ({ temp, sunrise, sunset, pressure, wind }: WeatherProps) => {
    return (
      <div>
        <p>Temperatura: {temp}°C</p>
        <p>Wschód słońca: {sunrise}</p>
        <p>Zachód słońca: {sunset}</p>
        <p>Ciśnienie atmosferyczne: {pressure} hPa</p>
        <p>Prędkość wiatru: {wind} m/s</p>
      </div>
    );
  };
  
  export default WeatherDisplay;
  