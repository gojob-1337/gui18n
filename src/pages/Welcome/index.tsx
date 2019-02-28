import React, { FunctionComponent } from 'react';

import { Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

import LoginButton from '../../components/LoginButton';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    minWidth: 480,
    minHeight: 300,
    maxWidth: 720,
    maxHeight: 480,
    margin: theme.spacing.unit * 2,
    padding: theme.spacing.unit * 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
}));

const Welcome: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Typography variant="h1" color="secondary">
        Gui18n
      </Typography>
      <Typography align="center" color="textSecondary" variant="h2">
        All your translation needs fulfilled!
      </Typography>
      <br />
      <LoginButton />
    </Card>
  );
};

export default Welcome;
