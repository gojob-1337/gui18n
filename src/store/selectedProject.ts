import { Project, RepositoryFile } from 'gitlab';
import { observable } from 'mobx';

import { conditionalAction, remoteResource, Store } from '.';

class SelectedProjectStore {
  constructor(private readonly rootStore: Store) {}

  @observable
  project?: Project | null;

  select = conditionalAction(
    () => !!this.rootStore.projectsStore.projects.data,
    (projectId: string) =>
      (this.project = this.rootStore.projectsStore.projects.data!.find(
        (project) => project.id === parseInt(projectId as string, 10),
      )),
  );

  files = remoteResource<RepositoryFile[]>(() => {
    if (!this.rootStore.token || !this.project) {
      return null;
    }
    return {
      url: `https://gitlab.com/api/v4/projects/${this.project.id}/repository/tree`,
      headers: { Authorization: `Bearer ${this.rootStore.token}` },
      params: { recursive: true, per_page: 500 },
    };
  });
}

export default SelectedProjectStore;