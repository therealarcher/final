import React from 'react';
import Portal from '../Portal';

export const OpenPortal = () => {
  return (
    <Portal>
      {ingredients.map((ingredient) => {
        return (
          <div>
            <p>{ingredient.name}</p>
            <p>{ingredient.quantity}</p>
            <p>{ingredient.unit}</p>
            <p>{ingredient.notes}</p>
            <p>{ingredient.steps}</p>
          </div>
        );
      })}
    </Portal>
  );
};
