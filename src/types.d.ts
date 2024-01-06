type TCurrentWeather = {
  cloud: number
  feelslike_c: number
  gust_kph: number
  humidity: number
  pressure_in: number
  temp_c: number
  wind_dir: string
  wind_kph: number
}

type TLocationWeather = {
  country: string
  localtime: string
  name: string
}

type TWeatherProps = {
  current: TCurrentWeather
  location: TLocationWeather
}