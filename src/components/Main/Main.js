// Main.js
import React from 'react';
import '../Main/Main.css';
import Promo from '../Main/Promo/Promo';
import NavTab from '../Main/NavTab/NavTab';

function Main(props) {
  return (
    <main className='content'>
      <Promo/>
      <NavTab/>
    </main>
  );
}

export default Main;