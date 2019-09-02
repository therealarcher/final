// import React, { useState, createContext } from 'react';
// import Axios from 'axios';

// export const IngredientsContext = createContext();
// export const IngredientsProvider = (props) => {
//   Axios.get('http://localhost:3000/api/v1/ingredients')
//     .then(function(response) {
//       console.log(response.data[0]);
//     })
//     .catch(function(e) {
//       console.log(e);
//     });
//   const [ingredients, setIngredients] = useState([
//     { id: 1, name: 'canned tomatos' }
//   ]);
//   return (
//     <IngredientsContext.Provider value={[ingredients, setIngredients]}>
//       {props.children}
//     </IngredientsContext.Provider>
//   );
// };
