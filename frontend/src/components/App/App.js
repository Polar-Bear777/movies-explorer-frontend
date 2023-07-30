// App.js главный файл
import { Route, Routes, useNavigate, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import * as Auth from '../../utils/Auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Registration from '../Register/Registration';
import Login from '../Login/Login';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

import '../App/App.css';

function App() {

  // СТЕЙТ ДЛЯ АВТОРИЗАЦИИ/РЕГИСТРАЦИИ
  const [isloggedIn, setIsloggedIn] = useState(false);
  // СТЕЙТ ДЛЯ ПОЛУЧЕНИЯ ПОЛЬЗОВАТЕЛЯ
  const [currentUser, setCurrentUser] = useState(() => {
    const lastUserData = JSON.parse(localStorage.getItem('lastUser')) || {}
    return lastUserData
  });
  // NAVIGATE
  const navigate = useNavigate();
  const location = useLocation();

  // РЕГИСТРАЦИЯ
  function onRegister(name, email, password, e) {
    return Auth
      .registerUser(name, email, password)
      .then(() => {
        e.target.reset()
      })

  }

  // ВХОД
  function onLogin(email, password, e) {
    return Auth
      .loginUser(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsloggedIn(true);
        navigate("/movies", { replace: true })
        e.target.reset()
        return Auth.getToken(res.token)
          .then((res) => {
            setCurrentUser({
              ...currentUser,
              ...res
            });
          })
      })
  }

  // ИЗМЕНЕНИЕ АККАУНТА
  function onEdit(name, email) {
    return Auth.editUser(name, email)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          ...res.data
        })
        navigate("/movies", { replace: true })
      })
  }

  // ПРОВЕРКА АЛГОРИТМА ТОКЕНА
  function handleCheckToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      return Auth.getToken(jwt)
        .then((res) => {
          setIsloggedIn(true);
          setCurrentUser({
            ...currentUser,
            ...res
          });
        })
        .then(() => {
          navigate(location, { replace: true })
        })
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    handleCheckToken()
  }, []);

  return (
    <div className="app-page">
      <CurrentUserContext.Provider value={currentUser} >
        <Routes >

          {/* Роуты */}
          <Route path='/' element={<Main isloggedIn={isloggedIn} />} />
          <Route path='/signup' element={<Registration onRegistration={onRegister} onLogin={onLogin} onSetCurrentUser={setCurrentUser} />} />
          <Route path='/signin' element={<Login onLogin={onLogin} onHandleCheckToken={handleCheckToken} />} />
          <Route path='/saved-movies' element={<ProtectedRouteElement loggedIn={isloggedIn} element={SavedMovies} isloggedIn={isloggedIn} />} />
          <Route path='/movies' element={<ProtectedRouteElement loggedIn={isloggedIn} element={Movies} isloggedIn={isloggedIn} />} />
          <Route path='/profile' element={<ProtectedRouteElement loggedIn={isloggedIn}
            element={Profile}
            onEdit={onEdit}
            isloggedIn={isloggedIn}
            onSetIsloggedIn={() => { setIsloggedIn(false) }}
            onSetCurrentUser={setCurrentUser} />}
          />
          <Route path='*' element={<NotFound />} />

        </Routes>

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;