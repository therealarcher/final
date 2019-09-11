import React from 'react';
import { Modal } from 'react-bootstrap';

export default function IngredientModal({ show, hide, savedIngredients }) {
  return (
    <Modal className="recipeDetails" show={show} onHide={hide}>
      <button onClick={hide}>close</button>
      <Modal.Title>Pantry List</Modal.Title>
      {savedIngredients.map((savedIngredient) => {
        return <p>{savedIngredient.name}</p>;
      })}
    </Modal>
  );
}
