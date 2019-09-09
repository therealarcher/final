import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';

class NavCard extends Component {
  constructor(props) {
    super(props);
  }
  onsubmit = (event) => {
    this.setState({
      ...this.state,
      user: { name: event.target.value }
    });
  };
  render() {
    return (
      <div>
        <Card className="Card-container">
          <Card.Body>
            <Card.Title>{this.name}</Card.Title>
            <Card.Subtitle></Card.Subtitle>
          </Card.Body>
          <Button type="submit" onClick={() => this.props.onSubmit}>
            Get Recipe Details
          </Button>
        </Card>
      </div>
    );
  }
}

export default NavCard;
