import axios from 'axios';
import { observable, runInAction } from 'mobx';

import { Store } from '.';
import conditionalAction from './conditionalAction';
import remoteResource from './remoteResource';
import SelectedProjectStore from './selectedProject';

export type Translation = {
  key: string;
  namespace?: string;
  value?: string;
  comment?: string;
  author?: string;
};

export type Translations = {
  [index: string]: string;
};

class TranslationsStore {
  constructor(private rootStore: Store, private selectedProjectStore: SelectedProjectStore) {}

  @observable
  language?: string;

  @observable
  filePath?: string;

  @observable
  translations = remoteResource<Translations>(() => {
    if (!this.rootStore.token || !this.selectedProjectStore.project || !this.filePath) {
      return null;
    }
    return {
      url: `https://gitlab.com/api/v4/projects/${
        this.selectedProjectStore.project.id
      }/repository/files/${encodeURIComponent(this.filePath)}/raw`,
      method: 'get',
      params: { ref: 'master' },
      headers: { Authorization: `Bearer ${this.rootStore.token}` },
    };
  });

  getTranslations = conditionalAction(
    () =>
      !!this.rootStore.token &&
      !!this.selectedProjectStore.project &&
      !!this.selectedProjectStore.files,
    (filePath: string) => (this.filePath = filePath),
  );
}

export default TranslationsStore;
