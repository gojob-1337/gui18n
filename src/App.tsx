import React, { FunctionComponent, useEffect } from 'react';

import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { observer } from 'mobx-react-lite';

import { useStore } from './store';

import Pages from './pages';

const theme = createMuiTheme();

const App: FunctionComponent = observer((props) => {
  const store = useStore();
  useEffect(() => void store.authenticate(), []);

  return (
    <ThemeProvider theme={theme}>
      <Pages />
    </ThemeProvider>
  );
});

export default App;
