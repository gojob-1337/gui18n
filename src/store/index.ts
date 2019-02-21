import axios from 'axios';
import { Project } from 'gitlab';
import { action, observable } from 'mobx';
import { useObservable } from 'mobx-react-lite';
import { RouterStore } from 'mobx-react-router';
import { parse } from 'query-string';

class Store {
  @observable
  errors: Error[] = [];

  @observable
  token?: string;

  @observable
  selectedProject?: Project;

  @observable
  projects?: Project[];

  @observable
  routing: RouterStore = new RouterStore();

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
