import React from 'react';
import './recipe.css';
const Recipe = ({ recipe }) => {
  return (
    <div>
      <h3>{recipe.Title}</h3>

      <h4>List of Ingredients</h4>

      <table className="RecipeTable">
        <tbody>
          <tr>
            <th>Ingredient</th>
            <th>Unit Measure</th>
          </tr>
          {recipe.Ingredients.map((Ingredient) => (
            <tr>
              <td>{Ingredient.Name}</td>
              <td>
                {Ingredient.MetricQuantity}
                {Ingredient.MetricUnit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Recipe Description</h4>
      <div className="RecipeTable">
        <p>{recipe.Description}</p>
      </div>
    </div>
  );
};

export default Recipe;
