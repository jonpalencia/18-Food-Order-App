import { useCallback, useEffect, useState } from 'react';
import { sendHttpRequest } from '../utils/utils';

export default function useHttp(url, config, initState) {
  // TODO: Add and define a custom hook for sending request.

  const [data, setData] = useState(initState);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const clearData = function (initData) {
    setData(initData);
  };

  const sendRequest = useCallback(
    async function (payload) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, {
          ...config,
          body: payload,
        });
        setData(resData);
      } catch (err) {
        setError(err.message || `Something went wrong, please try again...`);
      }
      setIsLoading(false);
    },
    [url, config],
  );

  useEffect(() => {
    if (!config || config.method === undefined || config.method === 'GET') {
      sendRequest();
    }
  }, [url, config]);

  return {
    data,
    error,
    isLoading,
    sendRequest,
    clearData,
  };
}
