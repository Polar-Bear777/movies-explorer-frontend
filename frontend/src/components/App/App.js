import '../App/App.css';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate, useLocation } from "react-router-dom";
import { register, login, tokencheck, userEdit } from '../../utils/Auth';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Registration from '../Register/Registration';
import Login from '../Login/Login';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import InfoTool from '../infoToolTip/InfoTool';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isloggedIn, setIsloggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [infoTool, setInfoTool] = useState({ text: '', statusOk: true, opened: false });

  useEffect(() => {
    function handleTokenCheck() {
      const jwt = localStorage.getItem('jwt');
      const lastPage = localStorage.getItem('lastPage');
      const currentPath = location.pathname;
      if (jwt) {
        return tokencheck(jwt).then((res) => {
          setIsloggedIn(true)
          setCurrentUser({
            ...currentUser,
            ...res
          });
        })
          .then(() => {
            navigate(currentPath || lastPage, { replace: true })
          })
          .catch(err => {
            setInfoTool({ text: err, statusOk: true, opened: false })
          })
      }
    }

    handleTokenCheck()

    return () => { }
  }, []);


  async function handleRegistration(name, email, password, e) {
    return register(name, email, password)
      .then((res) => {
        e.target.reset()
      })
  }

  async function handleLogin(email, password, e) {
    return login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setIsloggedIn(true);
          navigate("/movies", { replace: true })
        }
        e.target.reset()
      })
  }

  async function handleUserEdit(name, email) {
    return userEdit(name, email)
      .then(res => {
        setCurrentUser({
          ...currentUser,
          ...res
        })
        navigate("/movies", { replace: true })
      })
  }

  async function goExit() {
    localStorage.clear();
    setIsloggedIn(false)
    navigate('/', { replace: true });
  }

  function closeInfoTool() {
    setInfoTool({ ...infoTool, opened: false });
  }

  useEffect(() => {
    localStorage.setItem('lastPage', location.pathname);
  }, [location.pathname])

  return (
    <div className="app-page">
      <CurrentUserContext.Provider value={currentUser} >
        <Routes >

          <Route path='/' element={<Main isloggedIn={isloggedIn} />} />

          <Route path='/signup' element={isloggedIn ? <Navigate to='/' /> : <Registration onLogin={handleLogin} onRegistration={handleRegistration} setInfoTool={setInfoTool} closeInfoTool={closeInfoTool} />} />

          <Route path='/signin' element={isloggedIn ? <Navigate to='/' /> : <Login onLogin={handleLogin} setInfoTool={setInfoTool} closeInfoTool={closeInfoTool} />} />

          <Route path='/saved-movies' element={<ProtectedRouteElement loggedIn={isloggedIn} element={SavedMovies} isloggedIn={isloggedIn} setInfoTool={setInfoTool} closeInfoTool={closeInfoTool} />} />

          <Route path='/movies' element={<ProtectedRouteElement loggedIn={isloggedIn} element={Movies} isloggedIn={isloggedIn} setInfoTool={setInfoTool} closeInfoTool={closeInfoTool} />} />

          <Route path='/profile' element={<ProtectedRouteElement goExit={goExit} loggedIn={isloggedIn} element={Profile} onUserEdit={handleUserEdit} isloggedIn={isloggedIn} setInfoTool={setInfoTool} closeInfoTool={closeInfoTool} />} />

          <Route path='*' element={<NotFound />} />

        </Routes>
      </CurrentUserContext.Provider>

      <InfoTool text={infoTool.text} statusOk={infoTool.statusOk} opened={infoTool.opened} onClose={closeInfoTool} />
    </div>
  );
}

export default App;
