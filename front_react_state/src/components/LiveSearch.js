import React, { Component } from 'react';

import { Typeahead } from 'react-typeahead';

export default class LiveSearch extends Component {
  render() {
    return (
      <div>
        <Typeahead
          options={[
            'apples',
            'oranges',
            'chicken breast',
            'chicken thighs',
            'quinoa'
          ]}
          maxVisible={2}
        />
      </div>
    );
  }
}
