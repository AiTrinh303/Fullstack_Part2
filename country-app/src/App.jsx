import { useEffect, useState } from 'react'
import axios from 'axios'
import CountryDetail from './components/CountryDetail'

function App() {
  const [query, setQuery] = useState('')
  // const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    if(query === '') {
      setFilteredCountries([])
      return
    }
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        const matches = response.data.filter(country =>
          country.name.common.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredCountries(matches)
      })
      .catch(error => {
        console.error('Error fetching countries:', error)
      })
  }, [query])
  
  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  const handleShow = (country) => {
    setFilteredCountries([country])
  }

  return (
    <>
      <span>Find Countries</span>
      <input type="text" value={query} onChange={handleChange}/>
      <div>
        {filteredCountries.length > 10 && <p>Too many matches, specify another filter</p>}
        {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
          <ul>
            {filteredCountries.map(country => (
              <li key={country.name.common}>
               {country.name.common}{' '}
               <button onClick={() => handleShow(country)}>Show</button>
              </li>
            ))}
          </ul>
        )}
        {filteredCountries.length === 1 && (
          <CountryDetail country={filteredCountries[0]} />
        )}
        {filteredCountries.length === 0 && <p>No matches found</p>}
      </div>
    </>
  )
}

export default App
