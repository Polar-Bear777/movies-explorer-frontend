// MoviesCardList.js
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import React, { useState} from 'react';
import { apiMovieConfig } from '../../../utils/configs'

// ОТОБРАЖЕНИЕ КАРТОЧЕК
function MoviesCardList({ movie, onSave, savedMovie, onDelete }) {
  const location = useLocation();

  // ЛОГИКА СОХРАНЕНИЯ
  const inSaveMovies = location.pathname === '/saved-movies';

  const showMoreButton = !inSaveMovies

  const [movieToRender, setMovieToRender] = useState(8);

  // ЕСЛИ НАЖЕМЕМ ЕЩЕ
  const handleMoreButton = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      setMovieToRender((prevVisibleMovies) => prevVisibleMovies + 5);
    } else {
      setMovieToRender((prevVisibleMovies) => prevVisibleMovies + 8);
    }
  };

  // РЕНДЕР ФИЛЬМОВ
  const renderedMovies = movie.slice(0, movieToRender);
  
  const toRender = inSaveMovies? movie : renderedMovies

  return (
    <section className='movieCardList'>
      <ul className='movieCardList__list'>
        {/* Возвращаем фильм */}
        {toRender.map((item) => {
          return <li className='movieCardList__lists'key={inSaveMovies ? item._id : item.id}>
            <MoviesCard
              inSaveMovies={inSaveMovies}
              key={inSaveMovies ? item._id : item.id}
              onSave={() => { onSave(item) }}
              onDelete={() => { onDelete(item) }}
              name={item.nameRU}
              image={inSaveMovies ? item.image : `${apiMovieConfig.defaultURL}${item.image.url}`}
              link={item.trailerLink}
              duration={item.duration}
              movieId={item.id}
              savedMovie={savedMovie}
            /></li>
        })}
      </ul>
      {/* Проверка условия "ЕЩЕ" */}
      {showMoreButton ? movie.length > movieToRender && (
        <>
          <div className='movieCardList__more'>
            <button onClick={handleMoreButton} type='button' className='movieCardList__button-more'>Еще</button>
          </div>
        </>
      )
        :
        <>
          <div className='movieCardList__more movieCardList__more_invisible'>
            <button type='button' className='movieCardList__button-more movieCardList__button-more_invisible'>Еще</button>
          </div>
        </>}
    </section>
  );
}

export default MoviesCardList;