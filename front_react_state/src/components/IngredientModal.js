import React from "react";
import { ListGroup, Card } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "../styles/recipe.css";
import uuidv4 from "uuid/v4";

export default function IngredientModal({ show, hide, savedIngredients }) {
  return (
    <Modal
      //className="recipe-details"
      show={show}
      onHide={hide}
      size="sm"
      aria-labelledby="example-modal-sizes-title-sm">
      {/* <button onClick={hide}>close</button> */}
      <Modal.Header closeButton>
        <Modal.Title className="recipe-title">Pantry List</Modal.Title>
      </Modal.Header>
      {savedIngredients.map(savedIngredient => {
        return (
          <Card key={uuidv4()}>
            <ListGroup variant="flush">
              <ListGroup.Item>{savedIngredient.name}</ListGroup.Item>
            </ListGroup>
          </Card>
        );
      })}
    </Modal>
  );
}
