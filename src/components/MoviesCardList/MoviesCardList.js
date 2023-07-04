import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ inSaveMovies, isNeedMoreButton }) {

  return (
    <section className='movieCardList'>
      <ul className='movieCardList__list'>
        <li className='movieCardList__item'><MoviesCard inSaveMovies={inSaveMovies} name={'33 слова о дизайне'} /></li>
        <li className='movieCardList__item'><MoviesCard inSaveMovies={inSaveMovies} name={'Киноальманах «100 лет дизайна»'} /></li>
        <li className='movieCardList__item'><MoviesCard inSaveMovies={inSaveMovies} name={'В погоне за Бенкси'} /></li>
        <li className='movieCardList__item'><MoviesCard inSaveMovies={inSaveMovies} name={'Баския: Взрыв реальности'} /></li>
        <li className='movieCardList__item'><MoviesCard inSaveMovies={inSaveMovies} name={'Бег это свобода'} /></li>
      </ul>
      {isNeedMoreButton ?
        <>
          <div className='movieCardList__more'>
            <button type='button' className='movieCardList__button-more'>Еще</button>
          </div>
        </>
        :
        <div className='movieCardList__more movieCardList__more_invisible'>
            <button type='button' className='movieCardList__button-more movieCardList__button-more_invisible'>Еще</button>
        </div>}
    </section>
  )
}

export default MoviesCardList;