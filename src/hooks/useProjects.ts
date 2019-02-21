import { useStore } from '../store';
import useAuthorizedEffect from './useAuthorizedEffect';

const useProjects = () => {
  const { projects, getProjects } = useStore();
  useAuthorizedEffect(() => { getProjects(); });
  return projects;
};

export default useProjects;
