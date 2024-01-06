import { useState, useEffect } from "react";
import axios from "axios";

export default function<T>(requestUrl: string): [T?, boolean?, Error?] {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get<T>(requestUrl)
      .then((response) => setData(response.data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [requestUrl]);

  return [data, isLoading, error];
}