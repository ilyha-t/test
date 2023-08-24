import React, { Component } from 'react';
import { format, parseISO } from 'date-fns';

import { IMAGE_URL } from '../../config/config';
import GenreMovieList from '../GenreMovieTag/List/GenreMovieList';

import cl from './MovieItem.module.css';
import noImage from './assets/no-image.jpg';

export default class MovieItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
    };
  }

  handleImageError = (e) => {
    e.target.src = noImage;
  };

  matchGenreMovie = () => {
    let genres_name = new Array();
    for (let genre_id of this.props.movie.genre_ids) {
      for (let genre of this.props.genres) {
        if (genre_id === genre.id) {
          genres_name.push(genre.name);
          break;
        }
      }
    }

    this.setState({ genres: genres_name });
  };

  translateDate = (date) => {
    try {
      return format(parseISO(date), 'MMMM d, y');
    } catch (e) {
      return;
    }
  };

  componentDidMount() {
    this.matchGenreMovie();
  }

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
          <h1 className={cl.movie__title}>{this.props.movie.title}</h1>
          <p className={cl.movie__release_date}>{this.translateDate(this.props.movie.release_date)}</p>
          {this.state.genres.length > 0 ? <GenreMovieList genres={this.state.genres} /> : null}
          <p className={cl.movie__description}>{this.props.movie.overview}</p>
        </div>
      </div>
    );
  }
}
