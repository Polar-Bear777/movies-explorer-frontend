import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { useState, useEffect } from 'react';
import { getUserMovies } from '../../utils/MainApi';

function Movies({ isloggedIn, setInfoTool, closeInfoTool }) {

  const [beatMovie, setBeatMovie] = useState(() => {
    const data = JSON.parse(localStorage.getItem('beatMovie')) || []
    return data
  });

  const [savedMovie, setSavedMovie] = useState(() => {
    const data = JSON.parse(localStorage.getItem('savedMovie')) || []
    return data
  });

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
      console.log(res)
      setSavedMovie(res)
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
        <SearchForm />
        <MoviesCardList />
      </main>
      <Footer />
    </>
  )
}

export default Movies;