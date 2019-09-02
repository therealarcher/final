import React from 'react';
import RecipeList from './RecipeList';
import { RecipesProvider } from './RecipesContext';
import GetRecipes from './GetRecipes';

import './App.css';

function App() {
  return (
    <RecipesProvider>
      <div className="App">
        <GetRecipes />
        <RecipeList />
      </div>
    </RecipesProvider>
  );
}

export default App;
