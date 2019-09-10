import "../styles/App.css";
import "../styles/recipe.css";
import "../styles/search.css";
import "../styles/modal.css";
import React, { Fragment, useState } from "react";
import { Card, Col, Spinner, ListGroup, Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import uuidv4 from "uuid/v4";
export function RecipeModal({ ingredients, handleSubmit, id }) {
  const [show, setShow] = useState(false);
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
        if (res.ok) alert("Recipe Saved");
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
        className="showRecipeDetails"
        variant="primary"
        onClick={handleShow}>
        Show Recipe Details
      </Button>

      <Modal
        className="recipeDetails"
        size="lg"
        // show={lgShow}
        // onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        show={show}
        onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Recipe Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Title>Ingredients</Modal.Title>
          <Button onClick={() => likeRecipe()}>Save Recipe</Button>
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
export function RecipeView({ id, name, image }) {
  const [ingredients, setIngredients] = useState([]);

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
      .catch(error => console.log("parsing failed", error));
  };
  return (
    <Fragment>
      <Col>
        <Card
          style={{
            width: "18rem",
            margin: "16px",
            boxShadow: "5px 10px #888888"
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
          />

          <Card.Img alt="Card image cap" src={image} height={240} />
        </Card>
      </Col>
    </Fragment>
  );
}
