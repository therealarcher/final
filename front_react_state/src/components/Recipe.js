import "../styles/App.css";
import "../styles/Card.css";
import "../styles/recipe.css";
import "../styles/search.css";
import "../styles/modal.css";
import React, { Fragment, useState } from "react";
import { Card, Col, Row, Spinner, ListGroup, Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import uuidv4 from "uuid/v4";

export function RecipeModal({
  ingredients,
  handleSubmit,
  id,
  neededIngedients,
  getSavedRecipes
}) {
  const [show, setShow] = useState(false);
  const [saved, setSaved] = useState(false);
  const savedRecipe = () => {
    return saved ? (
      <Button variant="outline-success" size="lg">
        Saved
      </Button>
    ) : (
      <Button variant="outline-primary" size="lg" onClick={() => likeRecipe()}>
        Save Recipe
      </Button>
    );
  };

  const likeRecipe = () => {
    fetch("/api/saved_recipes", {
      // params: { saved_recipe: id },
      method: "POST",
      body: JSON.stringify({ recipe_id: id }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          setSaved(true);
          getSavedRecipes();
        }
      })

      .catch(error => console.error("Error:", error));

    // console.log('this is the id =>', id);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (ingredients.length === 0) {
      handleSubmit();
    }
    setShow(true);
  };

  return (
    <div>
      <Button
        className="font-weight-bold"
        variant="outline-success"
        size="sm"
        block
        onClick={handleShow}>
        Show Recipe Details
      </Button>

      <Modal
        // className="recipeDetails"
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
        show={show}
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="recipe-title">Recipe Details</Modal.Title>
        </Modal.Header>
        {savedRecipe()}
        <Modal.Body>
          <Modal.Title>Ingredients</Modal.Title>

          {ingredients.map(ingredient => {
            return (
              <Card key={uuidv4()}>
                <ListGroup variant="flush">
                  <ListGroup.Item key={ingredient.name}>
                    {ingredient.qty} {ingredient.unit} - {ingredient.name}{" "}
                  </ListGroup.Item>
                  <ListGroup.Item style={{ backgroundColor: "#f0f1f2" }}>
                    {ingredient.notes}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            );
          })}
          <Modal.Title>User Needed Ingredients</Modal.Title>
          <Modal.Body>
            {neededIngedients.map(neededIngredient => {
              return (
                <li key={neededIngredient.name}>{neededIngredient.name}</li>
              );
            })}
          </Modal.Body>
          <ol>
            <Modal.Title>Step by step instructions</Modal.Title>
            <br />
            {ingredients.length > 0 ? (
              ingredients[ingredients.length - 1].steps.map(step => {
                return <li key={uuidv4()}>{step}</li>;
              })
            ) : (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export function RecipeView({ id, name, image, isSaved, getSavedRecipes }) {
  const [ingredients, setIngredients] = useState([]);
  const [neededIngredients, setNeededIngredients] = useState([]);
  const getNeededIngredients = () => {
    fetch(`http://localhost:3001/api/user_ingredients/?id=${id}`, {
      mode: "cors"
    })
      .then(response => response.json())
      .then(myjson => {
        console.log({ id });
        console.log(myjson);
        return myjson.map(results => {
          return {
            name: results
          };
        });
      })
      .then(results => {
        setNeededIngredients(results);
      })
      .catch(error => console.log("parsing failed", error));
  };
  const handleSubmit = () => {
    fetch(`http://localhost:3001/api/recipes/${id}`, {
      mode: "cors"
    })
      .then(response => response.json())
      .then(myjson => {
        console.log({ id });
        console.log(myjson);
        return myjson.map(recipeIngredients => {
          return {
            name: recipeIngredients.name,
            qty: recipeIngredients.quantity,
            unit: recipeIngredients.unit,
            notes: recipeIngredients.notes,
            steps: recipeIngredients.steps
          };
        });
      })
      .then(results => {
        setIngredients(results);
      })
      .then(() => getNeededIngredients())
      .catch(error => console.log("parsing failed", error));
  };
  return (
    <Fragment>
      <Col style={{ flexGrow: 0 }}>
        <Card
          style={{
            width: "18rem",
            margin: "16px"
            // boxShadow: "5px 10px #888888"
          }}
          bg="light"
          text="black"
          name={name}>
          <Card.Header className="flex-row" as="h6">
            {name}
          </Card.Header>
          <RecipeModal
            id={id}
            ingredients={ingredients}
            handleSubmit={handleSubmit}
            neededIngedients={neededIngredients}
            isSaved={isSaved}
            getSavedRecipes={getSavedRecipes}
          />

          <Card.Img
            // class="cardImage"
            alt="Card image cap"
            src={image}
            height={240}
          />
        </Card>
      </Col>
    </Fragment>
  );
}
