import './Movies.css';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import SearchForm from './SearchForm/SearchForm'
import MoviesCardList from './MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'
import mainApi from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader/Preloader';
import { getInitialMovies } from '../../utils/MoviesApi';
import { SHORT_FILM_DURATION } from '../../constants/constants';

function Movies({ isloggedIn, setInfoTool, closeInfoTool }) {
  const [beatMovies, setBeatMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isEmptyResult, setIsEmptyResult] = useState(false);

  const [preloader, setPreloader] = useState(false);

  useEffect(() => {
    getBeatMovies()
    getSavedMovies()
  }, []);

  async function getSavedMovies() {
    return mainApi.getInitialMovie()
      .then(res => {
        setPreloader(true)
        setSavedMovies(res)
        localStorage.setItem('savedMovie', JSON.stringify(res))
      })
      .catch(err => setInfoTool({ text: err, statusOk: false, opened: true }))
      .finally(() => setPreloader(false))
  }

  async function getBeatMovies() {
    return getInitialMovies()
      .then(res => {
        setPreloader(true)
        setBeatMovies(res)
        localStorage.setItem('beatMovie', JSON.stringify(res))
      })
      .catch(err => setInfoTool({ text: err, statusOk: false, opened: true }))
      .finally(() => setPreloader(false))
  }

  const handleSearch = (searchOptions) => {
    localStorage.setItem('searchOptions', JSON.stringify(searchOptions))
    const { query, isShortFilm } = searchOptions;
    const filtered = beatMovies.filter((movie) => {
      const isIncluded = movie.nameRU.toLowerCase().includes(query.toLowerCase());
      const isShort = movie.duration <= SHORT_FILM_DURATION;
      if (isShortFilm) {
        return isIncluded && isShort;
      } else {
        return isIncluded;
      }
    });

    if (filtered.length === 0) {
      setIsEmptyResult(true)
    }
    else {
      setIsEmptyResult(false)
    }
    localStorage.setItem('searchResult', JSON.stringify(filtered));
    setFilteredMovies(filtered);
  }

  async function handleSaveMovie(movie) {
    return mainApi.addMovie(movie)
      .then(res => {
        setSavedMovies(prev => [...prev, res])
      })
      .catch(err => setInfoTool({ text: err, statusOk: false, opened: true }))
  }

  async function handleDeleteMovie(movie) {
    const movieGonnaRemove = savedMovies.find((item) => (movie.id + '') === item.movieId)
    return mainApi.removeMovie(movieGonnaRemove._id)
      .then(res => {
        const newArr = savedMovies.filter((item) => item._id !== movieGonnaRemove._id)
        setSavedMovies(newArr);
      })
      .catch(err => setInfoTool({ text: err, statusOk: false, opened: true }))
  }

  useEffect(() => {
    localStorage.setItem('savedMovie', JSON.stringify(savedMovies))
  }, [savedMovies])

  const searchOptions = JSON.parse(localStorage.getItem('searchOptions')) || {};
  const query = searchOptions.query || '';
  const isShortFilm = searchOptions.isShortFilm || false;

  return (
    <>
      <Header isloggedIn={isloggedIn} />
      <main className='main' onClick={closeInfoTool}>
        <SearchForm
          onSearch={handleSearch}
          query={query}
          checkBox={isShortFilm}
          setInfoTool={setInfoTool} />
        {isEmptyResult && <span className='empty-result'>Ничего не найдено</span>}
        {preloader && <Preloader />}
        <MoviesCardList
          movies={JSON.parse(localStorage.getItem('searchResult')) || filteredMovies}
          savedMovies={savedMovies}
          isNeedMoreButton={true}
          onHandleDeleteMovie={handleDeleteMovie}
          onHandleSaveMovie={handleSaveMovie} />
      </main>
      <Footer />
    </>
  )
}

export default Movies;