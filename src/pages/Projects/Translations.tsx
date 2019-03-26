import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';

import { RouteComponentProps, withRouter } from 'react-router';

import { Theme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

import ScrollToTop from '../../components/ScrollToTop';

import useAxios from '../../hooks/useAxios';
import { useToken } from '../../hooks/useToken';

export type TranslationsProps = {} & RouteComponentProps<{
  projectId: string;
  filePath: string;
  branchPath: string;
}>;

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    alignSelf: 'baseline',
    width: '100%',
    maxWidth: 480,
    backgroundColor: theme.palette.background.paper,
  },
  input: {
    width: '100%',
  },
  spinnerWrapper: {
    height: '100%',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    display: 'flex',
    margin: 12,
    justifyContent: 'center',
  },
  commitButton: {
    minWidth: 160,
  },
}));

export type CommitArgs = {
  projectId: string;
  branchPath: string;
  filePath: string;
  content?: { [key: string]: string };
};

const useCommit = ({ projectId, branchPath, filePath, content = {} }: CommitArgs) => {
  const token = useToken();

  filePath = decodeURIComponent(filePath);
  branchPath = decodeURIComponent(branchPath);
  const json = JSON.stringify(content, null, 2);

  const body = {
    branch: decodeURIComponent(branchPath),
    commit_message: `update ${filePath} from ${branchPath}`,
    actions: [{ action: 'update', file_path: filePath, content: json }],
  };

  const { data, loading, error, makeRequest } = useAxios(
    () => {
      return {
        url: `https://gitlab.com/api/v4/projects/${projectId}/repository/commits`,
        method: 'post',
        data: body,
        headers: { Authorization: `Bearer ${token}` },
      };
    },
    [projectId, branchPath, filePath],
    true,
  );

  return { handleCommit: makeRequest, loading, data, error };
};

const Translations: FunctionComponent<TranslationsProps> = (props) => {
  const { filePath, projectId, branchPath } = props.match.params;
  const [translations, setTranslations] = useState<{ [key: string]: string } | undefined>(
    undefined,
  );
  const token = useToken();

  const classes = useStyles();

  const { data, loading } = useAxios(
    () => ({
      url: `https://gitlab.com/api/v4/projects/${projectId}/repository/files/${filePath}/raw`,
      method: 'get',
      params: { ref: decodeURIComponent(branchPath) },
      headers: { Authorization: `Bearer ${token}` },
    }),
    [projectId, branchPath, filePath],
  );

  const { handleCommit, loading: isCommitting } = useCommit({
    branchPath,
    content: translations,
    filePath,
    projectId,
  });

  useEffect(() => {
    setTranslations(data);
  }, [data]);

  const handleChange = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setTranslations({ ...translations, [key]: newValue });
  };

  return (
    <List
      component="nav"
      subheader={
        <ListSubheader component="div">{decodeURIComponent(filePath)} namespace:</ListSubheader>
      }
      className={classes.list}
    >
      <ScrollToTop />
      {!translations || loading ? (
        <div className={classes.spinnerWrapper}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {Object.keys(translations).map((key: string) => (
            <ListItem key={key}>
              <TextField
                className={classes.input}
                label={key}
                value={translations[key]}
                onChange={handleChange(key)}
              />
            </ListItem>
          ))}
          <div className={classes.buttonWrapper}>
            <Button
              onClick={handleCommit}
              color="primary"
              variant="raised"
              disabled={isCommitting}
              className={classes.commitButton}
            >
              {isCommitting ? <CircularProgress size={16} /> : 'Commit'}
            </Button>
          </div>
        </>
      )}
    </List>
  );
};

export default withRouter(Translations);
