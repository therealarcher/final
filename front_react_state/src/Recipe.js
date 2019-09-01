import React from 'react';
const Recipe = (props) => {
  return (
    <div>
      <h3>{props.name}</h3>

      <div>
        <p>{props.ingredients}</p>
      </div>
    </div>
  );
};
export default Recipe;
