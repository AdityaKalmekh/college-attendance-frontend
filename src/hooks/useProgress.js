import { useState } from 'react';

const useProgress = (promise) => {
  const [loading, setLoading] = useState(false);
  function taskProgress() {
    // eslint-disable-next-line prefer-rest-params
    const args = Array.from(arguments);
    setLoading(true);
    return promise(...args).finally(() => {
      setLoading(false);
    });
  }
  return [taskProgress, loading];
};

export default useProgress;
