import '../styles/App.css';
import '../styles/recipe.css';
import '../styles/search.css';
import React, { Fragment, useState } from 'react';
import { Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export function RecipeModal({ ingredients, handleSubmit }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (ingredients.length === 0) {
      handleSubmit();
    }
    setShow(true);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Show Recipe Details
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Recipe Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Title>Ingredients</Modal.Title>
          {ingredients.map((ingredient) => {
            return (
              <div key={ingredient.name}>
                <p>
                  {ingredient.qty} {ingredient.unit} - {ingredient.name}{' '}
                </p>
                <p>{ingredient.notes}</p>
              </div>
            );
          })}

          <ol>
            <Modal.Title>Step by step instructions</Modal.Title>
            {ingredients.length > 0 ? (
              ingredients[ingredients.length - 1].steps.map((step) => {
                return <li>{step}</li>;
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
    fetch(`http://localhost:3002/api/recipes/${id}`, {
      mode: 'cors'
    })
      .then((response) => response.json())
      .then((myjson) => {
        console.log(myjson);
        return myjson.map((recipeIngredients) => {
          return {
            name: recipeIngredients.name,
            qty: recipeIngredients.quantity,
            unit: recipeIngredients.unit,
            notes: recipeIngredients.notes,
            steps: recipeIngredients.steps
          };
        });
      })
      .then((results) => {
        setIngredients(results);
      })
      .catch((error) => console.log('parsing failed', error));
  };
  return (
    <Fragment key={id}>
      <Col>
        <Card
          style={{ width: '18rem' }}
          bg="secondary"
          text="white"
          name={name}
        >
          <Card.Header className="flex-column" as="h5">
            {name}
          </Card.Header>
          <RecipeModal ingredients={ingredients} handleSubmit={handleSubmit} />

          <Card.Img
            variant="top"
            height={120}
            width={120}
            alt="Card image cap"
            src={image}
          />
        </Card>
      </Col>
    </Fragment>
  );
}
