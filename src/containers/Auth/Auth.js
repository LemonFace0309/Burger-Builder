import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import classes from './Auth.module.css'
import checkValidity from '../../shared/checkValidity'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actionCreators from '../../store/actions/index'

const Auth = (props) => {
  const [controls, setControls] = useState({
    email: {
      elType: 'input',
      elConfig: {
        type: 'email',
        placeholder: 'Email Adress',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elType: 'input',
      elConfig: {
        type: 'password',
        placeholder: 'Password',
      },
      value: '',
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  })
  const [isSignup, setIsSignup] = useState(true)
  const { burgerInProgress, authRedirectPath, onSetAuthRedirectPath } = props

  useEffect(() => {
    if (!burgerInProgress && authRedirectPath !== '/') {
      onSetAuthRedirectPath()
    }
  // eslint-disable-next-line
  }, [])

  const inputChangedHandler = (e, key) => {
    const updatedControls = {
      ...controls,
      [key]: {
        ...controls[key],
        value: e.target.value,
        valid: checkValidity(e.target.value, controls[key].validation),
        touched: true,
      },
    }
    setControls(updatedControls)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    props.onSignup(controls.email.value, controls.password.value, isSignup)
  }

  const switchModeHandler = () => {
    // this.setState((prevState) => {
    //   return { isSignup: !prevState.isSignup }
    // })
    setIsSignup(!isSignup)
  }

  const formElsArray = Object.keys(controls).map((key) => {
    const formEl = controls[key]
    return (
      <Input
        key={key}
        elType={formEl.elType}
        elConfig={formEl.elConfig}
        value={formEl.value}
        invalid={!formEl.valid}
        touched={formEl.touched}
        changed={(e) => inputChangedHandler(e, key)}
      />
    )
  })

  let header = <h3>Signup</h3>
  if (!isSignup) {
    header = (
      <div>
        <h3>Login</h3>
        <p>Email: test@test.com</p>
        <p>Password: 123456</p>
      </div>
    )
  }

  let errorMessage = null
  if (props.error) {
    const errorMsg = props.error.message.split('_').join(' ')
    errorMessage = (
      <p style={{ color: 'red' }}>
        <strong>{errorMsg}</strong>
      </p>
    )
  }

  let form = <Spinner />
  if (!props.loading) {
    form = (
      <form onSubmit={submitHandler}>
        {formElsArray}
        <Button btnType="Success">Submit</Button>
      </form>
    )
  }

  let authRedirect = null
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {header}
      {errorMessage}
      {form}
      <Button btnType="Danger" clicked={switchModeHandler}>
        Switch to {isSignup ? 'Login' : 'Signup'}
      </Button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    burgerInProgress: state.burgerBuilder.inProgress,
    authRedirectPath: state.auth.authRedirectPath,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignup: (email, password, isSignup) =>
      dispatch(actionCreators.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () =>
      dispatch(actionCreators.setAuthRedirectPath('/')),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
