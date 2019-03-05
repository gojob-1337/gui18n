import React, { FunctionComponent } from 'react';

import { makeStyles } from '@material-ui/styles';
import { createBrowserHistory } from 'history';
import { observer } from 'mobx-react-lite';
import { Redirect, Route, Router, Switch } from 'react-router';

import { useIsAuthenticated } from '../store';

import Projects from './Projects';
import Files from './Projects/Files';
import Translations from './Projects/Translations';
import Welcome from './Welcome';

export const history = createBrowserHistory();

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  },
});

const Pages: FunctionComponent = observer(() => {
  const auth = useIsAuthenticated();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router history={history}>
        <Switch>
          {auth && (
            <Route
              path="/projects/:projectId/:filePath"
              component={(props: any) => <Translations {...props} />}
            />
          )}
          {auth && (
            <Route path="/projects/:projectId" component={(props: any) => <Files {...props} />} />
          )}
          {auth && <Route path="/projects" component={() => <Projects />} />}
          <Route
            exact
            path="/"
            component={() => (auth ? <Redirect to="/projects" /> : <Welcome />)}
          />
          <Route component={() => <h2>Page not found</h2>} />
        </Switch>
      </Router>
    </div>
  );
});

export default Pages;
