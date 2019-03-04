import { Project } from 'gitlab';
import { remoteResource, Store } from '.';

class ProjectsStore {
  constructor(private readonly rootStore: Store) {}

  projects = remoteResource<Project[]>(() => {
    if (!this.rootStore.token) {
      return null;
    }
    return {
      url: 'https://gitlab.com/api/v4/projects',
      headers: { Authorization: `Bearer ${this.rootStore.token}` },
      params: { membership: true },
    };
  });
}

export default ProjectsStore;
