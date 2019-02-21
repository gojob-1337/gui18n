import React, { FunctionComponent, useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import { useStore } from '../store';
import Project from './Project';

const ProjectList: FunctionComponent = observer(() => {
  const { getProjects, token, projects } = useStore();
  useEffect(() => {
    if (token) {
      getProjects();
    }
  }, [token]);

  if (!projects) {
    return null;
  }
  return (
    <>
      {projects.map((project) => (
        <Project key={project.id} name={project.name} />
      ))}
    </>
  );
});

export default ProjectList;
