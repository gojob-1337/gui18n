import React, { FunctionComponent } from 'react';

import { Theme } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/styles';
import { observer } from 'mobx-react-lite';

import ScrollToTop from '../../components/ScrollToTop';

import { useStore } from '../../store';
import { history } from '../index';

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    alignSelf: 'baseline',
    width: '100%',
    maxWidth: 480,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Projects: FunctionComponent = observer(() => {
  const { projects } = useStore();
  const classes = useStyles();
  const { data, loading } = projects;

  if (!data || loading) {
    return <CircularProgress />;
  }
  return (
    <List
      component="nav"
      subheader={<ListSubheader component="div">Your projects:</ListSubheader>}
      className={classes.list}
    >
      <ScrollToTop />
      {data.map((project) => (
        <ListItem button onClick={() => history.push(`/projects/${project.id}`)}>
          <ListItemAvatar>
            <Avatar src={project.avatar_url}>{project.name.slice(0, 2)}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={project.name} secondary={project.namespace.name} />
        </ListItem>
      ))}
    </List>
  );
});

export default Projects;
