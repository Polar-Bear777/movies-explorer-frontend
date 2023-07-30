// Profile.js
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import './Profile.css'
import InfoTooltip from '../InfoToolTip/InfoTooltip';

// ФУНКЦИЯ ПРОФИЛЯ
function Profile({ isloggedIn, onEdit, onSetIsloggedIn }) {
  const navigate = useNavigate();

  const userData = useContext(CurrentUserContext);

  // СТЕЙТЫ ИНПУТОВ
  const [name, setName] = useState(userData.name || '');
  const [email, setEmail] = useState(userData.email || '');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  // СТЕЙТЫ ИНПУТОВ ВАЛИДАЦИИ
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [disabledInput, setDisabledInput] = useState(true);

  // СТЕЙТ ИЗМЕНЕНИЯ КНОПКИ
  const [isProfileEdit, setIsProfileEdit] = useState(false);

  // ЛОГИКА ПРОВЕРКИ ВАЛИДАЦИИ
  const disabledSubmiter = nameValid && emailValid

  // СТЕЙТЫ INFOTOOLTIP
  const [isToolTipOpened, setIsTootTipOpened] = useState(false)
  const [toolTipValues, setToolTipValues] = useState({
    name: '',
    title: '',
    message: ''
  })

  // ПЕРЕДАЕМ NAME, EMAIL
  useEffect(() => {
    if (userData.name === name && userData.email === email) {
      setNameValid(false)
    } else setNameValid(true)
  }, [name, email])

  // ИЗМЕНИТЬ ИМЯ
  function handleEditName(e) {
    setName(e.target.value)
    setNameError(e.target.validationMessage)
    setNameValid(e.target.validity.valid)
  }

  // ИЗМЕНИТЬ ПОЧТУ
  function handleEditEmail(e) {
    setEmail(e.target.value)
    setEmailError(e.target.validationMessage)
    setEmailValid(e.target.validity.valid)
  }

  // ИЗМЕНИТЬ КНОПКУ
  function hanldeConditionEdit() {
    setDisabledInput(false);
    setIsProfileEdit(true);
  }

  // ВЫХОД ИЗ ПРОФИЛЯ
  function handleCheckOut() {
    localStorage.clear();
    onSetIsloggedIn(false);
    navigate('/', { replace: true });
  }

  // ИЗМЕНИТЬ РЕДАКТИРОВАНИЕ ПРОФИЛЯ
  function handleEditAccount() {
    return onEdit(name, email)
      .then()
      .catch(err => {
        if (err === 'Ошибка: 409') {
          setToolTipValues({
            title: false,
            message: 'Пользователь с таким email уже существует.'
          })
        } else {
          setToolTipValues({
            title: false,
            message: 'При обновлении пользователя произошла ошибка.'
          })
        }
        setIsTootTipOpened(true);
      })
  }

  return (
    <>
      <Header isloggedIn={isloggedIn} />
      <main className='profile'>
        <section className='profile__blocks'>
          <h1 className='profile__title'>{`Привет, ${userData.name}!`}</h1>
          <form className='profile__form'>
            <div className='profile__block-input'>
              <label className='profile__input-label' htmlFor='profile__input_name'>Имя</label>
              <input name='name'
                onChange={handleEditName}
                type='text'
                value={name}
                required
                disabled={disabledInput}
                minLength={2}
                maxLength={18}
                className='profile__input profile__input_name'
                id='profile__input_name'></input>
              <span className={nameError === 'undefined' ? 'profile__error-invisible' : 'profile__error'}>{nameError || ''}</span>
            </div>
            <div className='profile__block-input'>
              <label className='profile__input-label' htmlFor='profile__input_email'>E-mail</label>
              <input name='email'
                type='email'
                value={email}
                required
                disabled={disabledInput}
                onChange={handleEditEmail}
                className='profile__input profile__input_email'
                id='profile__input_email'></input>
              <span className={emailError === 'undefined' ? 'profile__error-invisible' : 'profile__error'}>{emailError || ''}</span>
            </div>
            {isProfileEdit ?
              <>
                <span className='profile__submit-error profile__submit-error_invisible'>При обновлении профиля произошла ошибка.</span>
                <button onClick={handleEditAccount} disabled={!disabledSubmiter} type='button' className='profile__button-save'>Сохранить</button>
              </> :
              <button onClick={hanldeConditionEdit} type='button' className='profile__button-edit'>Редактировать</button>
            }
          </form>
          <button onClick={handleCheckOut} type='button' className={isProfileEdit ? 'profile__button-exit profile__button-exit_invisible' : 'profile__button-exit'}>Выйти из аккаунта</button>
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

export default Profile;