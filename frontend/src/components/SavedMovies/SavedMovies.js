import './SavedMovies.css'
import { useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({ isloggedIn }) {

  // ПОЛУЧИТЬ СОХРАНЕННЫЕ ФИЛЬМЫ
  const [savedMovie, setSavedMovie] = useState(() => {
    const data = JSON.parse(localStorage.getItem('savedMovie')) || []
    return data
  });

  return (
    <>
      <Header isloggedIn={isloggedIn} />
      <main className='savedMovies'>
        <SearchForm />
        <MoviesCardList inSaveMovies={true} isNeedMoreButton={false} movie={savedMovie}/>
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;