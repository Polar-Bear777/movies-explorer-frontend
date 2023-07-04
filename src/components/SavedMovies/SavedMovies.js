import './SavedMovies.css'
import Header from '../Header/Header';
import SearchForm from '../../components/Movies/SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Footer from '../Footer/Footer'

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