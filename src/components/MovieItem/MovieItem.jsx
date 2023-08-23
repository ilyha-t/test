import React, { Component } from 'react';

import { IMAGE_URL } from '../../config/config';

import cl from './MovieItem.module.css';

export default class MovieItem extends Component {
  showGenre = () => {

  };

  handleImageError = (e) => {
    e.target.src = 'https://image.tmdb.org/t/p/original/dJ52jV7HlJ9hB8kdBOnj01DllBA.jpg';
  };

  render() {
    return (
      <div className={cl.movie}>
        <img
          src={`${IMAGE_URL}` + this.props.movie.backdrop_path}
          alt="Movie Poster"
          onError={this.handleImageError}
          className={cl.movie__image}
        />
        <div className={cl.movie__info}>
          <h2>{this.props.movie.title}</h2>
          <span>{this.props.movie.release_date}</span>
          <p>{this.props.movie.genre_ids}</p>
          <p>{this.props.movie.overview}</p>
        </div>
      </div>
    );
  }
}
