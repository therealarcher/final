import React, { useState } from 'react';

const GetRecipes = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const updateTitle = (e) => {
    setTitle(e.target.value);
  };
  const addSearch = (e) => {
    e.preventDefault();
    setIngredients((prevIngredients) => [...prevIngredients, { title: title }]);
  };
  return (
    <form onSubmit={addSearch}>
      <input type="text" name="title" value={title} onChange={updateTitle} />
      <button>Submit</button>
    </form>
  );
};
export default GetRecipes;
