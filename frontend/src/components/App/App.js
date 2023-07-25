import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate, useLocation } from "react-router-dom";
import * as Auth from '../../utils/Auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Registration from '../Register/Registration';
import Login from '../Login/Login';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

import '../App/App.css';

function App() {

  // СТЕЙТ ДЛЯ АВТОРИЗАЦИИ/РЕГИСТРАЦИИ
  const [isloggedIn, setIsloggedIn] = useState(false);
  const [emailName, setEmailName] = useState(null);
  // СТЕЙТ ДЛЯ ПОЛУЧЕНИЯ ПОЛЬЗОВАТЕЛЯ
  const [currentUser, setCurrentUser] = useState({});
  // NAVIGATE
  const navigate = useNavigate();
  const location = useLocation();

  // РЕГИСТРАЦИЯ
  function onRegister(name, email, password, e) {
    Auth
      .registerUser(name, email, password)
      .then(() => {
        navigate("/sign-in");
        e.target.reset()
      })
      .catch(err => alert(err))
  }

  // ВХОД
  function onLogin(email, password, e) {
    Auth
      .loginUser(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsloggedIn(true);
        setEmailName(email);
        navigate("/");
        e.target.reset()
      })
      .catch(err => alert(err))
  }

  // ПРОВЕРКА АЛГОРИТМ ТОКЕНА
  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      return Auth.getToken(jwt)
        .then((res) => {
          setIsloggedIn(true);

          setCurrentUser(res);
          console.log(res)
        })
        .then(() => {
          navigate(location, { replace: true })
        })
        .catch(err => console.log(err))
    }
  }

  useEffect(() => {
    handleTokenCheck()
  }, []);

  return (
    <div className="app-page">
      <CurrentUserContext.Provider value={currentUser} >
        <Routes >

          <Route path='/' element={<Main isloggedIn={isloggedIn} />} />

          <Route path='/signup' element={<Registration onRegistration={onRegister} />} />

          <Route path='/signin' element={<Login onLogin={onLogin} />} />

          <Route path='/saved-movies' element={<ProtectedRouteElement loggedIn={isloggedIn} element={SavedMovies} isloggedIn={isloggedIn} />} />

          <Route path='/movies' element={<ProtectedRouteElement loggedIn={isloggedIn} element={Movies} isloggedIn={isloggedIn} />} />

          <Route path='/profile' element={<ProtectedRouteElement loggedIn={isloggedIn} element={Profile} isloggedIn={isloggedIn} />} />

          <Route path='*' element={<NotFound />} />

        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;