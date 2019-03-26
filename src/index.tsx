import { install, ThemeProvider } from '@material-ui/styles';
install();

import React from 'react';
import ReactDom from 'react-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import '@babel/polyfill';
import 'typeface-roboto';

import App from './App';

const main = () => {
  const root = document.getElementById('root');
  ReactDom.render(
    <>
      <CssBaseline />
      <App />
    </>,
    root,
  );
};

main();
