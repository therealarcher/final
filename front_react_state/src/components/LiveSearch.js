import React, { Component } from 'react';
import '../styles/search.css';
export default class LiveSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: {},
      loading: false,
      message: ''
    };
  }

  render() {
    return (
      <div className="container">
        <h2 className="heading">Live Search</h2>
        <label className="search-label" htmlFor="search-input">
          <input
            type="text"
            value=""
            id="search-input"
            placeholder="search..."
          />
          <i className="fa fa-search" aria-hidden="true" />
        </label>
      </div>
    );
  }
}
