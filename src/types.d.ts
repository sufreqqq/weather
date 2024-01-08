type TCurrentWeather = {
  cloud: number;
  feelslike_c: number;
  gust_kph: number;
  humidity: number;
  pressure_mb: number;
  temp_c: number;
  is_day: boolean;
  wind_degree: number;
  wind_kph: number;
  condition: TCurrentCondition;
};

type TLocationWeather = {
  country: string;
  localtime: string;
  name: string;
};

type TCurrentCondition = {
  text: string;
  icon: string;
  code: number;
};

type TWeatherProps = {
  current: TCurrentWeather;
  location: TLocationWeather;
};
