import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { uuidv4 } from 'uuid/v4';
import axios from 'axios';

export default function Listen() {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const fetchSavedRecipes = async () => {
    const response = await axios(`/api/saved_recipes/${2049690}`);
    setSavedRecipes(response.data);
  };

  useEffect(() => {
    fetchSavedRecipes(savedRecipes);
  }, [savedRecipes]);

  return (
    <Container>
      {savedRecipes.map((recipe) => (
        <ul key={uuidv4}>
          <li>
            <strong>{recipe.name}</strong>
          </li>
        </ul>
      ))}
    </Container>
  );
}
