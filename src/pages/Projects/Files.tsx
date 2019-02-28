import React, { FunctionComponent, useEffect } from 'react';

import { RouteComponentProps, withRouter } from 'react-router';

import { Theme } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Folder from '@material-ui/icons/Folder';
import File from '@material-ui/icons/InsertDriveFile';
import { makeStyles } from '@material-ui/styles';
import { observer } from 'mobx-react-lite';

import ScrollToTop from '../../components/ScrollToTop';

import { useStore } from '../../store';

export type FilesProps = {} & RouteComponentProps<{ projectId: string }>;

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    alignSelf: 'baseline',
    width: '100%',
    maxWidth: 480,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Files: FunctionComponent<FilesProps> = observer((props) => {
  const { projectId } = props.match.params;
  const { projects, selectProject, selectedProject, selectedProjectFiles } = useStore();
  const { data, loading } = selectedProjectFiles;
  const classes = useStyles();
  useEffect(() => {
    if (projectId) {
      selectProject(projectId);
    }
  }, [projectId, projects.data]);

  if (!projectId) {
    return null;
  }

  if (!selectedProject || !data || loading) {
    return <CircularProgress />;
  }
  return (
    <List
      component="nav"
      subheader={<ListSubheader component="div">{selectedProject.name} files:</ListSubheader>}
      className={classes.list}
    >
      <ScrollToTop />
      {data.map((file) => (
        <ListItem button>
          <ListItemIcon>{file.type === 'tree' ? <Folder /> : <File />}</ListItemIcon>
          <ListItemText primary={file.name} secondary={file.path} />
        </ListItem>
      ))}
    </List>
  );
});

export default withRouter(Files);
