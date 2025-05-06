import { useEffect, useState } from 'react'
import axios from 'axios'

const CountryDetail = ({country}) => {
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_WEATHER_KEY

  useEffect(() => {
    if (!country || !api_key) return;

    const capital = country.capital?.[0];
    if (!capital) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`

    axios.get(url)
      .then(res => setWeather(res.data))
      .catch(err => {
        console.error('Error fetching weather:', err);
        setWeather(null);
      });
  }, [country, api_key]);

  return (
    <div>
      <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km² </p>
      <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      {weather && (
        <div>
          <h3>Weather in {country.capital}</h3>
          <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default CountryDetail
