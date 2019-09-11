import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { RecipeView } from "./components/Recipe";
import "./styles/Card.css";

class NavCard extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getSavedRecipes = this.getSavedRecipes.bind(this);
  }
  state = {
    name: this.currentUser,
    value: "",
    savedRecipes: []
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
            <Button onClick={this.getSavedRecipes} type="submit">
              Show Saved Recipes
            </Button>
          </Card.Body>
          <Button type="submit"></Button>
        </Card>
        <div>Saved Recipes Here</div>
        {this.state.savedRecipes.map(savedRecipe => {
          console.log(savedRecipe);
          return (
            <RecipeView
              key={savedRecipe.id}
              id={savedRecipe.id}
              name={savedRecipe.name}
              image={savedRecipe.image}
            />
          );
        })}
      </div>
    );
  }
}

export default NavCard;
