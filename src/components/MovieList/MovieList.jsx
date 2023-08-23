import React, { Component } from 'react';

import MovieItem from '../MovieItem/MovieItem';

import cl from './MovieList.module.css';

export default class MovieList extends Component {
  render() {
    return (
      <div className={cl.movie__list}>
        {this.props.movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} genres={this.props.genres} />
        ))}
      </div>
    );
  }
}
