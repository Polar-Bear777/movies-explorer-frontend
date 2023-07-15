import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import { register, login, tokencheck } from '../../utils/Auth';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import './App.css';

function App() {
  const [isloggedIn, setIsloggedIn] = useState(true);

  // async function handleRegistration(name, email, password, e) {
  //   return register(name, email, password)
  //     .then((res) => {
  //       console.log(res)
  //       e.target.reset()
  //     })
  //     .catch(err => alert(err))
  // }

  // async function handleLogin(email, password, e) {
  //   return login(email, password)
  //     .then((res) => {
  //       if (res.token) {
  //         localStorage.setItem('jwt', res.token);
  //         setIsloggedIn(true);
  //         navigate("/movies", { replace: true })
  //       }
  //       console.log(res)
  //       e.target.reset()
  //     })
  //     .catch(err => alert(err))
  // }

  return (
    <div className="app-page">
      <Routes>
        <Route path="/" element={<Main isloggedIn={isloggedIn} />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;