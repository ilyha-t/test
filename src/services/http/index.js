import { BASE_URL, API_KEY } from '../../config/config';

export default class HttpService {
  Auth = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  async getFilmsByQuery(searchMovie) {
    let response = await fetch(`${BASE_URL}/movie?query=${searchMovie}`, this.Auth);
    return await response.json();
  }
}
