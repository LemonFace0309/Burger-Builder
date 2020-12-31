import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/',
    })
  })

  it('should set loading state to true on start', () => {
    expect(reducer(undefined, { type: actionTypes.AUTH_START })).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: true,
      authRedirectPath: '/',
    })
  })

  it('should set token start on login', () => {
    expect(
      reducer(undefined, {
        type: actionTypes.AUTH_SUCCESS,
        authData: { idToken: 123, localId: 456 },
      }),
    ).toEqual({
      token: 123,
      userId: 456,
      error: null,
      loading: false,
      authRedirectPath: '/',
    })
  })
})
