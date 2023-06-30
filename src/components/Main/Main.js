// Main.js
import React from 'react';
import '../Main/Main.css';
import Promo from '../Main/Promo/Promo';
import NavTab from '../Main/NavTab/NavTab';
import AboutProject from '../Main/AboutProject/AboutProject';

function Main(props) {
  return (
    <main className='content'>
      <Promo/>
      <NavTab/>
      <AboutProject/>
    </main>
  );
}

export default Main;