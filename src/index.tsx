import React from 'react';
import ReactDom from 'react-dom';
import DevTools from 'mobx-react-devtools';

import '@babel/polyfill';

import App from './App';

const main = () => {
  const root = document.getElementById('root');
  ReactDom.render(
    <>
      <DevTools />
      <App />
    </>,
    root
  );
};

main();
