import { apiMovieConfig } from './configs';
import { checkResponse } from './Auth';

// ПОЛУЧИТЬ ФИЛЬМЫ
export const getMovies = () => {
    return fetch(apiMovieConfig.getMovies, {
        method: 'GET',
    })
        .then(checkResponse);
}

export default getMovies;