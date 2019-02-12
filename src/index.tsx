import ReactDom from 'react-dom';
import React from 'react';
import App from './App';

const main = () => {
    const root = document.getElementById('root');
    ReactDom.render(<App/>, root);
}
main();