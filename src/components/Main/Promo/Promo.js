// Main.js
import React from 'react';
import '../Promo/Promo.css';
import PromoLogo from "./../../../images/promo__logo.svg";

function Promo(props) {
  return (
    <div className='promo'>
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <img src={PromoLogo} className="promo__logo" alt="Логотип главной страницы" />
    </div>
  );
}

export default Promo;