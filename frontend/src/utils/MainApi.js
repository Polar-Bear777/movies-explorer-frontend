import { apiMainConfig } from './configs';
import { checkResponse } from './Auth';

const BASE_URL = 'https://api.nomoreparties.co'

// ВХОД
export const signIn = ({ password, email }) => {
    return fetch(apiMainConfig.signIn, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password,
            email
        })
    })
        .then(checkResponse);
}

// РЕГИСТРАЦИЯ
export const signUp = ({ name, password, email }) => {
    return fetch(apiMainConfig.signUp, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password,
            email,
            name
        })
    })
        .then(checkResponse);
}

// ВЫХОД
export const signOut = () => {
    return fetch(apiMainConfig.signOut, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(checkResponse);
}

// УДАЛИТЬ ФИЛЬМ
export const deleteMovie = (id) => {
    return fetch(`${apiMainConfig.moviesData}/${id}`, {
        method: 'DELETE',
    })
        .then(checkResponse);
}

// СОХРАНИТЬ ФИЛЬМ
export const saveMovie = (movie) => {
    return fetch(apiMainConfig.moviesData, {
        method: 'POST',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('jwt')}`,
            "Content-Type": "application/json",
        },
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
            // movieId: movie.id,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN
          })
    })
        .then(checkResponse);
}

// ПОЛУЧИТЬ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
export const setUserData = ({ name, email }) => {
    return fetch(apiMainConfig.userData, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email
        })
    })
        .then(checkResponse);
}

// ПОЛУЧИТЬ ДАННЫЕ ФИЛЬМОВ ПОЛЬЗОВАТЕЛЯ
export const getUserMovies = () => {
    return fetch(apiMainConfig.moviesData, {
        method: 'GET',
    })
        .then(checkResponse);
}