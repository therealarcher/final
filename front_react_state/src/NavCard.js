import React, { Component, Fragment } from 'react';
import Card from 'react-bootstrap/Card';
import { Button, Nav, Form, FormControl, Row, Alert } from 'react-bootstrap';
import { RecipeView } from './components/Recipe';
import uuidv4 from 'uuid/v4';
import IngredientModal from './components/IngredientModal';
import Navbar from 'react-bootstrap/Navbar';
import './styles/Card.css';
import './styles/recipe.css';
import NewUser from './components/NewUser';
import Toggle from './utilities/Toggle';
import { Modal } from 'react-bootstrap';

class NavCard extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.alertVisible = this.alertVisible.bind(this);
    // this.hideAlert = this.hideAlert.bind(this);
    // this.onHide = this.onHide.bind(this);
    this.state = {
      name: this.currentUser,
      value: '',

      buttonText: false,
      savedIngredients: [],
      showIngredientModal: false,
      alertVisible: false
    };
  }
  // onHide() {
  //   this.setState({
  //     alertVisible: false
  //   });
  // }
  // hideAlert = () => {
  //   this.setState({ alertVisible: false });
  // };
  alertVisible = () => {
    this.setState({ alertVisible: true });
  };
  changeText = () => {
    this.setState({
      buttonText: !this.state.buttonText
    });
  };

  onHide = () => {
    this.setState({ showIngredientModal: false });
  };
  getSavedIngredients = (e) => {
    e.preventDefault(console.log('display pantry'));

    fetch(`/api/user_ingredients/${this.currentUser}`)
      .then((response) => response.json())
      .then((myjson) => {
        console.log(myjson);
        this.setState({ savedIngredients: myjson });
      })
      .then(() => {
        this.setState({ showIngredientModal: true });
      })
      .catch((error) => {
        console.log('error =>', error);
      });
  };

  toggleAlert = (e) => {
    console.log('clicked on close button');
    this.setState({ alertVisible: !this.state.alertVisible });
  };

  handleChange = (e) => {
    this.setState({ name: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    fetch('/api/user_ingredients', {
      method: 'POST',
      body: JSON.stringify({ name: this.state.name }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) {
          // this.alertVisible();
          this.setState({
            alertVisible: !this.state.alertVisible
          });
        }
      })
      .then(() => this.setState({ name: '' }))

      .catch((error) => console.error('Error:', error));
  };
  // Card key=... below could be an issue
  render() {
    return (
      <div>
        <Fragment>
          <Navbar className="Navbar" bg="light" expand="lg">
            {/* <Navbar.Brand href="#home">RecipEasy</Navbar.Brand> */}
            <h1 class="main-title">
              recip
              <font color="#42b25d">E</font>
              asy
            </h1>
            <Fragment>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />

              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto"></Nav>

                {this.props.currentUser ? (
                  <Fragment>
                    <h5 class="logout-text" font-family="Helvetica Neue">
                      Logged in as: {this.props.currentUser}
                    </h5>
                    <Button
                      variant="outline-danger"
                      onClick={this.props.handleLogout}
                    >
                      Logout
                    </Button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <NewUser
                      HandleUpdate={this.props.HandleUpdate}
                      updateCurrentUser={this.props.updateCurrentUser}
                      name={this.props.name}
                    />
                  </Fragment>
                )}
              </Navbar.Collapse>
            </Fragment>
          </Navbar>
        </Fragment>
        <div>
          <Card key={uuidv4} className="Card-container">
            <Card.Body>
              <Card.Title></Card.Title>
              {this.state.alertVisible ? (
                <div className="alert alert-success" role="alert">
                  Ingredient Added
                  <Button
                    style={{
                      marginLeft: '0.5rem'
                    }}
                    size="sm"
                    variant="secondary"
                    type="close"
                    onClick={this.toggleAlert}
                  >
                    x
                  </Button>
                </div>
              ) : (
                <p></p>
              )}

              <form class="pantry-textbox" onSubmit={this.handleSubmit}>
                <input
                  style={{
                    marginRight: '0.5rem'
                  }}
                  key={uuidv4}
                  placeholder="add item"
                  value={this.state.name}
                  type="text"
                  onChange={this.handleChange}
                />
                <Button
                  type="submit"
                  className="button-add-pantry"
                  size="sm"
                  variant="outline-success"
                >
                  +
                </Button>
              </form>
              <Fragment>
                <Button
                  className="button-display-pantry"
                  variant="outline-success"
                  onClick={this.getSavedIngredients}
                  size="sm"
                >
                  Display Pantry Items
                </Button>
              </Fragment>

              <Fragment>
                <IngredientModal
                  hide={() => this.setState({ showIngredientModal: false })}
                  show={this.state.showIngredientModal}
                  savedIngredients={this.state.savedIngredients}
                />
              </Fragment>
            </Card.Body>
          </Card>

          <Toggle
            render={({ on, toggle }) => (
              <div>
                {on && (
                  <div>
                    <Row style={{ justifyContent: 'center' }}>
                      {this.props.savedRecipes.map((savedRecipe) => {
                        return (
                          <Fragment>
                            <RecipeView
                              key={savedRecipe.id}
                              id={savedRecipe.id}
                              name={savedRecipe.name}
                              image={savedRecipe.image}
                            />
                          </Fragment>
                        );
                      })}
                    </Row>
                  </div>
                )}
                <Button
                  className="toggle-button"
                  variant="outline-dark"
                  size="sm"
                  onClick={() => {
                    toggle();
                    this.changeText();
                  }}
                >
                  {!this.state.buttonText
                    ? 'Show Saved Recipes'
                    : 'Hide Saved Recipes'}
                </Button>
              </div>
            )}
          />
        </div>
      </div>
    );
  }
}

export default NavCard;
