import { useEffect, useLayoutEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes
  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (delay == null) {
      return; // Exit if no delay is provided
    }

    const id = setInterval(() => savedCallback.current(), delay);

    // Clean up the interval on component unmount or if the delay changes
    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;


