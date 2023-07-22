import './MoviesCard.css'
import React, { useState, useEffect } from 'react';


function MoviesCard({ name, posterLink, link, duration, isSavedMovie, onSave, onDelete, onClickDeleteButton, movie, savedMovies }) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  const [isCliked, setIsCliked] = useState(false)

  useEffect(() => {
    if (!isSavedMovie) {
      const result = savedMovies.some((item) => (movie.id + '') === item.movieId)
      setIsCliked(result)
    }
  }, [savedMovies])

  async function handleSaveMovie() {
    try {
      await onSave()
        .then((res) => {
          setIsCliked(true);
        });
    } catch (error) {
      console.log(error)
    }
  }

  async function handleDeleteMovie() {
    try {
      await onDelete()
        .then((res) => {
          setIsCliked(false);
        });
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='moviesCard'>
      <div className='moviesCard__blocks'>
        <h2 className='moviesCard__title'>{name}</h2>
        <p className='moviesCard__duration'>{`${hours}ч ${minutes}м`}</p>
        <button onClick={isSavedMovie ? onClickDeleteButton : isCliked ? handleDeleteMovie : handleSaveMovie} type='button' className={`${isSavedMovie ? 'moviesCard__like moviesCard__like_delete' : 'moviesCard__like'} ${isCliked ? 'moviesCard__like_liked' : ''}`} ></button>
      </div>
      <a href={link || 'https://www.yandex.ru'} className='moviesCard__link' target="_blank" rel="noreferrer">
        <img alt={`постер к фильму ${name}`} className='moviesCard__poster' src={posterLink}></img>
      </a>
    </div>
  )
}

export default MoviesCard;