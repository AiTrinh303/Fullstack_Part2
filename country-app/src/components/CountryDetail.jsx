import React from 'react'

const CountryDetail = ({country}) => {
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
    </div>
  )
}

export default CountryDetail
