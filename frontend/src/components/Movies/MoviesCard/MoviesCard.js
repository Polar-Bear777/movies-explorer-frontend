import './MoviesCard.css';
import defaultImage from '../../../images/movieCard__poster.png'
import React, { useState, useEffect } from 'react';

// ПЕРЕДАЕМ ПРОПСЫ ДЛЯ ФИЛЬМОВ
function MoviesCard({ SavedMovies, name, image, link, duration }) {

  return (
    <div className='moviesCard'>
      <div className='moviesCard__blocks'>
        <h2 className='moviesCard__title'>{name}</h2>
        <p className='moviesCard__duration'>{`${Math.floor(duration / 60)}ч ${duration % 60}м`}</p>
        <button type='button' className={SavedMovies ? 'moviesCard__like moviesCard__like_delete' : 'moviesCard__like_default moviesCard__like'}></button>
      </div>
      <a href={link || 'https://www.yandex.ru'} className='moviesCard__link' target="_blank" rel="noreferrer">
        <img alt={`постер к фильму ${name}`} className='moviesCard__poster' src={image || defaultImage}></img>
      </a>
    </div>
  )
}

export default MoviesCard;