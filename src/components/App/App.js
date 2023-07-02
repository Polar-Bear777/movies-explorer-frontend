import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Register from '../Register/Register';
// import Login from '../Login/Login';
// import Movies from '../Movies/Movies';
// import SavedMovies from '../SavedMovies/SavedMovies';
// import Profile from '../Profile/Profile';
// import NotFound from '../NotFound/NotFound';
import Footer from '../Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="app-page">
      <Header/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Register />} />
        {/* <Route path="/signin" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace/>} />
        <Route path="/404" element={<NotFound />} /> */}
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;