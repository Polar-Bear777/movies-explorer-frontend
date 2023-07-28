import { Link } from 'react-router-dom';
import './Registration.css'
import InfoTooltip from '../InfoToolTip/InfoTooltip';
import { useState } from 'react';
import logo from '../../images/header__logo.svg';

// ФУНКЦИЯ РЕГИСТРАЦИИ
function Registration({ onRegistration, onLogin, setInfoTool, closeInfoTool }) {
  
  // КОНСТАНТЫ
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const [formValue, setFormValue] = useState({});
  const [isToolTipOpened, setIsTootTipOpened] = useState(false)
  const [toolTipValues, setToolTipValues] = useState({
    name: '',
    title: '',
    message: ''
  })
  const isFormFieldsValid = !formErrorMessage.name &&
    !formErrorMessage.email &&
    !formErrorMessage.password &&
    formErrorMessage.name == '' &&
    formErrorMessage.email == '' &&
    formErrorMessage.password == '';

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
    })
  }

  // ИЗМЕНИТЬ ИМЯ
  function handleEditName(e) {
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
    })
  }

  // КНОПКА РЕГИСТРАЦИЯ
  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password } = formValue;
    onRegistration(name, email, password, e)
      .then((res) => {
        setToolTipValues({
          title: true,
          message: 'Регистрация прошла успешно'
        })
        setIsTootTipOpened(true);
        onLogin(email, password, e)
      })
      .catch(err => {
        if (err === 'Ошибка: 409') {
          setToolTipValues({
            title: false,
            message: 'Пользователь с таким email уже существует.'
          })
        } else {
          setToolTipValues({
            title: false,
            message: 'При регистрации пользователя произошла ошибка.'
          })
        }
        setIsTootTipOpened(true);
      })
  }

  return (
    <>
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
                required
                minLength={2}
                maxLength={18}
                type="text"
                placeholder='Имя'
                onChange={handleEditName}></input>
              <span className={formErrorMessage.name === 'undefined' ? 'registration__error-invisible' : 'registration__error'}>{formErrorMessage.name || ''}</span>
              <label className='registration__label' htmlFor='registration__input_email'>E-mail</label>
              <input className='registration__input registration__input_email'
                id='registration__input_email'
                name='email'
                required
                type="email"
                placeholder='Почта'
                onChange={handleEditEmail}></input>
              <span className={formErrorMessage.email === 'undefined' ? 'registration__error-invisible' : 'registration__error'}>{formErrorMessage.email || ''}</span>
              <label className='registration__label' htmlFor='registration__input_password'>Пароль</label>
              <input className='registration__input registration__input_password'
                id='registration__input_password'
                name='password'
                required
                minLength={8}
                maxLength={24}
                type="password"
                placeholder='Пароль'
                onChange={handleEditPassword}></input>
              <span className={formErrorMessage.password === 'undefined' ? 'registration__error-invisible' : 'registration__error'}>{formErrorMessage.password}</span>
              <button type='submit' disabled={!isFormFieldsValid} className='registration__button-submit' >Зарегистрироваться</button>
            </form>
            <div className='registration__container-bottom'>
              <p className='registration__link-description'>Уже зарегистрированы?</p>
              <Link to='/signin' className='registration__link-login'>Войти</Link>
            </div>
          </div>
        </section>
      </main>
      < InfoTooltip onClose={() => setIsTootTipOpened(false)}
        isOpened={isToolTipOpened}
        name={toolTipValues.name}
        title={toolTipValues.title}
        message={toolTipValues.message} />
    </>
  )
}

export default Registration;
