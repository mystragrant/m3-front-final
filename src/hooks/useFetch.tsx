import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url: string, headers?: any) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(false);
    const source = axios.CancelToken.source();
    axios
      .get(url, { cancelToken: source.token, headers: headers })
      .then((res) => {
        setLoading(false);
        res.data && setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
    return () => {
      source.cancel();
    };
  }, [url]);

  return { data, isLoading, error };
}

export default useFetch;
