import './styles/App.css';
import React, { Component } from 'react';

//  when a recipe is selected, a query will be made to the API to get the recipe details for the
// selected recipe
class GetRecipeDetails extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = () => {
    console.log('line 14', this.props);
    fetch(`http://localhost:3002/api/recipes/?id=${this.props.id}`, {
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

class GetRecipes extends Component {
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
            name: recipe.Title
          };
        });
      })
      .then((results) => this.setState({ recipes: results, isLoading: false }))
      .catch((error) => console.log('parsing failed', error));
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} type="text">
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.query}
          />
          <button type="submit">Submit</button>
        </form>

        {this.state.recipes.map((recipe) => {
          const { id, name } = recipe;
          return (
            <div key={id} name={name}>
              <p>
                {id}
                <br />
                {name}
              </p>
              <GetRecipeDetails key={id} id={id} />
            </div>
          );
        })}
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
      <div>
        <GetRecipes />
      </div>
    );
  }
}
