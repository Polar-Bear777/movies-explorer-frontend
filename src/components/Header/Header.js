// Header.js
import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import '../Header/Header.css'
import headerLogo from "./../../images/header__logo.svg";
import BurgerMenu from './../burgerMenu/burgerMenu';

function Header({ isloggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [isBurgerOpened, setIsBurgerOpened] = useState(false)

  const isMainPage = location.pathname === '/';

  // заблочил скролл при открытом бургере
  useEffect(() => {
    const body = document.querySelector('body');

    if (isBurgerOpened) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }
  }, [isBurgerOpened])

  function handleBurgerOpening() {
    setIsBurgerOpened(!isBurgerOpened);
  }

  const goSignUp = () => {
    navigate('/signup');
  };

  const goSignIn = () => {
    navigate('/signin');
  };

  return (
    <>
      {isloggedIn ?

        <header className={isMainPage?'header header_mainColor':'header' }>
          <Link to='/' className='header__logo-link'><img alt='логотип' src={headerLogo} /></Link>
          <div className='header__block'>
            <button onClick={goSignUp} type='button' className='header__button header__button_signIn'>Регистрация</button>
            <button onClick={goSignIn} type='button' className='header__button header__button_enter'>Войти</button>
          </div>
        </header > :

        <header className='header header_unlogged'>
          <Link to='/' className='header__logo-link'><img alt='логотип' src={headerLogo} /></Link>
          <nav>
            <ul className='header__list'>
              <li><NavLink to='/movies' className={location.pathname === '/movies' ? 'header__link-active' : 'header__link'}>Фильмы</NavLink></li>
              <li><NavLink to='/saved-movies' className={location.pathname === '/saved-movies' ? 'header__link-active' : 'header__link'}>Сохранённые фильмы</NavLink></li>
            </ul>
          </nav>
          <button onClick={handleBurgerOpening} className={isMainPage?'header__burger header__burger_mainColor' : 'header__burger' } type='button'></button>
          <Link to='/profile' className=' header__account-info'>
            <span className='header__account-name'>Аккаунт</span>
            <div className='header__account-logo'></div>
          </Link>
        </header>}
      <BurgerMenu isOpened={isBurgerOpened} onClose={handleBurgerOpening} />
    </>
  )
}

export default Header;