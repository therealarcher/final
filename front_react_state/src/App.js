import './styles/App.css';
import './styles/recipe.css';
import './styles/search.css';
import React, { Component, Fragment } from 'react';
import uuidv4 from 'uuid/v4';
import { Container, Row, Button } from 'react-bootstrap';
import { RecipeView } from './components/Recipe';
import NavCard from './NavCard';
import NewUser from './components/NewUser';

//Information from this form is passed to the Rails API to run the recipe query
// by search term(s)
export class GetRecipes extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    query: '',
    currentQuery: ''
  };

  handleChange = (event) => {
    this.setState({ query: event.target.value });
  };

  render() {
    return (
      <div>
        <form
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
          className="search-container"
          onSubmit={(event) => {
            this.props.handleSubmit(event, this.state.query);
            this.setState({
              currentQuery: `Results for ${this.state.query}`
            });
            this.setState({ query: '' });
          }}
          type="text"
        >
          <input
            className="search-heading"
            type="text"
            onChange={this.handleChange}
            value={this.state.query}
            placeholder={('Results for:', this.state.currentQuery)}
          />
          <br />
          <Button
            variant="outline-success"
            className="search-label"
            type="submit"
          >
            Get Recipes
          </Button>
        </form>

        <Row style={{ justifyContent: 'center' }}>
          {this.props.recipes.map((recipe) => {
            const { id } = recipe;
            return (
              <RecipeView
                getSavedRecipes={this.props.getSavedRecipes}
                saved={this.props.saved}
                key={id}
                {...recipe}
              />
            );
          })}
        </Row>
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
    this.handleSavedRecipe = this.handleSavedRecipe.bind(this);
    this.getSavedRecipes = this.getSavedRecipes.bind(this);
  }
  state = {
    name: '',
    currentUser: {
      name: ''
    },
    recipes: [],
    ingredients: [],
    savedRecipes: []
  };
  updateCurrentUser(name) {
    console.log('the', name);
    this.setState({
      currentUser: {
        name: name
      }
    });
  }
  getSavedRecipes = (e) => {
    console.log('this is our function');
    fetch(`/api/saved_recipes?`)
      .then((response) => response.json())
      .then((myjson) => {
        console.log(myjson);
        return myjson.map((savedRecipe) => {
          return {
            id: savedRecipe.recipe_id,
            name: savedRecipe.recipe.name,
            image: savedRecipe.recipe.image_url,
            category: savedRecipe.recipe.cuisine,
            isSaved: false
          };
        });
      })
      .then((results) => {
        console.log('results => ', results);
        this.setState({ savedRecipes: results });
      })

      .catch((error) => console.log('parsing failed', error));
  };
  HandleUpdate(name) {
    this.setState({
      name: name
    });
  }
  handleLogout() {
    this.setState({
      currentUser: {
        name: ''
      },
      savedRecipes: []
    });
  }
  handleSavedRecipe = () => {
    this.setState({
      isSaved: true
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
            category: recipe.Cuisine,
            isSaved: false
          };
        });
      })
      .then((results) => this.setState({ recipes: results }))
      .catch((error) => console.log('parsing failed', error));
  };
  render() {
    return (
      <div>
        <NavCard
          key={uuidv4}
          currentUser={this.state.currentUser.name}
          recipes={this.state.recipes}
          HandleUpdate={this.HandleUpdate}
          updateCurrentUser={this.updateCurrentUser}
          name={this.state.name}
          handleLogout={this.handleLogout}
          savedRecipes={this.state.savedRecipes}
        />
        <Container className="gallery-view">
          <GetRecipes
            handleSubmit={this.handleSubmit}
            recipes={this.state.recipes}
            saved={this.handleSavedRecipe}
            getSavedRecipes={this.getSavedRecipes}
          />
        </Container>
      </div>
    );
  }
}
