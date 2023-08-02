import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import './index.css';
import App from './components/App/App';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

