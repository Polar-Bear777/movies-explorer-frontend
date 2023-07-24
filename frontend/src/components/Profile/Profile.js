import './Profile.css'
import Header from '../Header/Header';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Profile({ isloggedIn }) {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({});
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const [gonnaEdit, setGonnaEdit] = useState(false)

  function handleChangeName(e) {
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

  function handleChangeEmail(e) {
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

  const goExit = () => {
    navigate('/')
  }

  const handelEdit = () => {
    const inputs = document.querySelectorAll('.profile__input');
    inputs.forEach(input => {
      input.disabled = false;
    });
    setGonnaEdit(true);
  }

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
                // disabled='true'
                onChange={handleChangeName}
                type='text'
                placeholder='Владислав'
                required
                minLength={2}
                maxLength={18}
                className='profile__input profile__input_name'
                id='profile__input_name'></input>
              <span className={formErrorMessage.name === 'undefined' ? 'profile__error-invisible' : 'profile__error'}>{formErrorMessage.name || ''}</span>
            </div>
            <div className='profile__block-input'>
              <label className='profile__input-label' htmlFor='profile__input_email'>E-mail</label>
              <input name='email'
                // disabled='true'
                type='email'
                required
                onChange={handleChangeEmail}
                placeholder='pochta@yandex.ru'
                className='profile__input profile__input_email'
                id='profile__input_email'></input>
              <span className={formErrorMessage.email === 'undefined' ? 'profile__error-invisible' : 'profile__error'}>{formErrorMessage.email || ''}</span>
            </div>
            {gonnaEdit ?
              <>
                <span className='profile__submit-error profile__submit-error_invisible'>При обновлении профиля произошла ошибка.</span>
                <button type='button' className='profile__button-save'>Сохранить</button>
              </> :
              <button onClick={handelEdit} type='button' className='profile__button-edit'>Редактировать</button>
            }
          </form>
          <button onClick={goExit} type='button' className={gonnaEdit ? 'profile__button-exit profile__button-exit_invisible' : 'profile__button-exit'}>Выйти из аккаунта</button>
        </section>
      </main>
    </>
  )
}

export default Profile;