import '../Movies/Movies.css';
import Header from '../Header/Header';
import SearchForm from '../Movies/SearchForm/SearchForm'
import Footer from '../Footer/Footer'

function Movies({ isloggedIn }) {

  return (
    <>
      <Header isloggedIn={isloggedIn} />
      <main>
        <SearchForm />
      </main>
      <Footer />
    </>
  )
}

export default Movies;