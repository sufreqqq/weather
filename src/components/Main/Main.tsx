import { useState, ChangeEvent } from "react";
import useDebounce from "../../hooks/useDebounce";
import styles from "./Main.module.css";
import useRequest from "../../hooks/useRequest";
import { speedCalc, windDirectory } from "../../helpers/Calc";
import conditions from "../../helpers/Conditions";

const Main = () => {
  const [query, setQuery] = useState<string>("Domodedovo");
  const key: string = "727f696f90184545a77145743240501";
  const request = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${query}&lang=ru`;
  const requestDebounce = useDebounce(request, 1500);
  const [data, loading, error] = useRequest<TWeatherProps>(requestDebounce);

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const [gust, wind, pressure] = speedCalc(
    data?.current.gust_kph,
    data?.current.wind_kph,
    data?.current.pressure_mb
  );

  const weatherIcon = conditions(
    data?.current.condition.code,
    data?.current.is_day
  );

  const windDir = windDirectory(data?.current.wind_degree)

  return (
    <div className={styles.main}>
      <div>
          <div className={styles.weatherBlock}>
            <input onChange={inputOnChange} value={query} />
            {loading ? <p>Загрузка...</p> : <div>
              <div className={styles.weatherTemp}>
                <p>{data?.current.temp_c}°</p>
                <img src={"../assets/" + weatherIcon} />
              </div>
              <p className={styles.weatherFeelsLike}>
                Ощущается как {data?.current.feelslike_c}°
              </p>
              {error ? <p>Ошбика</p> : null}
              <p className={styles.weatherCondition}>{data?.current.condition.text}.</p>
              <div className={styles.weatherBar}>
                <img src="../assets/barometer.svg" width={24}/>
                <p>{pressure} мм рт. ст.</p>
              </div>
              <div className={styles.weatherHumidity}>
                <img src="../assets/humidity.svg" width={24}/>
                <p>{data?.current.humidity} %</p>
              </div>
              <div className={styles.weatherWindDir}>
                <img src="../assets/nav.svg" width={16} style={{rotate: `${data ? data?.current.wind_degree - 45 : 0}deg`, marginRight: 5 }}/>
                <p> {windDir} {wind} м/с</p>
              </div>
            </div>}


          {/* <div>
              <p>Current</p>
              <li>{data?.location.localtime}</li>
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
              
              <li>{data?.location.name}</li>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default Main;
