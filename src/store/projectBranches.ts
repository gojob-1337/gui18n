import { action, observable, toJS } from 'mobx';

import { Branch } from 'gitlab';
import { Store } from '.';
import remoteResource from './remoteResource';

class ProjectBranchesStore {

  constructor(private readonly rootStore: Store) {}

  @observable
  search?: string;
  setSearch = action((search?: string) => {
    this.search = search;
  });

  branches = remoteResource<Branch[]>(() => {

    const project = this.rootStore.selectedProjectStore.project;
    const token = this.rootStore.token;

    if (!project.data || !token) {
      return null;
    }
    return {
      url: `https://gitlab.com/api/v4/projects/${project.data.id}/repository/branches`,
      headers: { Authorization: `Bearer ${token}` },
      params: { search: this.search },
    };
  });
}

export default ProjectBranchesStore;
