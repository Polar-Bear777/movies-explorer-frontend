// Login.js
import InfoTooltip from '../InfoToolTip/InfoTooltip';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/header__logo.svg';
import './Login.css';

// АВТОРИЗАЦИЯ
function Login({ onLogin }) {
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const [formValue, setFormValue] = useState({});
  const isFormFieldsValid = !formErrorMessage.email &&
    !formErrorMessage.passwordform &&
    formErrorMessage.email == '' &&
    formErrorMessage.password == '';

  const [isToolTipOpened, setIsTootTipOpened] = useState(false)
  const [toolTipValues, setToolTipValues] = useState({
    title: '',
    message: ''
  })

  // ИЗМЕНИТЬ ЕМАИЛ
  function handleEditEmail(e) {
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

  // КНОПКА ВОЙТИ
  function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = formValue;
    onLogin(email, password, e)
      .then(() => {
        setToolTipValues({
          title: true,
          message: 'Успешно!'
        })
        setIsTootTipOpened(true);
      })
      .catch((err) => {
        console.log(err)
        if (err === 'Ошибка: 401') {
          setToolTipValues({
            title: false,
            message: 'Вы ввели неправильный логин или пароль.'
          })
        } else {
          setToolTipValues({
            title: false,
            message: 'При авторизации произошла ошибка. Токен не передан или передан не в том формате'
          })
        }
        setIsTootTipOpened(true);
      });
  }

  // ИЗМЕНИТЬ ПАРОЛЬ
  function handleEditPassword(e) {
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


  return (
    <>
      <main>
        <section className='login'>
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
                required
                type="email"
                placeholder='pochta@yandex.ru'
                onChange={handleEditEmail}></input>
              <span className={formErrorMessage.email === 'undefined' ? 'login__error-invisible' : 'login__error'}>{formErrorMessage.email || ''}</span>
              <label className='login__label' htmlFor='login__input_password'>Пароль</label>
              <input className='login__input login__input_password'
                id='login__input_password'
                name='password'
                required
                minLength={8}
                maxLength={24}
                type="password"
                onChange={handleEditPassword}></input>
              <span className={formErrorMessage.password === 'undefined' ? 'login__error-invisible' : 'login__error'}>{formErrorMessage.password || ''}</span>
              <button type='submit' disabled={!isFormFieldsValid} className='login__button-submit'>Войти</button>
            </form>
            <div className='login__block-bottom'>
              <p className='login__link-description'>Ещё не зарегистрированы?</p>
              <Link to='/signup' className='login__link-login'>Регистрация</Link>
            </div>
          </div>
        </section>
      </main >
      < InfoTooltip onClose={() => setIsTootTipOpened(false)}
        isOpened={isToolTipOpened}
        name={toolTipValues.name}
        title={toolTipValues.title}
        message={toolTipValues.message} />
    </>
  )
}

export default Login;