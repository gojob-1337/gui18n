import '@babel/polyfill';
import DevTools from 'mobx-react-devtools';
import React from 'react';
import ReactDom from 'react-dom';

import { install } from '@material-ui/styles';
install();

import CssBaseline from '@material-ui/core/CssBaseline';

import App from './App';

const main = () => {
  const root = document.getElementById('root');
  ReactDom.render(
    <>
      <DevTools />
      <CssBaseline />
      <App />
    </>,
    root,
  );
};

main();
