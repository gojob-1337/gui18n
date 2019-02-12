import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import defaultReducer from './reducers';

const store = createStore(defaultReducer, devToolsEnhancer({}));
export default store;
