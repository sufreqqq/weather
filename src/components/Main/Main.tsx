import { useState, ChangeEvent } from "react";
import useDebounce from "../../hooks/useDebounce";
import styles from "./Main.module.css";
import useRequest from "../../hooks/useRequest";
import { speedCalc } from "../../helpers/Calc";

const Main = () => {
  const [query, setQuery] = useState<string>("Domodedovo");
  const key: string = "727f696f90184545a77145743240501";
  const request = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${query}&lang=ru`;
  const requestDebounce = useDebounce(request, 1500);
  const [data, loading, error] = useRequest<TWeatherProps>(requestDebounce);

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const [gust, wind] = speedCalc(
    data?.current.gust_kph,
    data?.current.wind_kph
  );

  return (
    <div className={styles.main}>
      <div>
        <input onChange={inputOnChange} value={query} />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.weather}>
            <div>
              <p>Current</p>
              <li>Temp: {data?.current.temp_c} C</li>
              <li>Cloud: {data?.current.cloud}%</li>
              <li>Feels Like: {data?.current.feelslike_c} C</li>
              <li>Gust: {gust} m/s</li>
              <li>Humidity: {data?.current.humidity} %</li>
              <li>Wind direction: {data?.current.wind_dir}</li>
              <li>Wind speed: {wind} m/s</li>
            </div>
            <div>
              <p>Location</p>
              <li>{data?.location.country}</li>
              <li>{data?.location.localtime}</li>
              <li>{data?.location.name}</li>
            </div>
          </div>
        )}
        {error ? <p>Ошбика</p> : null}
      </div>
    </div>
  );
};

export default Main;
