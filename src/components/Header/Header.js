// Header.js
import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import '../Header/Header.css'
import headerLogo from "./../../images/header__logo.svg";

function Header({ isloggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isMainPage = location.pathname === '/';

  const goSignUp = () => {
    navigate('/signup');
  };

  const goSignIn = () => {
    navigate('/signin');
  };

  return (
    <>
      <header className='header'>
        <Link to='/' className='header__logo-link'><img src={headerLogo} className="header__logo" alt="Логотип Учебного проекта" /></Link>
        <div className="header__auth">
          <button onClick={goSignUp} className="header__button-register" type="button" alt="Кнопка 'Регистрация'">Регистрация</button>
          <button onClick={goSignIn} className="header__button-signin" type="button" alt="Кнопка 'Войти'">Войти</button>
        </div>
      </header>
    </>
  );
}

export default Header;