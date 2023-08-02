// NotFound.js
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

function NotFound() {

  // ВЕРНУТЬСЯ НАЗАД
  const handleBack = () => {
    navigate(-1);
  };

  // НАВИГАЦИЯ
  const navigate = useNavigate();

  return (
    <main>
      <section className='not-found'>
        <h1 className='not-found__title'>404</h1>
        <p className='not-found__description'>Страница не найдена</p>
        <button type='button' onClick={handleBack} className='not-found__button'>Назад</button>
      </section>
    </main>
  );
}

export default NotFound;

