import React, { useState, useContext } from 'react';
import RecipesContext from './RecipesContext';

const GetRecipes = () => {
  const [title, setTitle] = useState('');
  const [recipes, setRecipes] = useState('');
  const updateTitle = (e) => {
    setTitle(e.target.value);
  };
  const addSearch = (e) => {
    e.preventDefault();
    setRecipes((prevRecipes) => [...prevRecipes, { title: title }]);
  };
  return (
    <form onSubmit={addSearch}>
      <input type="text" name="title" value={title} onChange={updateTitle} />
      <button>Submit</button>
    </form>
  );
};
export default GetRecipes;
