import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { apiMovieConfig } from '../../../utils/configs'

function MoviesCardList({ movie }) {
  const location = useLocation();

  const inSaveMovies = location.pathname === '/saved-movies';
  const isNeedMoreButton = !inSaveMovies


  return (
    <section className='movieCardList'>
      <ul className='movieCardList__list'>
        {movie.map((item) => {
          return <li className='movieCardList__lists'><MoviesCard
            key={item.id}
            name={item.nameRU}
            image={`${apiMovieConfig.defaultURL}${item.image.url}`}
            link={item.trailerLink}
            duration={item.duration} /></li>
        })}
      </ul>
      {isNeedMoreButton ?
        <>
          <div className='movieCardList__more'>
            <button type='button' className='movieCardList__button-more'>Еще</button>
          </div>
        </>
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