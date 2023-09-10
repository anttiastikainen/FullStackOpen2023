import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const apiKey = '60eff2ce3c9a67f69a10db462d251cca'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setWeatherData(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error)
        setLoading(false)
      });
  }, [capital]);

  if (loading) {
    return <div>Loading weather data...</div>
  }

  if (!weatherData) {
      return <div>Error fetching weather data </div>
  }

  const temperature = weatherData.main.temp;
  const description = weatherData.weather[0].description;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {temperature}°C</p>
      <p>Description: {description}</p>
    </div>
  );
};

export default Weather;

