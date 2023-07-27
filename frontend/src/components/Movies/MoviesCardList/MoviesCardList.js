import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { apiMovieConfig } from '../../../utils/configs'

function MoviesCardList({ movie, onSave }) {
  const location = useLocation();

  // ЛОГИКА СОХРАНЕНИЯ
  const inSaveMovies = location.pathname === '/saved-movies';
  const showMoreButton = !inSaveMovies

  const [movieToRender, setMovieToRender] = useState(8);

  const handleMoreButton = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      setMovieToRender((prevVisibleMovies) => prevVisibleMovies + 5);
    } else {
      setMovieToRender((prevVisibleMovies) => prevVisibleMovies + 8);
    }
  };

  const renderedMovies = movie.slice(0, movieToRender);

  return (
    <section className='movieCardList'>
      <ul className='movieCardList__list'>
        {/* Возвращаем фильм */}
        {renderedMovies.map((item) => {
          return <li className='movieCardList__lists' key={item.id || item._id}>
            <MoviesCard
              onSave={() => { onSave(item) }}
              key={item.id}
              name={item.nameRU}
              image={`${apiMovieConfig.defaultURL}${item.image.url}`}
              link={item.trailerLink}
              duration={item.duration}
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