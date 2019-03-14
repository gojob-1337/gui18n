import { Project, RepositoryFile } from 'gitlab';
import { action, observable } from 'mobx';

import { Store } from '.';
import conditionalAction from './conditionalAction';
import ConfigurationStore from './configuration';
import remoteResource from './remoteResource';

class SelectedProjectStore {
  constructor(
    private readonly rootStore: Store,
    private readonly configurationStore: ConfigurationStore,
  ) {}

  project: any = remoteResource<Project>(() => {
    const { token } = this.rootStore;
    const { selectedProjectId } = this;
    if (!token || !selectedProjectId) {
      return null;
    }
    return {
      url: `https://gitlab.com/api/v4/projects/${selectedProjectId}`,
      headers: { Authorization: `Bearer ${token}` },
    };
  });

  @observable
  selectedProjectId?: string;
  select = action((projectId: string) => {
    this.selectedProjectId = projectId;
  });

  files = remoteResource<RepositoryFile[]>(() => {
    if (
      !this.rootStore.token ||
      !this.rootStore.projectBranchesStore.branches.data ||
      !this.selectedProjectId ||
      !this.configurationStore.currentPath
    ) {
      return null;
    }

    return {
      url: `https://gitlab.com/api/v4/projects/${this.selectedProjectId}/repository/tree`,
      headers: { Authorization: `Bearer ${this.rootStore.token}` },
      params: {
        recursive: true,
        per_page: 100,
        path: this.configurationStore.currentPath,
        ref: 'test/gui18n',
      },
    };
  });
}

export default SelectedProjectStore;
