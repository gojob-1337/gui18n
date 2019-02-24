import React, { FunctionComponent, useCallback } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';
import { Project as ProjectType } from 'gitlab';
import { observer } from 'mobx-react-lite';

import useProjects from '../hooks/useProjects';
import { useStore } from '../store';
import Project from './Project';

const useStyles = makeStyles({
  loading: {
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

const ProjectList: FunctionComponent = observer(() => {
  const cssClasses = useStyles();
  const projects = useProjects();
  const store = useStore();
  const createProjectSelector = useCallback((project: ProjectType) => () => {
    store.setSelectedProject(project);
    store.routing.push('/branch-switcher');
  }, [store.selectedProject]);

  if (!projects) {
    return <div className={cssClasses.loading}><CircularProgress /></div>;
  }

  return (
    <>
      {projects.map((project) => (
        <Project
          key={project.id}
          name={project.name}
          onClickHandler={createProjectSelector(project)}/>
      ))}
    </>
  );
});

export default ProjectList;
