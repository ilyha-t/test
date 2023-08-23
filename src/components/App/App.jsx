import React, { Component } from 'react';

import HttpService from '../../services/http';
import MovieList from '../MovieList/MovieList';
import ErrorRequestData from '../Exceptions/ErrorRequestData';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      exception: false,
      genres: null,
    };
  }

  httpClient = new HttpService();

  componentDidMount() {
    new Promise((resolve) => {
      const response = this.httpClient.getGenresList();
      resolve(response);
    })
      .then((response) => {
        console.log(response);
        this.setState({ genres: response.genres });
      })
      .catch(() => this.setState({ exception: true }));

    new Promise((resolve) => {
      const response = this.httpClient.getFilmsByQuery('return');
      resolve(response);
    })
      .then((response) => {
        console.log(response);
        this.setState({ movies: response.results });
      })
      .catch(() => this.setState({ exception: true }));
  }

  render() {
    return (
      <div>
        {this.state.exception ? <ErrorRequestData /> : null}
        {this.state.movies ? <MovieList movies={this.state.movies} genres={this.state.genres} /> : null}
      </div>
    );
  }
}
