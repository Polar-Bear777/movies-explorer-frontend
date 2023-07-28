// ПРОВЕРКА СТАТУСА
export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

// БЭКЕНД
export const BASE_URL = 'https://api.bearpolar.nomoredomai.nomoreparties.sbs';

// РЕГИСТРАЦИЯ
export const registerUser = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': name,
      'email': email,
      'password': password
    })
  }).then(res => checkResponse(res))
};

// АВТОРИЗАЦИЯ
export const loginUser = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(res => checkResponse(res))
};

// ИЗМЕНИТЬ ПОЛЬЗОВАТЕЛЯ
export const editUser = (name, email) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({
      'name': name,
      'email': email,
    })
  }).then(res => checkResponse(res))
};

// ПОЛУЧЕНИЕ ТОКЕНА
export function getToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}