import './SavedMovies.css'
import { useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({ isloggedIn }) {

  return (
    <>
      <Header isloggedIn={isloggedIn} />
      <main className='savedMovies'>
        <SearchForm />
        <MoviesCardList inSaveMovies={true} isNeedMoreButton={false} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;