import './Profile.css'
import Header from '../Header/Header';

import { useState, useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import { useNavigate } from 'react-router-dom';

function Profile({ isloggedIn, onEdit }) {
  // const navigate = useNavigate();

  const userData = useContext(CurrentUserContext);

  const [name, setName] = useState(userData.name || '');
  const [email, setEmail] = useState(userData.email || '');
  const [disabledInput, setDisabledInput] = useState(true);

  // const [formValue, setFormValue] = useState({});
  // const [formErrorMessage, setFormErrorMessage] = useState({});
  // const [gonnaEdit, setGonnaEdit] = useState(false)

  function handleEditName(e) {
    setName(e.target.value)
    // setFormErrorMessage({
    //   ...formErrorMessage,
    //   [name]: e.target.validationMessage
    // });
  }

  function handleEditEmail(e) {
    setEmail(e.target.value)
    // setFormErrorMessage({
    //   ...formErrorMessage,
    //   [name]: e.target.validationMessage
    // });
  }

  // const goExit = () => {
  //   navigate('/')
  // }

  // const handelEdit = () => {
  //   const inputs = document.querySelectorAll('.profile__input');
  //   inputs.forEach(input => {
  //     input.disabled = false;
  //   });
  //   setGonnaEdit(true);
  // }

  return (
    <>
      <Header isloggedIn={isloggedIn} />
      <main className='profile'>
        <section className='profile__blocks'>
          <h1 className='profile__title'>Привет, Владислав!</h1>
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
              {/* <span className={formErrorMessage.name === 'undefined' ? 'profile__error-invisible' : 'profile__error'}>{formErrorMessage.name  ''}</span> */}
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
              {/* <span className={formErrorMessage.email === 'undefined' ? 'profile__error-invisible' : 'profile__error'}>{formErrorMessage.email  ''}</span> */}
            </div>
            {/* {gonnaEdit ?
              <>
                <span className='profile__submit-error profile__submit-error_invisible'>При обновлении профиля произошла ошибка.</span>
                <button type='button' className='profile__button-save'>Сохранить</button>
              </> :
              <button onClick={handelEdit} type='button' className='profile__button-edit'>Редактировать</button>
            } */}
          </form>
          {/* <button onClick={goExit} type='button' className={gonnaEdit ? 'profile__button-exit profile__button-exit_invisible' : 'profile__button-exit'}>Выйти из аккаунта</button> */}
        </section>
      </main>
    </>
  )
}

export default Profile;