import { apiMainConfig } from './configs';
import { checkResponse } from './Auth';

// ВХОД
export const signIn = ({ password, email }) => {
    return fetch(apiMainConfig.signIn, {
        method: 'POST',
        credentials: 'include',
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
        credentials: 'include',
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
        credentials: 'include',
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
        credentials: 'include'
    })
        .then(checkResponse);
}

// СОХРАНИТЬ ФИЛЬМ
export const saveMovie = (movie) => {
    return fetch(apiMainConfig.moviesData, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...movie }),
    })
        .then(checkResponse);
}

// ПОЛУЧИТЬ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
export const setUserData = ({ name, email }) => {
    return fetch(apiMainConfig.userData, {
        method: 'PATCH',
        credentials: 'include',
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
        credentials: 'include',
    })
        .then(checkResponse);
}

module.exports = {
    signIn,
    signUp,
    signOut,
    deleteMovie,
    saveMovie,
    setUserData,
    getUserMovies,
  };