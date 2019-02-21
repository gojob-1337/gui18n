import React, { FunctionComponent, useCallback } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';
import { Project as ProjectType } from 'gitlab';
import { observer } from 'mobx-react-lite';

import useProjects from '../hooks/useProjects';
import { useStore } from '../store';
import Project from './Project';

const useStyles = makeStyles({
  root: {
  },
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
  const projects = useProjects();
  const store = useStore();
  const createProjectSelector = useCallback((project: ProjectType) => () => {
    store.selectedProject = project;
    store.routing.push('/branch-switcher');
  }, [store.selectedProject]);
  const classes = useStyles();

  if (!projects) {
    return <div className={classes.loading}><CircularProgress /></div>;
  }

  return (
    <>
      {projects.map((project) => (
        <Project key={project.id} name={project.name} onClickHandler={createProjectSelector(project)}/>
      ))}
    </>
  );
});

export default ProjectList;
