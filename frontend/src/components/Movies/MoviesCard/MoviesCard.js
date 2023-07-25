import './MoviesCard.css';
import defaultImage from '../../../images/movieCard__poster.png'
import React, { useState, useEffect } from 'react';


function MoviesCard({ inSaveMovies, name, image, link, duaration }) {

  return (
    <div className='moviesCard'>
      <div className='moviesCard__blocks'>
        <h2 className='moviesCard__title'>{name}</h2>
        <p className='moviesCard__duration'>{duaration}</p>
        <button type='button' className={inSaveMovies?'moviesCard__like moviesCard__like_delete' : 'moviesCard__like' }></button>
      </div>
      <a href={link || 'https://www.yandex.ru'} className='moviesCard__link' target="_blank" rel="noreferrer">
        <img alt={`постер к фильму ${name}`} className='moviesCard__poster' src={image || defaultImage}></img>
      </a>
    </div>
  )
}

export default MoviesCard;