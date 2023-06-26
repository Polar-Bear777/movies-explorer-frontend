// Header.js
import React from 'react';
import '../Header/Header.css'
import headerLogo from "./../../images/header_logo.svg";

function Header(props) {
  return (
    <header className='header'>
      <img src={headerLogo} className="header__logo" alt="Логотип Учебного проекта" />
      <div className="header__auth">
        <button className="header__button-register" type="button" alt="Кнопка 'Регистрация'">Регистрация</button>
        <button className="header__button-signin" type="button" alt="Кнопка 'Войти'">Войти</button>
      </div>
    </header>
  );
}

export default Header;