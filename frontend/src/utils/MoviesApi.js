const configForApi = {
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json'
  }
};

class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getInitialMovies() {
    return fetch(this.url, {
      headers: this.headers
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const movieApi = new Api(configForApi);

export const getInitialMovies = movieApi.getInitialMovies.bind(movieApi);