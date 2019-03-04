import axios, { AxiosRequestConfig } from 'axios';
import { action, autorun, flow, observable, runInAction, when } from 'mobx';
import { useObservable } from 'mobx-react-lite';
import { parse } from 'query-string';
import ProjectsStore from './projects';
import SelectedProjectStore from './selectedProject';

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

export function conditionalAction<T extends any[]>(
  predicate: () => boolean,
  reaction: (...args: T) => void,
) {
  const functor = function(this: { cancel?: () => void }) {
    if (this.cancel) {
      this.cancel();
    }
    const f = flow(function*(...args: T) {
      yield when(predicate);
      runInAction(() => reaction.apply(null, args));
    });
    return (...args: T) => {
      const r = f.apply(this, args);
      this.cancel = r.cancel;
    };
  };
  return functor.call({});
}

export class Store {
  @observable
  errors: Error[] = [];
  @observable
  token?: string = undefined;

  projectsStore = new ProjectsStore(this);
  selectedProjectStore = new SelectedProjectStore(this);

  authenticate = action(() => {
    const currentHash = window.location && window.location.hash;
    const hashParams = parse(currentHash);
    if ('access_token' in hashParams && typeof hashParams.access_token === 'string') {
      this.token = hashParams.access_token;
      return;
    }
    this.errors.push(new Error('Cannot parse access token'));
  });
}

const store = new Store();

export default store;

export const useStore = () => {
  return useObservable(store);
};
export const useProjectStore = () => {
  const { projectsStore } = useObservable(store);
  return projectsStore;
};
export const useSelectedProjectStore = () => {
  const { selectedProjectStore } = useObservable(store);
  return selectedProjectStore;
}
export const useIsAuthenticated = () => {
  const { token } = useStore();
  return !!token;
};
