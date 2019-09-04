import { useState, useEffect } from 'react';

import useDebounce from './useDebounce';

function useCancelableLiveSearch(
  query,
  urlFactory,
  delay = 250,
  neglectValue = ''
) {
  const [response, setResponse] = useState(null);
  const debouncedQuery = useDebounce(query, delay);

  useEffect(() => {
    if (debouncedQuery !== neglectValue) {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.state === 200) {
          setResponse(xhr.response);
        }
      };
      xhr.open('GET', urlFactory(debouncedQuery), true);
      xhr.send();
      return () => xhr.abort();
    } else {
      setResponse(null);
    }
  }, [debouncedQuery]);
  return response;
}
export default useCancelableLiveSearch;
