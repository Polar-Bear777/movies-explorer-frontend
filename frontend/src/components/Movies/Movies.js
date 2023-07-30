// Movies.js
import Header from '../Header/Header';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import { getMovies } from '../../utils/MoviesApi';
import { getUserMovies, saveMovie, deleteMovie } from '../../utils/MainApi';
import { useState, useEffect } from 'react';
import './Movies.css';

function Movies({ isloggedIn, closeInfoTool }) {

  // ПОЛУЧИТЬ ФИЛЬМЫ
  const [beatMovie, setBeatMovie] = useState(() => {
    const data = JSON.parse(localStorage.getItem('beatMovie')) || []
    return data
  });

  // ПОЛУЧИТЬ СОХРАНЕННЫЕ ФИЛЬМЫ
  const [savedMovie, setSavedMovie] = useState(() => {
    const data = JSON.parse(localStorage.getItem('savedMovie')) || []
    return data
  });

  // ПОЛУЧИТЬ РЕЗУЛЬТАТЫ ПРИ ПОИСКЕ
  const [resultSearch, setResulstSearch] = useState(() => {
    const data = JSON.parse(localStorage.getItem('result')) || []
    return data
  })

  // СТЕЙТ ДЛЯ ОТОБРАЖЕНИЯ ФИЛЬМОВ
  const [isNothingToSee, setIsNothingToSee] = useState(false);
  const [isEmptyQuery, setIsEmptyQuery] = useState(false);
  
  // ПОЛУЧИТЬ ДОСТУП К ФИЛЬМУ
  function getBaetMovie() {
    return getMovies()
      .then((res) => {
        localStorage.setItem('beatMovie', JSON.stringify(res))
        setBeatMovie(res)
      })
      .catch(err => console.log(err))
  }

  // НАЙТИ ФИЛЬМ
  function handleSubmit(query, shortMovieState) {
    if (query.length === 0) {
      setIsEmptyQuery(true)
    } else {
      setIsEmptyQuery(false)
      const filtered = beatMovie.filter((movie) => {
        const isIncluded = movie.nameRU.toLowerCase().includes(query.toLowerCase());
        const isShort = movie.duration <= 40;
        if (shortMovieState) {
          return isIncluded && isShort;
        } else {
          return isIncluded;
        }
      });

      setIsNothingToSee(filtered.length === 0)
      
      localStorage.setItem('result', JSON.stringify(filtered));
      setResulstSearch(filtered);
    }
  }

  // СОХРАНИТЬ ФИЛЬМ
  function handleSaveMovie(movie) {
    return saveMovie(movie)
      .then(res => {
        setSavedMovie(prev => [...prev, res])
      })
      .catch(err => console.log(err))
  }

  // СОХРАНЯЕМ В ХРАНИЛИЩЕ
  useEffect(() => {
    localStorage.setItem('savedMovie', JSON.stringify(savedMovie))
  }, [savedMovie])

  // УДАЛИТЬ ФИЛЬМ
  function handleDeleteMovie(movie) {
    const movieId = savedMovie.find((item) => (movie.id) === item.movieId)._id
    const newArr = savedMovie.filter((item) => item._id !== movieId)
    setSavedMovie(newArr);
  }

  // ПОЛУЧАЕТ ФИЛЬМ
  useEffect(() => {
    getBaetMovie()
  }, [])

  return (
    <>
      <Header isloggedIn={isloggedIn} />
      <main className='main' onClick={closeInfoTool}>
        <SearchForm onSearch={handleSubmit} />
        {isEmptyQuery && <p className='search-form__nothing'>Нужно ввести ключевое слово</p>}
        {isNothingToSee && <p className='search-form__nothing'>Ничего не найдено</p>}
        {!isEmptyQuery && !isNothingToSee && <MoviesCardList onDelete={handleDeleteMovie} onSave={handleSaveMovie} movie={resultSearch} savedMovie={savedMovie} />}
      </main>
      <Footer />
    </>
  )
}

export default Movies;