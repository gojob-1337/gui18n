import React from 'react';
import { Provider } from 'react-redux';

import LoginButton from './components/LoginButton';
import useHashToken from './hooks/useHashToken';
import store from './store';

const App = () => {
    const token = useHashToken();

    return (<Provider store={store}>
      {token}
      <LoginButton/>
    </Provider>);
};

export default App;
