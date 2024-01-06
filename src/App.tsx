import {useState, ChangeEvent } from "react";
import useRequest from "./hooks/useRequest";
import useDebounce from "./hooks/useDebounce";

function App() {
  const [query, setQuery] = useState<string>("Domodedovo");
  const key = "727f696f90184545a77145743240501";
  const request = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${query}&lang=ru`
  const requestDebounce = useDebounce(request, 500)
  const [data, loading, error] = useRequest<TWeatherProps>(requestDebounce);

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <input onChange={inputOnChange} value={query} />
      {loading ? <p>Loading...</p> : <div>{data?.current.cloud}</div>}
      {error ? <p>Error...</p> : null}
    </>
  );
}

export default App;

// TODO:
/*
1. Debouncer +
2. Adaptive design
3. API key to .env
4. 
*/
