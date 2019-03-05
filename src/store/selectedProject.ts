import { Project, RepositoryFile } from 'gitlab';
import { observable } from 'mobx';

import { Store } from '.';
import conditionalAction from './conditionalAction';
import ConfigurationStore from './configuration';
import remoteResource from './remoteResource';

class SelectedProjectStore {
  constructor(private readonly rootStore: Store, private readonly configurationStore: ConfigurationStore) {}

  @observable
  project?: Project | null;

  select = conditionalAction(
    () => !!this.rootStore.projects.data,
    (projectId: string) =>
      (this.project = this.rootStore.projects.data!.find(
        (project) => project.id === parseInt(projectId as string, 10),
      )),
  );

  files = remoteResource<RepositoryFile[]>(() => {
    if (!this.rootStore.token || !this.project || !this.configurationStore.currentPath) {
      return null;
    }

    return {
      url: `https://gitlab.com/api/v4/projects/${this.project.id}/repository/tree`,
      headers: { Authorization: `Bearer ${this.rootStore.token}` },
      params: { recursive: true, per_page: 100, path: this.configurationStore.currentPath, ref: 'test/gui18n' },
    };
  });
}

export default SelectedProjectStore;
