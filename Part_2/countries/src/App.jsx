import { useEffect, useState } from 'react'
import H1p1t2 from "./Component/H1p1t2"
import FilterForm from './Component/FilterForm'
import countryService from './Services/country'
import H2li from './Component/H2li'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [country, setCountry]= useState(null)
  const [weather, setWeather] = useState({})
  

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response)
      })
  }, []) //the empty [] array says the effect is only for the first render.

const handleCountrySelection = (selectedCountryName) => {
  countryService
    .getCountry(selectedCountryName)
    .then(countryResponse => {
      setCountry(countryResponse); // update state
      const capitalCity = countryResponse.capital[0]; // get the capital directly

      return countryService.getWeather(capitalCity); // pass it into getWeather
    })
    .then(weatherResponse => {
      setWeather(weatherResponse); // store weather in state
    })
    .catch(error => {
      console.error('Failed to fetch country or weather details:', error);
      setCountry(null);
      setWeather({});
    });
};
  
  
  return (
    <div>
      <FilterForm description={'find countries'} list={countries} onSelected={handleCountrySelection}></FilterForm>

      {country != null && (
        <>
          <H1p1t2
            H1={country.name.common}
            p1={country.capital}
            p2={`Area ${country.area}`}
          />

          <H2li
            H2={"Language"}
            list={Object.values(country.languages)}
          />

          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
          />

          <h2>Weather in {country.capital}</h2>
          <p>Temperature {weather.current.temp_c} Celsius</p>
          <img
            src={weather.current.condition.icon}
            alt={`Flag of ${weather.current.text}`}
          />
          <p>Wind {weather.current.wind_kph} km/h {weather.current.wind_dir}</p>
          
        </>
      )}


    </div>
  )
}

export default App