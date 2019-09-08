import React, { Component } from 'react';

export default class newUser extends Component {
  state = {
    currentUser: ''
  };

  handleChange = (event) => {
    this.setState({ currentUser: event.target.value });
  };
  handleSubmit = (event, userName) => {
    event.preventDefault(console.log('event default prevented'));
    fetch(
      `http://localhost:3001/api/users/new?user_id=${this.state.currentUser}`,
      {
        mode: 'cors'
      }
    );
  };
  render() {
    return (
      <div>
        <form
          type="text"
          onSubmit={(event) => this.handleSubmit(event, this.state.currentUser)}
        >
          <input
            type="text"
            onChange={this.handleChange}
            value={this.state.currentUser}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}
