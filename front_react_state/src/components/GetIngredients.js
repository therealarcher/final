import React, { useState, useEffect, useContext } from 'react';
import Toggle from '../utilities/Toggle';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch(url, { mode: 'cors' });
      const data = await response.json();
      const [item] = data;
      setData(data);
      setLoading(false);
    })();
  }, [url]);

  return { data, loading };
};

export const GetIngredients = () => {
  const { data, loading } = useFetch('http://localhost:3002/api/recipes/new');

  return (
    <div>
      {loading ? (
        <div>...loading</div>
      ) : (
        <div>
          <Toggle>
            {({ on, toggle }) => (
              <div>
                {on &&
                  data.map((result) => (
                    <div key={result.id}>
                      {JSON.stringify(result.name).replace(/\"/g, '')}
                    </div>
                  ))}
                <button onClick={toggle}>Ingredients list from API</button>
              </div>
            )}
          </Toggle>
        </div>
      )}
    </div>
  );
};
