import { BASE_URL, API_KEY } from '../../config/config';

export default class HttpService {
  Auth = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  async getFilmsByQuery(searchMovie) {
    const response = await fetch(`${BASE_URL}/search/movie?query=${searchMovie}`, this.Auth);

    if (response.ok) {
      return await response.json();
    } else {
      throw Error('Error at network request!');
    }
  }

  async getGenresList() {
    const response = await fetch(`${BASE_URL}/genre/movie/list`, this.Auth);

    if (response.ok) {
      return await response.json();
    } else {
      throw Error('Error at network request!');
    }
  }
}
