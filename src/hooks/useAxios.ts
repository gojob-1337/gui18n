import axios, { AxiosRequestConfig } from 'axios';
import { DependencyList, useEffect, useRef, useState } from 'react';

/**
 * Use this hook to perform request using axios
 *
 * @param configCreator: a function that return the axios config or null
 * @param deps: dependencies of the main useEffect that use axios
 * @param defaultValue: default data that is returned before the request response
 *
 * @example
 * const { data, loading, error } = useAxios(
 *   () => ({ url: '/your/url/here', method: 'POST', params: { type: 'myType' } }),
 *   []
 * );
 */
const useAxios = <T extends any = any>(
  configCreator: () => AxiosRequestConfig | null,
  deps: DependencyList,
  defaultValue?: T,
) => {
  // the data we will fetch
  const [data, setData] = useState<T | undefined>(defaultValue);
  // will be true while we fetch
  const [loading, setLoading] = useState(false);
  // errors from the axios
  const [error, setError] = useState(undefined);
  const cancelTokenRef = useRef(axios.CancelToken.source());

  const cleanUp = () => {
    // reset all state and the cancel token
    // setLoading(false);
    setError(undefined);
    if (cancelTokenRef.current) {
      cancelTokenRef.current.cancel();
    }
    cancelTokenRef.current = axios.CancelToken.source();
  };

  useEffect(() => {
    const config = configCreator();
    if (!config) {
      return cleanUp;
    }
    setLoading(true);
    axios({ ...config, cancelToken: cancelTokenRef.current.token })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((e) => {
        if (!axios.isCancel(e)) {
          setLoading(false);
          setError(e);
        }
      });

    return cleanUp;
  }, deps);

  return { data, loading, error };
};

export default useAxios;
