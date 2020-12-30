import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  }
}

export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err,
  }
}

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000)
  }
}

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart())
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDWur77C8u2fClSt_e_diRO9JY-3f2Vdnc'
    if (!isSignup) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDWur77C8u2fClSt_e_diRO9JY-3f2Vdnc'
    }
    axios
      .post(url, authData)
      .then((res) => {
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000,
        )
        localStorage.setItem('token', res.data.idToken)
        localStorage.setItem('userId', res.data.localId)
        localStorage.setItem('expirationDate', expirationDate)
        dispatch(authSuccess(res.data))
        dispatch(checkAuthTimeout(res.data.expiresIn))
      })
      .catch((err) => {
        dispatch(authFail(err))
      })
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  }
}

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    if (!token) {
      dispatch(logout())
    }
    const expirationDate = new Date(localStorage.getItem('expirationDate'))
    if (expirationDate > new Date()) {
      const authData = {
        idToken: token,
        localId: userId,
      }
      dispatch(authSuccess(authData))
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000,
        ),
      )
    } else {
      dispatch(logout())
    }
  }
}
