import './styles/App.css';
import './styles/recipe.css';
import './styles/search.css';
import React, { Component, Fragment } from 'react';

import { Container, Row } from 'react-bootstrap';
import { RecipeView } from './components/Recipe';
import NavCard from './NavCard';
import NewUser from './components/NewUser';
export class GetRecipes extends Component {
  constructor(props) {
    super();

    this.state = {
      recipes: [],
      query: ''
    };
  }
  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:3001/api/recipes/search?term=${this.state.query}`, {
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
        <div>
          <form
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
            className="search-container"
            onSubmit={(event) =>
              this.props.handleSubmit(event, this.state.query)
            }
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
        </div>
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
  constructor() {
    super();
    this.HandleUpdate = this.HandleUpdate.bind(this);
  }
  state = {
    name: '',

    recipes: [],
    ingredients: []
  };

  HandleUpdate(e) {
    e.preventDefault();
    this.setState({
      name: e.target.value
    });
  }
  handleSubmit = (event, name) => {
    event.preventDefault();

    fetch(`http://localhost:3001/api/recipes/search?term=${name}`, {
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
      <Fragment>
        <h1>user:{this.state.name}</h1>
        <div>
          <NewUser name={this.state.name} HandleUpdate={this.HandleUpdate} />
          <NavCard />
        </div>

        <Container>
          <Container>
            <GetRecipes
              recipes={this.state.recipes}
              handleSubmit={this.handleSubmit}
            />
          </Container>
        </Container>
      </Fragment>
    );
  }
}
