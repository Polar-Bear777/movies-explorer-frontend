// СТРАНИЦЫ РОУТОВ
export const apiMainConfig = {
    moviesData: 'https://api.bearpolar.nomoredomai.nomoreparties.sbs/movies',
    defaultURL: 'https://api.bearpolar.nomoredomai.nomoreparties.sbs',
    signUp: 'https://api.bearpolar.nomoredomai.nomoreparties.sbs/signup',
    signIn: 'https://api.bearpolar.nomoredomai.nomoreparties.sbs/signin',
    signOut: 'https://api.bearpolar.nomoredomai.nomoreparties.sbs/signout',
}

// СЕРВИС ДЛЯ ПОЛУЧЕНИЯ ФИЛЬМОВ
export const apiMovieConfig = {
    getMovies: 'https://api.nomoreparties.co/beatfilm-movies',
    defaultURL: 'https://api.nomoreparties.co',
}

export const regexEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,}/;