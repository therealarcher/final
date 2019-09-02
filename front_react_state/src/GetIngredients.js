// import React, { useState, useEffect } from 'react';

// export const useFetch = (url) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(async () => {
//     const response = await fetch(url);
//     const data = await response.json();
//     const [item] = data;
//     setData(item);
//     setLoading(false);
//   }, []);
//   return { data, loading };
// };

// export const GetIngredients = () => {
//   const [count, setCount] = useState(0);
//   const { data, loading } = useFetch(
//     'http://localhost:3000/api/v1/ingredients'
//   );

//   return (
//     <div>
//       <p>Here is the data you wanted</p>
//       <button onClick={() => setCount(count + 1)}>Click me</button>
//       {loading ? <div>...loading</div> : <div>{[data.children]}</div>}
//     </div>
//   );
// };
