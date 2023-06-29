// NavTab.js
import React from 'react';
import '../NavTab/NavTab.css';
// import PromoLogo from "./../../../images/promo__logo.svg";

function NavTab(props) {
  return (
    <nav className='navtab'>
      <ul className='navtab__links'>
        <a className='navtab__link' href="/#">О проекте</a>
        <a className='navtab__link' href="/#">Технологии</a>
        <a className='navtab__link' href="/#">Студент</a>
      </ul>
    </nav>
  );
}

export default NavTab;