import '../styles/App.css';
import '../styles/recipe.css';
import '../styles/search.css';
import React, { Fragment, useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
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
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ingredients</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ingredients.map((ingredient) => {
            return (
              <div key={ingredient.name}>
                <p>{ingredient.name}</p>
                <p>{ingredient.quantity}</p>
                <p>{ingredient.unit}</p>
                <p>{ingredient.notes}</p>
                <p>{ingredient.steps}</p>
              </div>
            );
          })}
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
      <Card className="recipe-card" bg="secondary" text="white" name={name}>
        <Card.Header className="flex-column" as="h5">
          {name}
        </Card.Header>
        <RecipeModal ingredients={ingredients} handleSubmit={handleSubmit} />

        <div className="image-wrapper">
          <Card.Img height={200} width={200} alt="Card image cap" src={image} />
        </div>
      </Card>
    </Fragment>
  );
}
