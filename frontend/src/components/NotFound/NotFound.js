import { useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main>
      <section className='not-found'>
        <h1 className='not-found__title'>404</h1>
        <p className='not-found__description'>Страница не найдена</p>
        <button type='button' onClick={handleGoBack} className='not-found__button'>Назад</button>
      </section>
    </main>
  );
}

export default NotFound;