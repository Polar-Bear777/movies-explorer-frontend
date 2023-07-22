// Portfolio.js
import './Portfolio.css'
import portfolioURL from '../../../images/portfolio__url.svg'
import { Link } from 'react-router-dom';

function Portfolio() {

  return (
    <section className='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__blocks'>
        <li><Link to='https://github.com/Polar-Bear777/how-to-learn' target="_blank" rel="noreferrer" className='portfolio__block'>
          <h2 className='portfolio__block-title'>Статичный сайт</h2>
          <img src={portfolioURL} className="portfolio__url" alt="Переход по ссылке" />
        </Link></li>
        <li><Link to='https://Polar-Bear777.github.io/russian-travel' target="_blank" rel="noreferrer" className='portfolio__block'>
          <h2 className='portfolio__block-title'>Адаптивный сайт</h2>
          <img src={portfolioURL} className="portfolio__url" alt="Переход по ссылке" />
        </Link></li>
        <li><Link to='https://polarbear.nomoredomains.rocks/' target="_blank" rel="noreferrer" className='portfolio__block portfolio__block_mod'>
          <h2 className='portfolio__block-title portfolio__block-title_mod'>Одностраничное приложение</h2>
          <img src={portfolioURL} className="portfolio__url" alt="Переход по ссылке" />
        </Link></li>
      </ul>
    </section>
  )
}

// BEM validation done!
export default Portfolio;