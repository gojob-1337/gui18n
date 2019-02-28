import axios, { AxiosRequestConfig } from 'axios';
import { Project, RepositoryFile } from 'gitlab';
import { action, autorun, observable, toJS } from 'mobx';
import { useObservable } from 'mobx-react-lite';
import { parse } from 'query-string';
import Files from '../pages/Projects/Files';

type AxiosConfigCreator<T extends any[]> = (...args: T) => AxiosRequestConfig | undefined | null | false | 0;

type FetchableObservable<T, U extends any[] = any[]> = {
  load: AxiosConfigCreator<U>;
  data?: T;
  loading: boolean;
  error?: any;
};

const remote = <T, U extends any[] = any[]>(getAxiosConfiguration: AxiosConfigCreator<U>) => {
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

class Store {
  @observable
  errors: Error[] = [];

  @observable
  token?: string;

  projects = remote<Project[]>(() => {
    if (!this.token) {
      return null;
    }
    return {
      url: 'https://gitlab.com/api/v4/projects',
      headers: { Authorization: `Bearer ${this.token}` },
      params: { membership: true },
    };
  });

  selectedProjectFiles = remote<RepositoryFile[]>(() => {
    if (!this.token || !this.selectedProject) {
      return null;
    }
    return {
      url: `https://gitlab.com/api/v4/projects/${this.selectedProject.id}/repository/tree`,
      headers: { Authorization: `Bearer ${this.token}` },
    };
  });

  @observable
  selectedProject?: Project | null;

  @action.bound
  selectProject(projectId: string | number | null) {
    const { data = [] } = this.projects;
    this.selectedProject = data.find((project) => project.id === parseInt(projectId as string, 10));
  }

  @action.bound
  authenticate() {
    const currentHash = window.location && window.location.hash;
    const hashParams = parse(currentHash);
    if ('access_token' in hashParams && typeof hashParams.access_token === 'string') {
      this.token = hashParams.access_token;
      return;
    }
    this.errors.push(new Error('Cannot parse access token'));
  }

  @action.bound
  async getProjects() {
    try {
      if (!this.token) {
        throw new Error('No token!');
      }
      const { data } = await axios({
        url: 'https://gitlab.com/api/v4/projects',
        headers: { Authorization: `Bearer ${this.token}` },
        params: { membership: true },
      });
      this.projects = data;
    } catch (e) {
      this.errors.push(e);
    }
  }
}

const store = new Store();

export default store;

export const useStore = () => {
  return useObservable(store);
};
export const useIsAuthenticated = () => {
  const { token } = useStore();
  return !!token;
};
