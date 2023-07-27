import './SavedMovies.css'
import { useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { deleteMovie } from '../../utils/MainApi'

function SavedMovies({ isloggedIn, onSearch }) {

  // ПОЛУЧИТЬ СОХРАНЕННЫЕ ФИЛЬМЫ
  const [savedMovie, setSavedMovie] = useState(() => {
    const data = JSON.parse(localStorage.getItem('savedMovie')) || []
    return data
  });

  // НАЙТИ ФИЛЬМ
  function handleSubmit(query, shortMovieState) {
    localStorage.setItem('query', query);
    localStorage.setItem('shortMovieState', shortMovieState);
  }

   // УДАЛИТЬ ФИЛЬМ
   function handleDeleteMovie(movie) {
    console.log('movie',movie)
    const movieId = savedMovie.find((item) => (movie.movieId) === item.movieId)._id
    console.log('movieId',movieId)
    return deleteMovie(movieId)
      .then(res => {
        const newArr = savedMovie.filter((item) => item._id !== movieId)
        setSavedMovie(newArr);
      })
      .catch(err => console.log(err))
  }

  // ПОЛУЧИТЬ ВСЕ СОХРАНЕННЫЕ ФИЛЬМЫ
  // function getSavedMovies() {
  //   return getUserMovies()
  //     .then((res) => {
  //       localStorage.setItem('savedMovie', JSON.stringify(res))
  //       setSavedMovie(res)
  //     })
  //     .catch(err => console.log(err))
  // }

  return (
    <>
      <Header isloggedIn={isloggedIn} />
      <main className='savedMovies'>
        <SearchForm onSearch={handleSubmit} />
        <MoviesCardList inSaveMovies={true} isNeedMoreButton={false} onDelete={handleDeleteMovie} movie={savedMovie} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;