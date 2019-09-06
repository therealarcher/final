import './styles/App.css';
import './styles/recipe.css';
import './styles/search.css';
import React, { Component, Fragment } from 'react';
import { Card, Nav, Container } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { RecipeView } from './components/Recipe';

//  when a recipe is selected, a query will be made to the API to get the recipe details for the
// selected recipe

export class GetRecipeDetails extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = () => {
    console.log('line 14', this.props);
    fetch(`http://localhost:3002/api/recipes/${this.props.id}`, {
      mode: 'cors'
    })
      .then((response) => response.json())
      .then((myjson) => {
        console.log(myjson);
        return myjson.map((recipe) => {
          return {
            id: recipe.RecipeID,
            name: recipe.Title,
            steps: recipe.Steps
          };
        });
      })
      .then((results) => this.setState({ recipes: results, isLoading: false }))
      .catch((error) => console.log('parsing failed', error));
  };

  render() {
    return (
      <div>
        <button onClick={() => this.handleSubmit()}>Get Details</button>
      </div>
    );
  }
}

export class GetRecipes extends Component {
  state = {
    recipes: [],
    query: ''
  };
  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:3002/api?term=${this.state.query}`, {
      mode: 'cors'
    })
      .then((response) => response.json())
      .then((myjson) => {
        console.log(myjson);
        return myjson.map((recipe) => {
          return {
            id: recipe.RecipeID,
            name: recipe.Title,
            image: recipe.PhotoUrl,
            category: recipe.cuisine
          };
        });
      })
      .then((results) => this.setState({ recipes: results, isLoading: false }))
      .catch((error) => console.log('parsing failed', error));
  };

  render() {
    return (
      <div>
        <form
          className="search-container"
          onSubmit={this.handleSubmit}
          type="text"
        >
          <input
            className="search-heading"
            type="text"
            onChange={this.handleChange}
            value={this.state.query}
          />
          <br />
          <button className="search-label" type="submit">
            Get Recipes
          </button>
        </form>

        <div>
          <Container as="div" className="recipe-container">
            {this.state.recipes.map((recipe) => {
              const { id } = recipe;
              return <RecipeView key={id} {...recipe} />;
            })}
          </Container>
        </div>
      </div>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  render() {
    return (
      <div className="App">
        <GetRecipes />
      </div>
    );
  }
}
