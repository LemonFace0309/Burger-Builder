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
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const checkAuthTimeout = (err) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout())
    }, err.expiresIn * 1000)
  }
}

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart())
    console.log('[email + pass]', email, password)
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
        console.log(res)
        dispatch(authSuccess(res.data))
        dispatch(checkAuthTimeout(res.data))
      })
      .catch((err) => {
        console.log(err)
        dispatch(authFail(err))
      })
  }
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  }
}
