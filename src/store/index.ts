import { Project } from 'gitlab';
import { action, autorun, observable, runInAction } from 'mobx';
import { useObservable } from 'mobx-react-lite';
import { parse } from 'query-string';

import ConfigurationStore from './configuration';
import remoteResource from './remoteResource';
import SelectedProjectStore from './SelectedProject';
import TranslationsStore from './Translations';

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

  configurationStore = new ConfigurationStore(this);
  selectedProjectStore = new SelectedProjectStore(this, this.configurationStore);
  translationsStore = new TranslationsStore(this, this.selectedProjectStore);

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
export const useTranslations = () => {
  const { translationsStore } = useObservable(store);
  return translationsStore;
};

export const useIsAuthenticated = () => {
  const { token } = useStore();
  return !!token;
};

export const useConfiguration = () => {
  const { configurationStore } = useObservable(store);
  return configurationStore;
};
