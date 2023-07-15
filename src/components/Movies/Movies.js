import '../Movies/Movies.css';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({ isloggedIn }) {

  return (
    <>
      <Header isloggedIn={isloggedIn} />
      <main>
        <SearchForm />
        <MoviesCardList inSaveMovies={false} isNeedMoreButton={true} />
      </main>
      <Footer />
    </>
  )
}

export default Movies;