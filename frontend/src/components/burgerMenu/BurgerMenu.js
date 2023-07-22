import './BurgerMenu.css';
import { NavLink, Link, useLocation } from 'react-router-dom';

function BurgerMenu({ isOpened, onClose }) {
  const location = useLocation();

  return (
    <>
      {isOpened && <div className="burger-menu__overlay" onClick={onClose}></div>}
      <div className={isOpened ? 'burger-menu' : 'burger-menu burger-menu_none'}>
        <button onClick={onClose} className='burger-menu__button-close' type='button'></button>
        <nav className='burger-menu__nav'>
          <NavLink to='/' className={location.pathname === '/' ? 'burger-menu__link-active' : 'burger-menu__link'}>Главная</NavLink>
          <NavLink to='/movies' className={location.pathname === '/movies' ? 'burger-menu__link-active' : 'burger-menu__link'}>Фильмы</NavLink>
          <NavLink to='/saved-movies' className={location.pathname === '/saved-movies' ? 'burger-menu__link-active' : 'burger-menu__link'}>Сохраненые фильмы</NavLink>
        </nav>
        <Link to='/profile' className='burger-menu__account-info'>
          <div className='burger-menu__account-logo'></div>
          <p className='burger-menu__account-name'>Аккаунт</p>
        </Link>
      </div>
    </>
  );
}

export default BurgerMenu;