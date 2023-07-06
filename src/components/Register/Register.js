import './Register.css'
import logo from '../../images/header__logo.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Register({ onRegistration }) {
  const [formValue, setFormValue] = useState({});
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const isFormFieldsValid = !formErrorMessage.name &&
    !formErrorMessage.email &&
    !formErrorMessage.password &&
    formErrorMessage.name == '' &&
    formErrorMessage.email == '' &&
    formErrorMessage.password == '';

  function handleChangeName(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });

    setFormErrorMessage({
      ...formErrorMessage,
      [name]: e.target.validationMessage
    })
  }

  function handleChangeEmail(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });

    setFormErrorMessage({
      ...formErrorMessage,
      [name]: e.target.validationMessage
    })
  }

  function handleChangePassword(e) {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });

    setFormErrorMessage({
      ...formErrorMessage,
      [name]: e.target.validationMessage
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password } = formValue;
    onRegistration(name, email, password, e)
  }

  return (
    <main>
      <section className='register'>
        <div className='register__block-top'>
          <Link to='/' className='register__logo-link'><img className='register__logo' alt='логотип' src={logo}></img></Link>
          <h1 className='register__title'>Добро пожаловать!</h1>
        </div>
        <div className='register__block-main'>
          <form className='registern__form' onSubmit={handleSubmit}>
            <label className='register__label' htmlFor='register__input_name'>Имя</label>
            <input className='register__input register__input_name'
              id='register__input_name'
              name='name'
              required
              minLength={2}
              maxLength={18}
              type="text"
              placeholder='Владислав' //placeholder для макета, потом уберу
              onChange={handleChangeName}></input>
            <span className={formErrorMessage.name === 'undefined' ? 'register__error-invisible' : 'register__error'}>{formErrorMessage.name || ''}</span>
            <label className='register__label' htmlFor='register__input_email'>E-mail</label>
            <input className='register__input register__input_email'
              id='register__input_email'
              name='email'
              required
              type="email"
              placeholder='test@yandex.ru' //placeholder для макета, потом уберу
              onChange={handleChangeEmail}></input>
            <span className={formErrorMessage.email === 'undefined' ? 'register__error-invisible' : 'register__error'}>{formErrorMessage.email || ''}</span>
            <label className='register__label' htmlFor='register__input_password'>Пароль</label>
            <input className='register__input register__input_password'
              id='register__input_password'
              name='password'
              required
              minLength={8}
              maxLength={24}
              type="password"
              placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;' //placeholder для макета, потом уберу
              onChange={handleChangePassword}></input>
            <span className={formErrorMessage.password === 'undefined' ? 'register__error-invisible' : 'register__error'}>{formErrorMessage.password || 'Что-то пошло не так...'}</span>
            <button type='submit' disabled={!isFormFieldsValid} className='register__button-submit' >Зарегистрироваться</button>
          </form>
          <div className='register__block-bottom'>
            <p className='register__link-description'>Уже зарегистрированы?</p>
            <Link to='/signin' className='register__link-login'>Войти</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

// BEM validation done!
export default Register;