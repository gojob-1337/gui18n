import React from 'react';

import queryString from 'query-string';

import Button from '@material-ui/core/Button';

const LoginButton = () => {
    const baseUrl = 'https://gitlab.com/oauth/authorize';
    const params = {
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URL,
        response_type: 'token',
        state: '1',
    };
    const url = `${baseUrl}/?${queryString.stringify(params)}`;

    return <Button variant="contained" color="secondary" href={url}>Gitlab connect</Button>;
};

export default React.memo(LoginButton);
