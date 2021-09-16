import { getCookie } from '../utils/cookie';

const API_SOURCE = "https://norma.nomoreparties.space/api/";

export const resetPasswordRequest = (email) => {
  return fetch(`${API_SOURCE}password-reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({"email": email})
  })
}

export const restorePasswordRequest = (password, code) => {
  return fetch(`${API_SOURCE}password-reset/reset`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({"password": password, "token": code})
  })
}

export const registrateRequest = (email, password, name) => {
  return fetch(`${API_SOURCE}auth/register`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({"email": email, "password": password, "name": name})
  })
}

export const logInRequest = (email, password) => {
  return fetch(`${API_SOURCE}auth/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({"email": email, "password": password})
  })
}

export const logOutRequest = () => {
  return fetch(`${API_SOURCE}auth/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({"token": localStorage.getItem('refreshToken') })
  })
}

export const getUserDataRequest = () => {
  return fetch(`${API_SOURCE}auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ` + getCookie('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  })
}

export const patchUserDataRequest = (payload) => {
  return fetch(`${API_SOURCE}auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ` + getCookie('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(payload)
  })
}

export const refreshTokenRequest = () => {
  return fetch(`${API_SOURCE}auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"token": localStorage.getItem('refreshToken')})
  })
}