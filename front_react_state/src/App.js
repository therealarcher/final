import "./styles/App.css";
import "./styles/recipe.css";
import "./styles/search.css";
import React, { Component, Fragment } from "react";
import uuidv4 from "uuid/v4";
import { Container, Row } from "react-bootstrap";
import { RecipeView } from "./components/Recipe";
import NavCard from "./NavCard";
import NewUser from "./components/NewUser";

//Information from this form is passed to the Rails API to run the recipe query
// by search term(s)
export class GetRecipes extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    query: "",
    currentQuery: ""
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  render() {
    return (
      <div>
        <div>
          <form
            style={{
              display: "flex",
              justifyContent: "center"
            }}
            className="search-container"
            onSubmit={event => {
              this.props.handleSubmit(event, this.state.query);
              this.setState({
                currentQuery: `Results for ${this.state.query}`
              });
              this.setState({ query: "" });
            }}
            type="text">
            <input
              className="search-heading"
              type="text"
              onChange={this.handleChange}
              value={this.state.query}
              placeholder={("Results for:", this.state.currentQuery)}
            />
            <br />
            <button className="search-label" type="submit">
              Get Recipes
            </button>
          </form>
        </div>
        <div>
          <Row>
            {this.props.recipes.map(recipe => {
              const { id } = recipe;
              return (
                <RecipeView saved={this.props.saved} key={id} {...recipe} />
              );
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
    this.handleSavedRecipe = this.handleSavedRecipe.bind(this);
  }
  state = {
    name: "",
    currentUser: {
      name: ""
    },
    recipes: [],
    ingredients: []
  };
  updateCurrentUser(name) {
    console.log("the", name);
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
  handleLogout = () => {
    this.setState({
      currentUser: {
        name: ""
      }
    });
  };
  handleSavedRecipe = () => {
    this.setState({
      isSaved: true
    });
  };
  handleSubmit = (event, name) => {
    event.preventDefault();

    fetch(`http://localhost:3001/api/recipes/search?term=${name}`, {
      mode: "cors"
    })
      .then(response => response.json())
      .then(myjson => {
        console.log(myjson);
        return myjson.map(recipe => {
          return {
            id: recipe.RecipeID,
            name: recipe.Title,
            image: recipe.PhotoUrl,
            category: recipe.Cuisine,
            isSaved: false
          };
        });
      })
      .then(results => this.setState({ recipes: results }))
      .catch(error => console.log("parsing failed", error));
  };
  render() {
    return (
      <Fragment>
        {this.state.currentUser.name ? (
          <Fragment>
            <h4>Logged in as : {this.state.currentUser.name}</h4>
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
        <NavCard
          key={uuidv4}
          currentUser={this.state.currentUser.name}
          recipes={this.state.recipes}
          HandleUpdate={this.HandleUpdate}
        />
        <Container>
          <Container className="gallery-view">
            <GetRecipes
              handleSubmit={this.handleSubmit}
              recipes={this.state.recipes}
              saved={this.handleSavedRecipe}
            />
          </Container>
        </Container>
      </Fragment>
    );
  }
}
