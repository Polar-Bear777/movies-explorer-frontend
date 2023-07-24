// Footer.js
import React from 'react';
import '../Footer/Footer.css'

function Footer(props) {
  return (
    <footer className='footer'>
      <h3 className='footer__title'>Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</h3>
      <div className='footer__blocks'>
        <div className='footer__block'>
          <p className='footer__copyright footer__copyright_mod footer__copyright_mod-color'>© 2023</p>
        </div>
        <div className='footer__block'>
          <p className='footer__copyright footer__copyright_mod'>Яндекс.Практикум</p>
          <p className='footer__copyright'>Github</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;