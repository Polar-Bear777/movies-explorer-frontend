import { mainApiConfig } from './configs';
import { checkResponse } from './Auth';

// ВХОД
export const signIn = ({ password, email }) => {
    return fetch(mainApiConfig.signIn, {
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
    return fetch(mainApiConfig.signUp, {
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
    return fetch(mainApiConfig.signOut, {
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
    return fetch(`${mainApiConfig.moviesData}/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    })
        .then(checkResponse);
}

// СОХРАНИТЬ ФИЛЬМ
export const saveMovie = (movie) => {
    return fetch(mainApiConfig.moviesData, {
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
    return fetch(mainApiConfig.userData, {
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
    return fetch(mainApiConfig.moviesData, {
        method: 'GET',
        credentials: 'include',
    })
        .then(checkResponse);
}