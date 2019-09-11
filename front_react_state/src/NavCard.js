import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import "./styles/Card.css";

class NavCard extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    name: "",
    value: ""
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();

    fetch("/api/user_ingredients", {
      method: "POST",
      body: JSON.stringify({ name: this.state.name }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) alert("ingredient saved");
      })
      .then(() => this.setState({ name: "" }))

      .catch(error => console.error("Error:", error));
  };

  render() {
    return (
      <div>
        <Card className="Card-container">
          <Card.Body>
            <Card.Title>RecipEasy</Card.Title>
            <Button>Add items to pantry</Button>
            <form onSubmit={this.handleSubmit}>
              <input
                value={this.state.name}
                type="text"
                onChange={this.handleChange}
              />
            </form>
          </Card.Body>
          <Button type="submit"></Button>
        </Card>
      </div>
    );
  }
}

export default NavCard;
