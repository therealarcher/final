import React, { Component } from 'react';

// the user form is now tracking state at the application level.
// the goal is to now have a way to track the recipe the user clicks on
// the ingredients they have in their array of ingredients
// load the user_ingredients and user_recipes upon sign in (fetch request to the back end)
export default class newUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    this.handleChange = (e) => {
      console.log(e.target.value);
    };
    this.handleSubmit = (event) => {
      event.preventDefault();

      fetch(`http://localhost:3001/api/users/new?user_id=${this.props.name}`, {
        mode: 'cors'
      }).then(this.setState({ name: '' }));
    };
  }

  render() {
    return (
      <div>
        <form type="text">
          <input
            id="userInput"
            type="text"
            onChange={this.props.HandleUpdate}
          />
          <button onClick={this.handleSubmit} type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
