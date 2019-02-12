import React, { FunctionComponent, useEffect } from 'react';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import LoginButton from './components/LoginButton';
import ProjectList from './components/ProjectList';
import authSucceeded from './store/actions/auth-succeeded';

type AppProps = { auth: () => void, token?: string };

const App: FunctionComponent<AppProps> = (props) => {
    useEffect(() => {
        props.auth();
    }, []);
    if (!props.token) {
        return <LoginButton />;
    }
    return <ProjectList/>;

};

const mapStateToProps = (state: any) => {
    return {token: state.token} ;
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        auth: () => dispatch(authSucceeded(window.location.hash)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
