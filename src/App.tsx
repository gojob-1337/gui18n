import { observer } from 'mobx-react-lite';
import React, { FunctionComponent, useEffect } from 'react';

import LoginButton from './components/LoginButton';
import ProjectList from './components/ProjectList';
import { useStore } from './store';

const App: FunctionComponent = observer((props) => {
    const store = useStore();
    useEffect(() => {
        store.authenticate();
    }, []);
    if (!store.token) {
        return <LoginButton />;
    }
    return <ProjectList/>;

});

export default App;
