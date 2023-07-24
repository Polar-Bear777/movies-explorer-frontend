import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { registerUser, loginUser, getToken } from '../../utils/Auth';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Registration from '../Register/Registration';
import Login from '../Login/Login';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import '../App/App.css';

function App() {
  const navigate = useNavigate();

  const [isloggedIn, setIsloggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  async function handleRegistration(name, email, password, e) {
    return registerUser(name, email, password)
      .then((res) => {
        console.log(res)
        e.target.reset()
      })
      .catch(err => alert(err))
  }

  async function handleLogin(email, password, e) {
    return loginUser(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setIsloggedIn(true);
          navigate("/movies", { replace: true })
        }
        console.log(res)
        e.target.reset()
      })
      .catch(err => alert(err))
  }

  return (
    <div className="app-page">
      <CurrentUserContext.Provider value={currentUser} >
        <Routes >

          <Route path='/' element={<Main isloggedIn={isloggedIn} />} />

          <Route path='/signup' element={<Registration onRegistration={handleRegistration} />} />

          <Route path='/signin' element={<Login onLogin={handleLogin} />} />

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
