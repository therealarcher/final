import React from 'react';
import '../styles/recipe.css';
import Toggle from '../utilities/Toggle';

const Recipe = ({ recipe }) => {
  return (
    <div>
      <h3>{recipe.Title}</h3>
      <div>
        <Toggle>
          {({ on, toggle }) => (
            <div>
              {on && (
                <table className="RecipeTable">
                  <tbody>
                    <tr>
                      <th>Ingredient</th>
                      <th>Unit Measure</th>
                    </tr>
                    {recipe.Ingredients.map((Ingredient) => (
                      <tr key={Ingredient.IngredientId}>
                        <td>{Ingredient.Name}</td>
                        <td>
                          {Ingredient.MetricQuantity}
                          {Ingredient.MetricUnit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <button onClick={toggle}>List of Ingredients</button>
            </div>
          )}
        </Toggle>
        <div>
          <Toggle>
            {({ on, toggle }) => (
              <div>
                {on && <p>{recipe.Description}</p>}
                <button onClick={toggle}>Recipe Description</button>
              </div>
            )}
          </Toggle>
        </div>
      </div>
      <Toggle>
        {({ on, toggle }) => (
          <div>
            {on && (
              <div>
                {recipe.Steps.map((Step) => (
                  <p>{Step.Text}</p>
                ))}
              </div>
            )}
            <button onClick={toggle}>Display Recipe Steps</button>
          </div>
        )}
      </Toggle>
    </div>
  );
};

export default Recipe;
