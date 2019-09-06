import '../styles/App.css';
import '../styles/recipe.css';
import '../styles/search.css';
import React, { Component, Fragment } from 'react';
import { Card, Nav, Container } from 'react-bootstrap';
import { Grid, Row, Col } from 'react-bootstrap';
import { GetRecipeDetails } from '../App';
export const RecipeView = ({ id, name, image }) => {
  return (
    <Fragment key={id}>
      <Card className="recipe-card" bg="secondary" text="white" name={name}>
        <Card.Header className="flex-column" as="h5">
          {name}
        </Card.Header>
        <Nav>
          <Nav.Item>
            <Nav.Link eventKey="first">Overview</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="second">Ingredients</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="third">Steps</Nav.Link>
          </Nav.Item>
        </Nav>
        <div className="image-wrapper">
          <Card.Img
            height={200}
            width={200}
            alt="Card image cap"
            variant="top"
            src={image}
          />
        </div>
      </Card>
      <GetRecipeDetails id={id} />
    </Fragment>
  );
};
