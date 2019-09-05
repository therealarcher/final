// import React, { useState } from 'react';
// import { useFetch } from '../hooks/useFetch';

// export const SubmitSearch = () => {
//   const { data, loading } = useFetch(
//     `http://localhost:3002/api/recipes/search?term=chicken`
//   );
//   const [fetchData, setFetchData] = useState(null);

//   const fetchHelper = () => {
//     setFetchData(data);
//   };

//   return (
//     <div>
//       <button onClick={fetchHelper}>Get Recipes</button>
//       <div>{JSON.stringify(fetchData)}</div>
//     </div>
//   );
// };
