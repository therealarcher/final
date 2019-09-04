import React from 'react';
import RecipeList from './components/RecipeList';
import { RecipesProvider } from './RecipesContext';
import GetRecipes from './components/GetRecipes';
import './styles/App.css';
import { GetIngredients } from './components/GetIngredients';
import LiveSearch from './components/LiveSearch';
function App() {
  return (
    <RecipesProvider>
      <div className="App">
        <GetRecipes />
        <RecipeList />
        <GetIngredients />
        <LiveSearch />
      </div>
    </RecipesProvider>
  );
}

export default App;
