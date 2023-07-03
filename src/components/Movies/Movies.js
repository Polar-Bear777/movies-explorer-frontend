import '../Movies/Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'

function Movies({ isloggedIn }) {

  return (
    <>
      <Header isloggedIn={isloggedIn} />
      <main>
      </main>
      <Footer />
    </>
  )
}

export default Movies;