import './SearchForm.css';

function SearchForm({ isloggedIn }) {

  return (
    <section className='search-form'>
      <form className='search-form__blocks'>
        <div className='search-form__block-input'>
        <input minLength={2} maxLength={24} required placeholder='Фильм' className='search-form__input'></input>
        <button type='submit' className='search-form__button'>Поиск</button>
        </div>
        <div className='search-form__block-checkbox'>
          <input type="checkbox" id="search-form__checkbox" className='search-form__checkbox'></input>
          <label htmlFor="search-form__checkbox"></label>
          <p className='search-form__checkbox-description'>Короткометражки</p>
        </div>
      </form>
    </section>
  )
}

export default SearchForm;