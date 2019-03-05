import axios, { AxiosRequestConfig } from 'axios';
import { action, autorun, observable } from 'mobx';

type AxiosConfigCreator<T extends any[]> = (
  ...args: T
) => AxiosRequestConfig | undefined | null | false | 0;

type FetchableObservable<T, U extends any[] = any[]> = {
  load: AxiosConfigCreator<U>;
  data?: T;
  loading: boolean;
  error?: any;
};

export const remoteResource = <T, U extends any[] = any[]>(
  getAxiosConfiguration: AxiosConfigCreator<U>,
) => {
  const obs = observable<FetchableObservable<T, U>>({
    load: (...args: U) => {
      const requestConfig = getAxiosConfiguration.apply(null, args);
      if (requestConfig) {
        obs.loading = true;
        axios(requestConfig)
          .then(({ data }) => void fetchSuccess(data))
          .catch((e) => void fetchFailed(e));
      }
      return requestConfig;
    },
    data: undefined,
    loading: false,
    error: undefined,
  });
  const fetchSuccess = action((data: any) => {
    obs.data = data;
    obs.loading = false;
  });
  const fetchFailed = action((e: any) => {
    obs.loading = false;
    obs.error = e;
  });
  // Call first time
  autorun(() => void obs.load.apply(null, [] as any));
  return obs;
};

export default remoteResource;
