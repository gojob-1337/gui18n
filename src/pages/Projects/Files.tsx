import React, { ChangeEvent, FunctionComponent, useCallback, useState } from 'react';

import { Theme } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import FileCopy from '@material-ui/icons/FileCopy';
import Folder from '@material-ui/icons/Folder';
import { makeStyles } from '@material-ui/styles';
import { RouteComponentProps, withRouter } from 'react-router';

import ScrollToTop from '../../components/ScrollToTop';
import useAxios from '../../hooks/useAxios';
import { useToken } from '../../hooks/useToken';

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

function getCurrentPath(configuration) {
  const { data } = configuration;

  if (!data) {
    return null;
  }

  const defaultLanguage = data.languages.find((lng) => lng.name === data.defaultLanguage);
  return defaultLanguage ? defaultLanguage.path : null;
}

export type FilesProps = {} & RouteComponentProps<{ projectId: string; branchPath: string }>;

const Files: FunctionComponent<FilesProps> = (props) => {
  const { projectId, branchPath } = props.match.params;

  const token = useToken();

  const config = useAxios(
    () => ({
      url: `https://gitlab.com/api/v4/projects/${projectId}/repository/files/${encodeURIComponent(
        '.gui18n.json',
      )}/raw`,
      headers: { Authorization: `Bearer ${token}` },
      params: { per_page: 100, ref: 'test/gui18n' },
    }),
    [projectId, branchPath],
  );

  const path = getCurrentPath(config);

  const { data, loading } = useAxios(
    () => ({
      url: `https://gitlab.com/api/v4/projects/${projectId}/repository/tree`,
      headers: { Authorization: `Bearer ${token}` },
      params: { per_page: 100, ref: decodeURIComponent(branchPath), path },
    }),
    [projectId, branchPath, path],
  );

  const classes = useStyles();

  const selectFile = (filePath: string) => () => {
    history.push(
      `/projects/${projectId}/${encodeURIComponent(branchPath)}/${encodeURIComponent(filePath)}`,
    );
  };

  return (
    <List
      component="nav"
      subheader={
        <ListSubheader className={classes.subheader} component="div">
          FICHIERS
        </ListSubheader>
      }
      className={classes.list}
    >
      <ScrollToTop />
      {!data || !path || loading ? (
        <div className={classes.spinnerWrapper}>
          <CircularProgress />
        </div>
      ) : (
        data.map((file) => (
          <ListItem button key={file.id} onClick={selectFile(file.path)}>
            {/** Let the Icon live...for now! 👿 */}
            <ListItemIcon>{file.type === 'tree' ? <Folder /> : <FileCopy />}</ListItemIcon>
            <ListItemText primary={file.name} secondary={file.path} />
          </ListItem>
        ))
      )}
    </List>
  );
};

export default withRouter(Files);
