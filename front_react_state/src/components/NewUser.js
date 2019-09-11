import React, { Component } from 'react';

// the user form is now tracking state at the application level.
// the goal is to now have a way to track the recipe the user clicks on
// the ingredients they have in their array of ingredients
// load the user_ingredients and user_recipes upon sign in (fetch request to the back end)
export default class newUser extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
    console.log(this.props);
    event.preventDefault();

    fetch(`http://localhost:3001/api/users/new?user_id=${this.props.name}`, {
      mode: 'cors'
    })
      .then((response) => response.json())
      .then((myjson) => {
        console.log(myjson);
      })
      .then(() => this.props.updateCurrentUser(this.props.name))
      .then(() => this.props.HandleUpdate(''))

      .catch((error) => console.log('error =>', error));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            id="userInput"
            type="text"
            onChange={(e) => this.props.HandleUpdate(e.target.value)}
            value={this.props.name}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
