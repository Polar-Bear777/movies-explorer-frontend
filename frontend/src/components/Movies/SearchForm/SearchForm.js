import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

function SearchForm({ onSearch, shortMovieState, query }) {

  // СТЕЙТ ЗАПРОСА
  const [searchString, setSearchString] = useState(query);
  // СТЕЙТ ЧЕКБОКСА
  const [isChecked, setIsChecked] = useState(shortMovieState);

  // ОБРАБОТКА ИЗМЕНЕНИЯ ИНПУТА
  const handleInputEdit = (e) => {
    setSearchString(e.target.value);
  };

  // ОБРАБОТКА ЧЕКБОКСА
  const handleCheckboxEdit = (e) => {
    setIsChecked(e.target.checked);
    onSearch(searchString, isChecked)
  };

  // ОБРАБОТКА ПОИСКА
  function handleSearch(e) {
    e.preventDefault();
    onSearch(searchString, isChecked)
  }

  return (
    <section className='search-form'>
      <form className='search-form__blocks' noValidate onSubmit={handleSearch}>
        <div className='search-form__block-input'>
          <input
            onChange={handleInputEdit}
            maxLength={24}
            required
            placeholder='Фильм'
            value={searchString}
            className='search-form__input'
          ></input>
          <button type='submit' className='search-form__button'>
            Найти
          </button>
        </div>
        <div className='search-form__block-checkbox'>
          <input
            type='checkbox'
            id='search-form__checkbox'
            className='search-form__checkbox'
            value={isChecked}
            onChange={handleCheckboxEdit}
          ></input>
          <label htmlFor='search-form__checkbox'></label>
          <p className='search-form__checkbox-description'>Короткометражки</p>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;