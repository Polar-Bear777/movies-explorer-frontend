import './SavedMovies.css'
import { useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import mainApi from '../../utils/MainApi';
import { SHORT_FILM_DURATION } from '../../constants/constants';

function SavedMovies({ isloggedIn, setInfoTool, closeInfoTool }) {

  const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem('savedMovie')))
  const [isEmptyResult, setIsEmptyResult] = useState(false);
  const [result, setResult] = useState(savedMovies)


  async function handleDeleteMovie(id) {
    return mainApi.removeMovie(id)
      .then(res => {
        const updatedFilteredMovies = savedMovies.filter((movie) => movie._id !== res.data._id)
        setSavedMovies(updatedFilteredMovies)
        setResult(updatedFilteredMovies)
      })
      .catch(err => setInfoTool({ text: err, statusOk: false, opened: true }))
  }

  const handleSearch = (searchOptions) => {
    const { query, isShortFilm } = searchOptions;
    const filtered = savedMovies.filter((movie) => {
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
    setResult(filtered);
  }

  return (
    <>
      <Header isloggedIn={isloggedIn} />
      <main className='savedMovies' onClick={closeInfoTool}>
        <SearchForm onSearch={handleSearch} setInfoTool={setInfoTool} />
        {isEmptyResult ? <span className='empty-result'>Ничего не найдено</span> : null}
        <MoviesCardList inSaveMovies={true} isNeedMoreButton={false} movies={result} onDelete={handleDeleteMovie} />
      </main>
      <Footer />
    </>
  )
}

export default SavedMovies;