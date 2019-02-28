import { FunctionComponent, useEffect } from 'react';

const ScrollToTop: FunctionComponent = () => {
  useEffect(() => {
    if (window) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);
  return null;
};

export default ScrollToTop;
