import React, { ChangeEvent, FunctionComponent, useCallback } from 'react';

import { Theme } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { observer } from 'mobx-react-lite';

import ScrollToTop from '../../components/ScrollToTop';

import { useStore } from '../../store';
import { history } from '../index';

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    alignSelf: 'baseline',
    height: '100%',
    width: '100%',
    maxWidth: 480,
    minWidth: 480,
    backgroundColor: theme.palette.background.paper,
  },
  subheader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spinnerWrapper: {
    height: '100%',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Projects: FunctionComponent = observer(() => {
  const { projects, projectSearch, setProjectSearch } = useStore();
  const classes = useStyles();
  const { data, loading } = projects;
  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setProjectSearch(e.target.value),
    [],
  );
  return (
    <List
      component="nav"
      subheader={
        <ListSubheader className={classes.subheader} component="div">
          Your projects:
          <TextField placeholder="Search" value={projectSearch} onChange={handleSearch} />
        </ListSubheader>
      }
      className={classes.list}
    >
      <ScrollToTop />
      {!data || loading ? (
        <div className={classes.spinnerWrapper}>
          <CircularProgress />
        </div>
      ) : (
        data.map((project) => (
          <ListItem button key={project.id} onClick={() => history.push(`/projects/${project.id}`)}>
            <ListItemAvatar>
              <Avatar src={project.avatar_url}>{project.name.slice(0, 2)}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={project.name_with_namespace} secondary={project.description} />
          </ListItem>
        ))
      )}
    </List>
  );
});

export default Projects;
