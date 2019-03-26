import { useEffect, useState } from 'react';

/**
 * Creates a debounced value with a delay
 */
const useDebounce = <T>(value: T, delay: number) => {
  const [state, setState] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setState(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return state;
};

export default useDebounce;
