import './styles/App.css';
import './styles/recipe.css';
import './styles/search.css';
import React, { Component, Fragment } from 'react';

import { Container, Row } from 'react-bootstrap';
import { RecipeView } from './components/Recipe';
import NavCard from './NavCard';
import NewUser from './components/NewUser';

//Information from this form is passed to the Rails API to run the recipe query
// by search term(s)
export class GetRecipes extends Component {
  constructor(props) {
    super();

    this.state = {
      currentUser: '',
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
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  state = {
    name: '',
    currentUser: {
      name: ''
    },
    recipes: [],
    ingredients: []
  };
  updateCurrentUser(name) {
    console.log('the', name);
    this.setState({
      currentUser: {
        name: name
      }
    });
  }

  HandleUpdate(name) {
    this.setState({
      name: name
    });
  }
  handleLogout = (name) => {
    this.setState({
      currentUser: {
        name: ''
      }
    });
  };
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
        {this.state.currentUser.name ? (
          <Fragment>
            <h1>Logged in as : {this.state.currentUser.name}</h1>
            <button onClick={this.handleLogout}>Logout</button>
          </Fragment>
        ) : (
          <div>
            <NewUser
              currentUser={this.state.currentUser.name}
              updateCurrentUser={this.updateCurrentUser}
              name={this.state.name}
              HandleUpdate={this.HandleUpdate}
            />
          </div>
        )}
        <NavCard />

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
