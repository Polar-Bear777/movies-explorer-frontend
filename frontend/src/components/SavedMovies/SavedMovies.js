import './SavedMovies.css'
import { useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

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

  return (
    <>
      <Header isloggedIn={isloggedIn} />
      <main className='savedMovies'>
        <SearchForm onSearch={handleSubmit}/>
        <MoviesCardList inSaveMovies={true} isNeedMoreButton={false} movie={savedMovie}/>
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;