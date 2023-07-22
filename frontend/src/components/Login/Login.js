import './Login.css'
import { Link } from 'react-router-dom';
import logo from '../../images/header__logo.svg';
import { useState } from 'react';
import { REGEX_EMAIL } from '../../constants/constants';

function Login({ onLogin, setInfoTool, closeInfoTool }) {
  const [formValue, setFormValue] = useState({});
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const [fetchErrorMessage, setFetchErrorMessage] = useState('');
  const [isDisabledInput, setIsDisabledInput] = useState(false);
  const isFormFieldsValid = !formErrorMessage.email &&
    !formErrorMessage.passwordform &&
    formErrorMessage.email == '' &&
    formErrorMessage.password == '';


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
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsDisabledInput(true);
    const { email, password } = formValue;
    onLogin(email, password, e)
      .then(() => setInfoTool({ text: 'Успешно', statusOk: true, opened: true }))
      .catch(err => {
        switch (err) {
          case 'Ошибка: 400':
            setFetchErrorMessage('Вы ввели неправильный логин или пароль.');
            break;
          case 'Ошибка: 401':
            setFetchErrorMessage('Вы ввели неправильный логин или пароль.');
            break;
          case 'Ошибка: 403':
            setFetchErrorMessage('При авторизации произошла ошибка. Переданный токен некорректен.');
            break;
          default:
            setFetchErrorMessage('При авторизации произошла ошибка. Токен не передан или передан не в том формате.');
            break;
        }
        setInfoTool({ text: err, statusOk: false, opened: true })
      })
      .finally(() => setIsDisabledInput(false));
  }

  return (
    <main>
      <section className='login' onClick={closeInfoTool}>
        <div className='login__block-top'>
          <Link to='/' className='login__logo-link'><img className='login__logo' alt='логотип' src={logo}></img></Link>
          <h1 className='login__title'>Рады видеть!</h1>
        </div>
        <div className='login__block-main'>
          <form className='login__form' noValidate onSubmit={handleSubmit}>
            <label className='login__label' htmlFor='login__input_email'>E-mail</label>
            <input className='login__input login__input_email'
              id='login__input_email'
              name='email'
              disabled={isDisabledInput}
              required
              type="email"
              placeholder='pochta@yandex.ru'
              onChange={handleChangeEmail}></input>
            <span className={formErrorMessage.email === 'undefined' ? 'login__error-invisible' : 'login__error'}>{formErrorMessage.email || ''}</span>
            <label className='login__label' htmlFor='login__input_password'>Пароль</label>
            <input className='login__input login__input_password'
              id='login__input_password'
              name='password'
              disabled={isDisabledInput}
              required
              minLength={8}
              maxLength={24}
              type="password"
              onChange={handleChangePassword}></input>
            <span className={formErrorMessage.password === 'undefined' ? 'login__error-invisible' : 'login__error'}>{formErrorMessage.password || ''}</span>
            <p className={fetchErrorMessage.length > 0 ? 'login__fetch-error' : 'login__fetch-error login__fetch-error_invisible'}>
              {fetchErrorMessage}
            </p>
            <button type='submit' disabled={!isFormFieldsValid} className='login__button-submit'>Войти</button>
          </form>
          <div className='login__block-bottom'>
            <p className='login__link-description'>Ещё не зарегистрированы?</p>
            <Link to='/signup' className='login__link-login'>Регистрация</Link>
          </div>
        </div>
      </section>
    </main >
  )
}

// BEM validator done!
export default Login;