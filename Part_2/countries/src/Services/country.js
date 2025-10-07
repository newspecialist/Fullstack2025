import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY // Key for weather data from env var
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherUrl = 'https://api.weatherapi.com/v1/current.json'


const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(responce => {
    const countryNames = responce.data.map(country => country.name.common);
    return countryNames
  })
}

const getCountry = (name) => {
  const request = axios.get(`${baseUrl}/name/${name}`)
  return request.then(response => response.data)
}

const getWeather = (city) => {
  const request =  axios.get(`${weatherUrl}?key=${api_key}&q=${city}&aqi=no`)
  return request.then(response => response.data)
}

export default { 
  getAll: getAll, 
  getCountry: getCountry,
  getWeather: getWeather
}