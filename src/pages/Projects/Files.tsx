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

import { history } from '..';
import ScrollToTop from '../../components/ScrollToTop';
import { useSelectedProjectStore, useTranslations } from '../../store';

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
  const classes = useStyles();
  const { select, files, project } = useSelectedProjectStore();
  const selectFile = (filePath: string) => () => {
    history.push(`/projects/${projectId}/${encodeURIComponent(filePath)}`);
  };

  useEffect(() => void select(projectId), [projectId]);

  if (!projectId) {
    return null;
  }

  const { data, loading } = files;
  if (!project || !data || loading) {
    return <CircularProgress />;
  }
  return (
    <List
      component="nav"
      subheader={<ListSubheader component="div">{project.name} files:</ListSubheader>}
      className={classes.list}
    >
      <ScrollToTop />
      {data
        .filter((file) => file.type === 'blob')
        .map((file) => (
          <ListItem button key={file.id} onClick={selectFile(file.path)}>
            {/** Let the Icon live...for now! 👿 */}
            <ListItemIcon>{file.type === 'tree' ? <Folder /> : <File />}</ListItemIcon>
            <ListItemText primary={file.name} secondary={file.path} />
          </ListItem>
        ))}
    </List>
  );
});

export default withRouter(Files);
