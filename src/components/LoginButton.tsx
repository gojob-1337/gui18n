import queryString from 'query-string';
import React from 'react';

const LoginButton = () => {
    const baseUrl = 'https://gitlab.com/oauth/authorize';
    const params = {
        client_id: '9d56e2b77cf1350d5ca0c2efd2d7f639e67516871be44613f228d76485beb59d',
        redirect_uri: 'http://localhost:1234',
        response_type: 'token',
        state: '1',
    };
    const url = `${baseUrl}/?${queryString.stringify(params)}`;
    return <a href={url}>Gitlab connect</a>;
};

export default LoginButton;
