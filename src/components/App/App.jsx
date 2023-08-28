import React, { Component, Fragment } from 'react';
import { Pagination, Tabs } from 'antd';

import HttpService from '../../services/http';
import MovieList from '../MovieList/MovieList';
import ErrorRequestData from '../Exceptions/ErrorRequestData';
import DoubleLoader from '../Loaders/DoubleLoader/DoubleLoader';
import SearchInput from '../SearchInput/SearchInput';
import { ProviderApp } from '../Store';

import cl from './App.module.css';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      initial: true,
      movies: {},
      exception: false,
      genres: null,
      loading: false,
      searchValue: null,
      ratedFilm: [],
      httpClient: new HttpService(),
      rateFunc: this.rateFilm,
    };
  }

  componentDidMount() {
    new Promise((resolve) => {
      const response = this.state.httpClient.getGenresList();
      resolve(response);
    })
      .then((response) => {
        console.log(response);
        this.setState({ genres: response.genres, initial: false });
      })
      .catch(() => this.setState({ exception: true }));
  }

  debounceRequest = (f, delay) => {
    let timeout;
    return (...args) => {
      this.setState({ searchValue: args });
      clearInterval(timeout);
      timeout = setTimeout(() => f.apply(this, args), delay);
    };
  };

  searchFilm = (value, page = 1) => {
    this.setState({ loading: true });
    new Promise((resolve) => {
      const response = this.state.httpClient.getFilmsByQuery(value, page);
      resolve(response);
    })
      .then((response) => {
        console.log(response);
        this.setState({ movies: response, loading: false });
      })
      .catch(() => this.setState({ exception: true, loading: false }));
  };

  rateFilm = (rate, ratedMovie) => {
    for (let movie in this.state.ratedFilm) {
      if (movie.id === ratedMovie.id) {
        this.state.ratedFilm[movie] = rate;
      }
      return;
    }

    this.setState(() => {
      return { ratedFilm: [...this.state.ratedFilm, { ...ratedMovie, rate: rate }] };
    });
  };

  searchFilmDebounce = this.debounceRequest(this.searchFilm, 500);

  render() {
    const { movies, exception, initial, searchValue, ratedFilm } = this.state;

    const initialC = initial ? <DoubleLoader className={cl.film__loader} /> : null;
    const exceptionC = exception ? <ErrorRequestData /> : null;
    const searchC = <SearchInput onChange={(e) => this.searchFilmDebounce(e)} />;
    const moviesC = movies.results ? (
      <Fragment>
        <MovieList movies={movies.results} paginationPage={this.searchFilmDebounce} />
        <Pagination
          defaultCurrent={1}
          defaultPageSize={20}
          total={movies.total_results}
          showSizeChanger={false}
          onChange={(newPage) => this.searchFilmDebounce(searchValue[0], newPage)}
        />
      </Fragment>
    ) : (
      <div>Nothing found!</div>
    );

    const ratedC = ratedFilm.length ? (
      <Fragment>
        <MovieList movies={ratedFilm} paginationPage={this.searchFilmDebounce} />
        <Pagination
          defaultCurrent={1}
          defaultPageSize={20}
          total={movies.total_results}
          showSizeChanger={false}
          onChange={(newPage) => this.searchFilmDebounce(searchValue[0], newPage)}
        />
      </Fragment>
    ) : (
      <div>Пока нет оценнёных фильмов!</div>
    );

    const items = [
      {
        key: '1',
        label: 'Search',
        children: (
          <Fragment>
            {searchC}
            {moviesC}
          </Fragment>
        ),
      },
      {
        key: '2',
        label: 'Rated',
        children: <Fragment>{ratedC}</Fragment>,
      },
    ];

    return (
      <ProviderApp value={this.state}>
        <div>
          {initialC}
          {exceptionC}
          {!initialC && !exception ? <Tabs defaultActiveKey="1" items={items} /> : null}
        </div>
      </ProviderApp>
    );
  }
}
