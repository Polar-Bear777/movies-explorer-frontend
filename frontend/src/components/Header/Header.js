// Header.js
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import '../Header/Header.css'
import { useState, useEffect } from 'react';
import headerLogo from '../../images/header__logo.svg';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';

function Header({ isloggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();

  // СТЕЙТ БУРГЕРА
  const [isBurgerOpened, setIsBurgerOpened] = useState(false)

  // ФУНКЦИЯ ОТКРЫТИЯ БУРГЕРА
  function handleBurgerOpening() {
    setIsBurgerOpened(!isBurgerOpened);
  }

  // НАВИГАЦИЯ ПО РУЧКАМ РЕГИСТРАЦИИ/АВТОРИЗАЦИИ
  const goingSignUp = () => {
    navigate('/signup');
  };

  const goingSignIn = () => {
    navigate('/signin');
  };

  // ПЕРЕМЕННАЯ ДЛЯ НАВИГАЦИИ ХЕДЕРА
  const onMainPage = location.pathname === '/';

  // БЛОК СКРОЛЛА
  useEffect(() => {
    const body = document.querySelector('body');

    if (isBurgerOpened) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }
  }, [isBurgerOpened])

  return (
    <>
      {isloggedIn ?

        <header className={onMainPage?'header header_mainColor':'header' }>
          <Link to='/' className='header__logo-link' > <img alt='логотип проекта' src={headerLogo} className='header__logo' /></Link>
          <div className='header__blocks'>
            <nav>
              <ul className='header__list'>
                <li><NavLink to='/movies' className={location.pathname === '/movies' ? 'header__link-active' : 'header__link'}>Фильмы</NavLink></li>
                <li><NavLink to='/saved-movies' className={location.pathname === '/saved-movies' ? 'header__link-active' : 'header__link'}>Сохранённые фильмы</NavLink></li>
              </ul>
            </nav>
            <button onClick={handleBurgerOpening} className={onMainPage?'header__burger header__burger_mainColor' : 'header__burger' } type='button'></button>
            <Link to='/profile' className=' header__account-info'>
              <span className='header__account-name'>Аккаунт</span>
              <div className='header__account-logo'></div>
            </Link>
          </div>
        </header > :

        <header className='header header_unlogged'>
          <Link to='/' className='header__logo-link'><img alt='логотип' src={headerLogo} /></Link>
          <div className='header__block'>
            <button onClick={goingSignUp} type='button' className='header__button header__button_signIn'>Регистрация</button>
            <button onClick={goingSignIn} type='button' className='header__button header__button_enter'>Войти</button>
          </div>
        </header>}
      <BurgerMenu onOpened={isBurgerOpened} isClose={handleBurgerOpening} />
    </>
  )
}

export default Header;