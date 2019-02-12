import queryString from 'query-string';
import { useEffect, useState } from 'react';

const useHashToken = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const hashParams = queryString.parse(window.location.hash);

    if ('access_token' in hashParams && typeof hashParams.access_token === 'string') {
      setToken(hashParams.access_token);
    }
  }, [setToken]);

  return token;
};

export default useHashToken;
