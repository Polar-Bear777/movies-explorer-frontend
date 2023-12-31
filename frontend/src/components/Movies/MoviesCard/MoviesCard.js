// MoviesCard.js
import defaultImage from '../../../images/movieCard__poster.png'
import React, { useState, useEffect } from 'react';
import './MoviesCard.css';

// ПЕРЕДАЕМ ПРОПСЫ ДЛЯ ФИЛЬМОВ
function MoviesCard({ name, image, link, duration, onSave, savedMovie, movieId, onDelete, inSaveMovies }) {
  const [isLiked, setIsLiked] = useState(false)

  // СОХРАНЯЕМ ID
  useEffect(() => {
    if (savedMovie) {
      const result = savedMovie.some((item) => (movieId) === item.movieId)
      setIsLiked(result)
    }
  }, [savedMovie])

  return (
    <div className='moviesCard'>
      <div className='moviesCard__blocks'>
        <h2 className='moviesCard__title'>{name}</h2>
        <p className='moviesCard__duration'>{`${Math.floor(duration / 60)}ч ${duration % 60}м`}</p>
        <button onClick={inSaveMovies ? onDelete : !isLiked ? onSave : onDelete} type='button' className={inSaveMovies ? 'moviesCard__like_delete' : !isLiked ? 'moviesCard__like_default' : 'moviesCard__like'}></button>
      </div>
      <a href={link || 'https://www.yandex.ru'} className='moviesCard__link' target="_blank" rel="noreferrer">
        <img alt={`постер к фильму ${name}`} className='moviesCard__poster' src={image || defaultImage}></img>
      </a>
    </div>
  )
}

export default MoviesCard;