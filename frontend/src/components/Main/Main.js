// Main.js
import AboutProject from './AboutProject/AboutProject';
import Promo from './Promo/Promo';
import Portfolio from './Portfolio/Portfolio';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import NavTab from './NavTab/NavTab';
import './Main.css';

function Main({ isloggedIn }) {

  return (
    <>
      <Header isloggedIn={isloggedIn} />
      <main className='content'>
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  )
}

export default Main;