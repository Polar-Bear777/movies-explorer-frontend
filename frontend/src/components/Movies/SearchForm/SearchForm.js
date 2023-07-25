import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

function SearchForm({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  function handleSearch(e) {
    e.preventDefault();
    onSearch(searchQuery, isChecked)
  }

  return (
    <section className='search-form'>
      <form className='search-form__blocks' noValidate onSubmit={handleSearch}>
        <div className='search-form__block-input'>
          <input
            onChange={handleInputChange}
            maxLength={24}
            required
            placeholder='Фильм'
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
            onChange={handleCheckboxChange}
          ></input>
          <label htmlFor='search-form__checkbox'></label>
          <p className='search-form__checkbox-description'>Короткометражки</p>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;