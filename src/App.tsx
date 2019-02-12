import React, { FunctionComponent, useEffect } from 'react';

import LoginButton from './components/LoginButton';
import { Dispatch } from 'redux';
import authSucceeded from './store/actions/auth-succeeded';
import { connect } from 'react-redux';

type AppProps = { auth: () => void }

const App: FunctionComponent<AppProps> = (props) => {
    useEffect(() => {
        props.auth();
    }, []);
    return (
        <LoginButton />
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        auth: () => dispatch(authSucceeded(window.location.hash))
    }
};


export default connect(null, mapDispatchToProps)(App);
