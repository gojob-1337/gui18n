import { Project } from 'gitlab';
import { action, autorun, observable, runInAction } from 'mobx';
import { useObservable } from 'mobx-react-lite';
import { parse } from 'query-string';

import remoteResource from './remoteResource';
import SelectedProjectStore from './selectedProject';

export class Store {
  @observable
  errors: Error[] = [];
  @observable
  token?: string = undefined;

  projects = remoteResource<Project[]>(() => {
    if (!this.token) {
      return null;
    }
    return {
      url: 'https://gitlab.com/api/v4/projects',
      headers: { Authorization: `Bearer ${this.token}` },
      params: { membership: true },
    };
  });
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

if (window) {
  const token = window.localStorage.getItem('token');
  if (token) {
    runInAction(() => (store.token = token));
  }
  autorun(() => {
    if (store.token) {
      window.localStorage.setItem('token', store.token);
    }
  });
}

export default store;

export const useStore = () => {
  return useObservable(store);
};
export const useSelectedProjectStore = () => {
  const { selectedProjectStore } = useObservable(store);
  return selectedProjectStore;
};
export const useIsAuthenticated = () => {
  const { token } = useStore();
  return !!token;
};
