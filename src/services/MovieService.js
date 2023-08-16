export default class MovieService {
  _baseUrl = 'https://api.themoviedb.org/3';

  _api = 'api_key=7b2f23dedb7b5268c327389318709e9c';

  async getResource(url) {
    const result = await fetch(`${this._baseUrl}${url}`);
    if (!result.ok) {
      throw new Error(`Error ${url}, status: ${result.status}`);
    }
    const body = await result.json();
    return body;
  }

  getPopular = async (page) => {
    const result = await this.getResource(`/movie/popular?${this._api}&page=${page}`);
    return result;
  };

  getSearch = async (query, page) => {
    const result = await this.getResource(
      `/search/movie?${this._api}&language=en-US&query=${query}&page=${page}&include_adult=false`
    );
    return result;
  };

  getGenres = async () => {
    const result = await this.getResource(`/genre/movie/list?${this._api}`);
    return result;
  };

  createGuestSession = async () => {
    const result = await this.getResource(`/authentication/guest_session/new?${this._api}`);
    return result;
  };

  rateMovie = async (guestSessionId, filmId, rateValue) => {
    const rate = {
      value: rateValue,
    };
    const response = await fetch(
      `${this._baseUrl}/movie/${filmId}/rating?guest_session_id=${guestSessionId}&${this._api}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(rate),
      }
    );
    const result = await response.json();
    return result;
  };

  getRated = async (guestSessionId, page) => {
    const result = await this.getResource(
      `/guest_session/${guestSessionId}/rated/movies?${this._api}&language=en-US&sort_by=created_at.asc&page=${page}`
    );
    return result;
  };
}
