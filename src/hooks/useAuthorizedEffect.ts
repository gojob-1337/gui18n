import { useEffect } from 'react';

import { useStore } from '../store';

const useAuthorizedEffect = (fn: (...args: any[]) => any, deps: any[] = []) => {
  const { token } = useStore();

  useEffect(() => {
    if (token) {
      return fn();
    }
  }, [...deps, token]);
};

export default useAuthorizedEffect;
