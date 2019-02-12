import React from 'react';
import ReactDom from 'react-dom';

import App from './App';

const main = () => {
    const root = document.getElementById('root');
    ReactDom.render(<App/>, root);
};

main();
