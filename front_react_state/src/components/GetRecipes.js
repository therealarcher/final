// import React, { useState, Fragment } from 'react';

// const GetRecipes = () => {
//   const [term, setTerm] = useState('');
//   const [ingredients, setIngredients] = useState('');

//   const updateTerm = (e) => {
//     setTerm(e.target.value);
//   };
//   const addSearch = (e) => {
//     e.preventDefault();
//     setIngredients((prevIngredients) => [...prevIngredients, { Term: term }]);
//   };
//   return (
//     <Fragment>
//       <form onSubmit={addSearch}>
//         <input type="text" name="title" value={term} onChange={updateTerm} />
//         <button>Add Item</button>
//       </form>
//     </Fragment>
//   );
// };
// export default GetRecipes;
