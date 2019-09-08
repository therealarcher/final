import './styles/App.css';
import './styles/recipe.css';
import './styles/search.css';
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { RecipeView } from './components/Recipe';

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
      .then((results) => this.setState({ recipes: results }))
      .catch((error) => console.log('parsing failed', error));
  };

  render() {
    return (
      <div>
        <form
          className="search-container"
          onSubmit={(event) => this.props.handleSubmit(event, this.state.query)}
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
          <Row>
            {this.props.recipes.map((recipe) => {
              const { id } = recipe;
              return <RecipeView key={id} {...recipe} />;
            })}
          </Row>
        </div>
      </div>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      ingredients: []
    };
  }
  handleSubmit = (event, name) => {
    event.preventDefault();

    fetch(`http://localhost:3002/api?term=${name}`, {
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
            category: recipe.Cuisine
          };
        });
      })
      .then((results) => this.setState({ recipes: results }))
      .catch((error) => console.log('parsing failed', error));
  };
  render() {
    return (
      <Container>
        <GetRecipes
          recipes={this.state.recipes}
          handleSubmit={this.handleSubmit}
        />
      </Container>
    );
  }
}
