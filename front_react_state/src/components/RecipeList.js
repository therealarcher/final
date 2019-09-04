import React, { useState, useContext } from 'react';
import Recipe from './Recipe';

import { RecipesContext } from '../RecipesContext';
const RecipeList = () => {
  const [recipes, setRecipes] = useContext(RecipesContext);
  return (
    <div>
      {recipes.map((recipe) => (
        <Recipe recipe={recipe} key={recipe.RecipeID} />
      ))}
    </div>
  );
};
export default RecipeList;
