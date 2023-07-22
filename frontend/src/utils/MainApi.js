const configForApi = {
  url: 'https://api.bearpolar.nomoredomai.nomoreparties.sbs',

  headers: {
    'authorization': `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  }
};

const BASE_URL = 'https://api.nomoreparties.co'

class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getInitialMovie() {
    return fetch(`${this.url}/movie`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    }).then(this._checkResponse)
  }

  removeMovie(movieId) {
    return fetch(`${this.url}/movie/${movieId}`, {
      method: 'DELETE',
      headers: this.headers
    }).then(this._checkResponse)
  }

  addMovie(movie) {
    return fetch(`${this.url}/movie`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${BASE_URL}${movie.image.url}`,
        trailer: movie.trailerLink,
        thumbnail: `${BASE_URL}${movie.image.formats.thumbnail.url}`,
        movieId: `${movie.id}`,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN
      })
    }).then(this._checkResponse)
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }
}

const mainApi = new Api(configForApi);

export default mainApi;