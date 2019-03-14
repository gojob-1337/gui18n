import React, { ChangeEvent, FunctionComponent, useCallback, useEffect } from 'react';

import { RouteComponentProps, withRouter } from 'react-router';

import { Theme } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { observer } from 'mobx-react-lite';

import { history } from '..';
import ScrollToTop from '../../components/ScrollToTop';
import { useProjectBranchesStore, useSelectedProjectStore } from '../../store';

export type FilesProps = {} & RouteComponentProps<{ projectId: string }>;

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    alignSelf: 'baseline',
    width: '100%',
    maxWidth: 480,
    backgroundColor: theme.palette.background.paper,
  },
  subheader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const Branches: FunctionComponent<FilesProps> = observer((props) => {
  const { projectId } = props.match.params;
  const classes = useStyles();
  const { branches, search, setSearch } = useProjectBranchesStore();
  const { select, project } = useSelectedProjectStore();

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    [],
  );

  useEffect(() => {
    select(projectId);
  }, [projectId]);

  if (!project.data) {
    return <CircularProgress />;
  }

  return (
    <List
      component="nav"
      subheader={
        <ListSubheader className={classes.subheader} component="div">
          {project.name} Branches:
          <TextField placeholder="Search" value={search} onChange={handleSearch} />
        </ListSubheader>
      }
      className={classes.list}
    >
      <ScrollToTop />
      {!branches.data || branches.loading ? (
        <CircularProgress />
      ) : (
        branches.data
          .filter((branch) => !branch.merged)
          .map((branch) => (
            <ListItem button key={branch.name}>
              <ListItemText primary={branch.name} secondary={branch.protected && 'Protected'} />
            </ListItem>
          ))
      )}
    </List>
  );
});

export default withRouter(Branches);
