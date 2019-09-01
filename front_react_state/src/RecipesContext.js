import React, { useState, createContext } from 'react';

export const RecipesContext = createContext();
export const RecipesProvider = (props) => {
  // Axios.get('https://jsonplaceholder.typicode.com/todos')
  //   .then(function(response) {
  //     console.log(response.data[0]);
  //   })
  //   .catch(function(e) {
  //     console.log(e);
  //   });
  const [recipes, setRecipes] = useState([
    {
      title: 'BLT Sandwich',
      id: 1,
      ingredients: ['bacon', 'lettuce', 'tomato', 'bread']
    },
    {
      title: 'Quinoa Salad',
      id: 2,
      ingredients: ['quinoa', 'raisins', 'cucumber', 'tomato']
    },
    {
      title: '5 Alarm Chili',
      id: 3,
      ingredients: [
        'ground beef',
        'kidney beans',
        'tomato paste',
        'chili powder'
      ]
    },
    {
      title: 'Peanut butter and jelly sandwich',
      id: 4,
      ingredients: ['smooth peanut butter', 'grape jelly', 'bread']
    }
  ]);
  return (
    <RecipesContext.Provider value={[recipes, setRecipes]}>
      {props.children}
    </RecipesContext.Provider>
  );
};
