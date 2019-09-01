import React, { useState, useContext } from 'react';
import Recipe from './Recipe';
// import Axios from 'axios';
import { RecipesProvider, RecipesContext } from './RecipesContext';
const RecipeList = () => {
  const [recipes, setRecipes] = useContext(RecipesContext);
  return (
    <div>
      {recipes.map((recipe) => (
        <Recipe
          name={recipe.title}
          ingredients={recipe.ingredients}
          key={recipe.id}
        />
      ))}
    </div>
  );
};
export default RecipeList;
