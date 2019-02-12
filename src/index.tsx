import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';

const main = () => {
    const root = document.getElementById('root');
    ReactDom.render(<Provider store={store}><App/></Provider>, root);
};

main();
