import { useState, useEffect } from 'react';

import useDebounce from './useDebounce';

function useLiveSearch(query, requestFactory, delay = 250, neglectValue = '') {
  const [response, setResponse] = useState(null);
  const debounceQuery = useDebounce(query, delay);

  useEffect(() => {
    let isActive = true;

    if (debounceQuery !== neglectValue) {
      requestFactory(debounceQuery).then((res) => {
        if (isActive) {
          setResponse(res);
        }
      });
    } else {
      setResponse(null);
    }

    return () => (isActive = false);
  }, [debouncedQuery]);

  return response;
}

export default useLiveSearch;
