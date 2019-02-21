import '@babel/polyfill';
import DevTools from 'mobx-react-devtools';
import React from 'react';
import ReactDom from 'react-dom';
import { Route, Router } from 'react-router';

import { install } from '@material-ui/styles';
install();

import CssBaseline from '@material-ui/core/CssBaseline';
import createBrowserHistory from 'history/createBrowserHistory';
import { syncHistoryWithStore } from 'mobx-react-router';

import App from './App';
import BranchSwitcher from './components/BranchSwitcher';
import ProjectList from './components/ProjectList';
import store from './store';

const browserHistory = createBrowserHistory();
const { routing } = store;

const history = syncHistoryWithStore(browserHistory, routing);

const main = () => {
  const root = document.getElementById('root');
  ReactDom.render(
    <>
      <DevTools />
      <CssBaseline />

      <Router history={history}>
        <>
          <Route exact path="/" component={App} />
          <Route exact path="/projects" component={ProjectList} />
          <Route exact path="/branch-switcher" component={BranchSwitcher} />
        </>
      </Router>
    </>,
    root,
  );
};

main();
