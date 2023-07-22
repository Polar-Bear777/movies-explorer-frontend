import './Registration.css'
import logo from '../../images/header__logo.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { REGEX_EMAIL } from '../../constants/constants';

function Registration({ onRegistration, onLogin, setInfoTool, closeInfoTool }) {
  const [formValue, setFormValue] = useState({});
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const [fetchErrorMessage, setFetchErrorMessage] = useState('');
  const [isDisabledInput, setIsDisabledInput] = useState(false);
  
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

    if (value.length > 0) {
      const isValid = REGEX_EMAIL.test(value);
      setFormErrorMessage({
        ...formErrorMessage,
        [name]: isValid ? '' : 'Некорректный формат email'
      });
    }
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
    setIsDisabledInput(true);
    const { name, email, password } = formValue;
    onRegistration(name, email, password, e)
      .then(() => {
        onLogin(email, password, e)
        setInfoTool({ text: 'Успешно', statusOk: true, opened: true })
      })
      .catch(err => {
        setFetchErrorMessage(err)
        setInfoTool({ text: err, statusOk: false, opened: true })
      })
      .finally(() => setIsDisabledInput(false));
  }

  return (
    <main>
      <section className='registration' onClick={closeInfoTool}>
        <div className='registration__container-top'>
          <Link to='/' className='registration__logo-link'><img className='registration__logo' alt='логотип' src={logo}></img></Link>
          <h1 className='registration__title'>Добро пожаловать!</h1>
        </div>
        <div className='registration__container-main'>
          <form className='registration__form' noValidate onSubmit={handleSubmit}>
            <label className='registration__label' htmlFor='registration__input_name'>Имя</label>
            <input className='registration__input registration__input_name'
              id='registration__input_name'
              name='name'
              disabled={isDisabledInput}
              required
              minLength={2}
              maxLength={18}
              type="text"
              placeholder='Имя'
              onChange={handleChangeName}></input>
            <span className={formErrorMessage.name === 'undefined' ? 'registration__error-invisible' : 'registration__error'}>{formErrorMessage.name || ''}</span>
            <label className='registration__label' htmlFor='registration__input_email'>E-mail</label>
            <input className='registration__input registration__input_email'
              id='registration__input_email'
              name='email'
              disabled={isDisabledInput}
              required
              type="email"
              placeholder='Почта'
              onChange={handleChangeEmail}></input>
            <span className={formErrorMessage.email === 'undefined' ? 'registration__error-invisible' : 'registration__error'}>{formErrorMessage.email || ''}</span>
            <label className='registration__label' htmlFor='registration__input_password'>Пароль</label>
            <input className='registration__input registration__input_password'
              id='registration__input_password'
              name='password'
              disabled={isDisabledInput}
              required
              minLength={8}
              maxLength={24}
              type="password"
              placeholder='Пароль'
              onChange={handleChangePassword}></input>
            <span className={formErrorMessage.password === 'undefined' ? 'registration__error-invisible' : 'registration__error'}>{formErrorMessage.password}</span>
            <p className={fetchErrorMessage.length > 0 ? 'registration__fetch-error' : 'registration__fetch-error registration__fetch-error_invisible'}>
              {fetchErrorMessage === 'Ошибка: 409' ? 'Пользователь с таким email уже существует.' : 'При регистрации пользователя произошла ошибка.'}
            </p>
            <button type='submit' disabled={isDisabledInput || !isFormFieldsValid} className='registration__button-submit' >Зарегистрироваться</button>
          </form>
          <div className='registration__container-bottom'>
            <p className='registration__link-description'>Уже зарегистрированы?</p>
            <Link to='/signin' className='registration__link-login'>Войти</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

// BEM validation done!
export default Registration;
