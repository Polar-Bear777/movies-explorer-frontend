// SavedMovies.js
import { useState, useEffect } from 'react';
import Footer from '../Footer/Footer';
import SearchForm from '../Movies/SearchForm/SearchForm';
import Header from '../Header/Header';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import './SavedMovies.css'
import { getUserMovies, deleteMovie } from '../../utils/MainApi';

function SavedMovies({ isloggedIn, onSearch }) {

  // ПОЛУЧИТЬ СОХРАНЕННЫЕ ФИЛЬМЫ
  const [savedMovie, setSavedMovie] = useState(() => {
    const data = JSON.parse(localStorage.getItem('savedMovie')) || []
    return data
  });

  // СТЕЙТ РЕЗУЛЬТАТА
  const [result, setResult] = useState(savedMovie)


  // СОХРАНЯЕМ В ХРАНИЛИЩЕ
  useEffect(() => {
    localStorage.setItem('savedMovie', JSON.stringify(savedMovie))
  }, [savedMovie])

  useEffect(() => {
    function getUserMovie() {
      return getUserMovies()
        .then(res => setSavedMovie(res))
        .catch(err => console.log('getUserMovies Catch ERROR ->', err))
    }
    getUserMovie()
  }, [])

  // ПОИСК
  const handleSearch = (query = '', shortMovieState) => {
    const filtered = savedMovie.filter((movie) => {
      const isIncluded = movie.nameRU.toLowerCase().includes(query.toLowerCase());
      const isShort = movie.duration <= 40;
      if (shortMovieState) {
        return isIncluded && isShort;
      } else {
        return isIncluded;
      }
    })
    setResult(filtered);
  }

  // УДАЛИТЬ ФИЛЬМ
  function handleMovieDelete(movie) {
    const movieId = savedMovie.find((item) => (movie.movieId) === item.movieId)._id
    return deleteMovie(movieId)
    .then(() => {
      const newArr = savedMovie.filter((item) => item._id !== movieId)
      setSavedMovie(newArr);
      setResult(newArr);
    })
    .catch((err) => console.log('handleMovieDelete ERROR', err))
  }

  return (
    <>
      <Header isloggedIn={isloggedIn} />
      <main className='savedMovies'>
        <SearchForm onSearch={handleSearch} />
        <MoviesCardList
          inSaveMovies={true} isNeedMoreButton={false} onDelete={handleMovieDelete} movie={result} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;