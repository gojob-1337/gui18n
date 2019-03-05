import React, { FunctionComponent, useEffect } from 'react';

import { RouteComponentProps, withRouter } from 'react-router';

import { Theme } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { observer } from 'mobx-react-lite';

import ScrollToTop from '../../components/ScrollToTop';

import { useSelectedProjectStore, useTranslations } from '../../store';

export type FilesProps = {} & RouteComponentProps<{ projectId: string; filePath: string }>;

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
}));

const Translations: FunctionComponent<FilesProps> = observer((props) => {
  const { filePath, projectId } = props.match.params;
  const classes = useStyles();
  const { select, project } = useSelectedProjectStore();
  const { translations, getTranslations } = useTranslations();

  useEffect(() => {
    select(projectId);
    getTranslations(decodeURIComponent(filePath));
  }, [projectId, filePath]);

  const { data, loading } = translations;
  if (!projectId || !project || !filePath || !data || loading) {
    return <CircularProgress />;
  }
  return (
    <List
      component="nav"
      subheader={
        <ListSubheader component="div">{decodeURIComponent(filePath)} namespace:</ListSubheader>
      }
      className={classes.list}
    >
      <ScrollToTop />
      {Object.keys(data).map((key: string) => (
        <ListItem key={data[key]}>
          <TextField className={classes.input} label={key} value={data[key]} />
        </ListItem>
      ))}
    </List>
  );
});

export default withRouter(Translations);
