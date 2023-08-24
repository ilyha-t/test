import React, { Component } from 'react';

// import { IMAGE_URL } from '../../config/config';
import GenreMovieList from '../GenreMovieTag/List/GenreMovieList';

import cl from './MovieItem.module.css';

export default class MovieItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genres: [],
    };
  }

  // handleImageError = (e) => {
  //   e.target.src = 'https://image.tmdb.org/t/p/original/dJ52jV7HlJ9hB8kdBOnj01DllBA.jpg';
  // };

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

  componentDidMount() {
    this.matchGenreMovie();
  }

  render() {
    return (
      <div className={cl.movie}>
        {/*<img*/}
        {/*  src={`${IMAGE_URL}` + this.props.movie.backdrop_path}*/}
        {/*  alt="Movie Poster"*/}
        {/*  onError={this.handleImageError}*/}
        {/*  className={cl.movie__image}*/}
        {/*/>*/}
        <div className={cl.movie__info}>
          <h2>{this.props.movie.title}</h2>
          <span>{this.props.movie.release_date}</span>
          {this.state.genres.length > 0 ? <GenreMovieList genres={this.state.genres} /> : null}
          <p>{this.props.movie.overview}</p>
        </div>
      </div>
    );
  }
}
