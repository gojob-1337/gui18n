import { observer } from 'mobx-react-lite';
import React, { FunctionComponent, useEffect } from 'react';

import { Redirect } from 'react-router';
import LoginButton from './components/LoginButton';
import { useStore } from './store';

const App: FunctionComponent = observer(() => {
  const store = useStore();
  useEffect(() => {
    store.authenticate();
  }, []);

  if (!store.token) {
    return <LoginButton />;
  }

  return <Redirect to="/projects"/>;
});

export default App;
