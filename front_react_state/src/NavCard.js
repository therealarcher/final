import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import {
  Button,
  Nav,
  Form,
  FormControl,
  Row,
  Container
} from "react-bootstrap";
import { RecipeView } from "./components/Recipe";
import uuidv4 from "uuid/v4";
import IngredientModal from "./components/IngredientModal";
import Navbar from "react-bootstrap/Navbar";
import "./styles/Card.css";

class NavCard extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getSavedRecipes = this.getSavedRecipes.bind(this);
    this.onHide = this.onHide.bind(this);

    this.state = {
      name: this.currentUser,
      value: "",
      savedRecipes: [],
      savedIngredients: [],
      showIngredientModal: false
    };
  }
  onHide = () => {
    this.setState({ showIngredientModal: false });
  };
  getSavedIngredients = e => {
    e.preventDefault(console.log("display pantry"));

    fetch(`/api/user_ingredients/${this.currentUser}`)
      .then(response => response.json())
      .then(myjson => {
        console.log(myjson);
        this.setState({ savedIngredients: myjson });
      })
      .then(() => {
        this.setState({ showIngredientModal: true });
      })
      .catch(error => {
        console.log("error =>", error);
      });
  };
  getSavedRecipes = e => {
    e.preventDefault(console.log("default devent prevented"));
    fetch(`/api/saved_recipes?`)
      .then(response => response.json())
      .then(myjson => {
        console.log(myjson);
        return myjson.map(savedRecipe => {
          return {
            id: savedRecipe.recipe_id,
            name: savedRecipe.recipe.name,
            image: savedRecipe.recipe.image_url,
            category: savedRecipe.recipe.cuisine,
            isSaved: false
          };
        });
      })
      .then(results => {
        this.setState({ savedRecipes: results });
      })

      .catch(error => console.log("parsing failed", error));
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
  // Card key=... below could be an issue
  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg">
          {/* <Navbar.Brand href="#home">RecipEasy</Navbar.Brand> */}
          <h1 class="main-title">recipEasy</h1>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Form inline>
              <FormControl type="text" placeholder="name" className="mr-sm-2" />
              <Button variant="outline-success">Login</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>

        <Card key={uuidv4} className="Card-container">
          <Card.Body>
            <Card.Title></Card.Title>
            <Button>Add items to pantry</Button>
            <form onSubmit={this.handleSubmit}>
              <input
                key={uuidv4}
                value={this.state.name}
                type="text"
                onChange={this.handleChange}
              />
            </form>
            <Button onClick={this.getSavedIngredients}>Display Pantry</Button>
            <Button onClick={this.getSavedRecipes} type="submit">
              Show Saved Recipes
            </Button>

            <IngredientModal
              hide={() => this.setState({ showIngredientModal: false })}
              show={this.state.showIngredientModal}
              savedIngredients={this.state.savedIngredients}
            />
          </Card.Body>
          <Button type="submit"></Button>
        </Card>
        <Container>
          <Row style={{ justifyContent: "center" }}>
            {this.state.savedRecipes.map(savedRecipe => {
              return (
                <RecipeView
                  key={savedRecipe.id}
                  id={savedRecipe.id}
                  name={savedRecipe.name}
                  image={savedRecipe.image}
                />
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }
}

export default NavCard;
