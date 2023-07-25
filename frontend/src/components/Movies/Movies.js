import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { useState, useEffect } from 'react';
import { getUserMovies, saveMovie, deleteMovie } from '../../utils/MainApi';

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

  // ПОЛУЧИТЬ ДОСТУП К ФИЛЬМУ
  function getBaetMovie() {
    return getUserMovies()
      .then((res) => {
        localStorage.setItem('beatMovie', JSON.stringify(res))
        setBeatMovie(res)
      })
      .catch(err => console.log(err))
  }

  function getSavedMovies() {
    return getUserMovies()
      .then((res) => {
        localStorage.setItem('savedMovie', JSON.stringify(res))
        setSavedMovie(res)
      })
      .catch(err => console.log(err))
  }

  // НАЙТИ ФИЛЬМ
  function handleSubmit(query, shortMovieState) {
    localStorage.setItem('query', query);
    localStorage.setItem('shortMovieState', shortMovieState);

    // УСЛОВИЕ ДЛЯ КОРОТКОМЕТРАЖЕК
    if (beatMovie.length > 0) {
      const filtered = beatMovie.filter((movie) => {
        const isIncluded = movie.nameRU.toLowerCase().includes(query.toLowerCase());
        const isShort = movie.duration <= 40;
        if (!shortMovieState) {
          return isIncluded && isShort;
        } else {
          return isIncluded;
        }
      });

      // if (filtered.length === 0) {
      //   setIsEmptyResult(true)
      // }
      // else {
      //   setIsEmptyResult(false)
      // }

      localStorage.setItem('result', JSON.stringify(filtered));
      setResulstSearch(filtered);
    } else getBaetMovie()
  } 

  // СОХРАНИТЬ ФИЛЬМ
  function handleSaveMovie(movie) {
    return saveMovie(movie)
      .then(res => {
        setSavedMovie(prev => [...prev, res])
      })
      .catch(err => console.log(err))
  }

  // УДАЛИТЬ ФИЛЬМ
  function handleDeleteMovie(movie) {
    const movieId = savedMovie.find((item) => (movie.id.toSting()) === item.movieId)._id
    return deleteMovie(movieId)
      .then(res => {
        const newArr = savedMovie.filter((item) => item._id !== movieId)
        setSavedMovie(newArr);
      })
      .catch(err => console.log(err))
  }

  // useEffect(() => {
  //   getSavedMovies()
  // }, [])


  useEffect(() => {
    console.log('beatMovie', beatMovie)
    console.log('savedMovie', savedMovie)
  }, beatMovie, savedMovie)

  return (
    <>
      <Header isloggedIn={isloggedIn} />
      <main className='main' onClick={closeInfoTool}>
        <SearchForm onSearch={handleSubmit}/>
        <MoviesCardList movie={resultSearch}/>
      </main>
      <Footer />
    </>
  )
}

export default Movies;