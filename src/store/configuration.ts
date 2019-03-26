import { computed, observable } from 'mobx';

import { Store } from '.';
import remoteResource from './remoteResource';

export type Configuration = {
  defaultLanguage: string;
  languages: {
    name: string;
    path: string;
  }[];
};

class ConfigurationStore {
  static readonly configurationFilePath = '.gui18n.json';
  constructor(private readonly rootStore: Store) {}

  @observable
  configuration = remoteResource<Configuration>(() => {
    if (!this.rootStore.token || !this.rootStore.selectedProjectStore.project) {
      return null;
    }

    return {
      url: `https://gitlab.com/api/v4/projects/${
        this.rootStore.selectedProjectStore.project!.id
      }/repository/files/${encodeURIComponent(ConfigurationStore.configurationFilePath)}/raw`,
      method: 'get',
      params: { ref: 'test/gui18n' },
      headers: { Authorization: `Bearer ${this.rootStore.token}` },
    };
  });

  @computed
  get currentPath() {
    const { data } = this.configuration;

    if (!data) {
      return null;
    }

    const defaultLanguage = data.languages.find((lng) => lng.name === data.defaultLanguage);
    return defaultLanguage ? defaultLanguage.path : null;
  }
}

export default ConfigurationStore;
