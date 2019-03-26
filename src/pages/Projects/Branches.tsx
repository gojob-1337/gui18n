import React, { ChangeEvent, FunctionComponent, useCallback, useState } from 'react';

import { Theme } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/styles';
import { RouteComponentProps, withRouter } from 'react-router';

import ScrollToTop from '../../components/ScrollToTop';
import useAxios from '../../hooks/useAxios';
import { useToken } from '../../hooks/useToken';

import SearchInput from '../../components/SearchInput';
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

export type BranchesProps = {} & RouteComponentProps<{ projectId: string }>;

const Branches: FunctionComponent<BranchesProps> = (props) => {
  const { projectId } = props.match.params;
  const token = useToken();
  const [search, setSearch] = useState<string | undefined>(undefined);

  const { data, loading } = useAxios(
    () => ({
      url: `https://gitlab.com/api/v4/projects/${projectId}/repository/branches`,
      headers: { Authorization: `Bearer ${token}` },
      params: { search },
    }),
    [search, projectId],
  );

  const classes = useStyles();

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length >= 3) {
        return setSearch(e.target.value);
      }
      setSearch(undefined);
    },
    [setSearch],
  );

  return (
    <List
      component="nav"
      subheader={
        <ListSubheader className={classes.subheader} component="div">
          BRANCHES
          <SearchInput
            placeholder="Search"
            value={search}
            onChange={handleSearch}
            loading={loading}
          />
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
        data
          .filter((branch: any) => !branch.merged)
          .map((branch) => (
            <ListItem
              button
              key={branch.name}
              onClick={() =>
                history.push(`/projects/${projectId}/${encodeURIComponent(branch.name)}`)
              }
            >
              <ListItemText primary={branch.name} />
            </ListItem>
          ))
      )}
    </List>
  );
};

export default withRouter(Branches);
