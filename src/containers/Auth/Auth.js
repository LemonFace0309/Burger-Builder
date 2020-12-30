import React, { Component } from 'react'
import { connect } from 'react-redux'

import classes from './Auth.module.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actionCreators from '../../store/actions/index'

class Auth extends Component {
  state = {
    controls: {
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
    },
    isSignup: true,
  }

  checkValidity(value, rules) {
    if (rules.required && value.trim() === '') {
      return false
    }

    if (rules.minLength && value.length < rules.minLength) {
      return false
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return false
    }

    const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if (rules.isEmail && !emailPattern.test(value)) {
      return false
    }

    const numericPatter = /^\d+$/
    if (rules.isNumberic && !numericPatter.test(value)) {
      return false
    }

    return true
  }

  inputChangedHandler = (e, key) => {
    const updatedControls = {
      ...this.state.controls,
      [key]: {
        ...this.state.controls[key],
        value: e.target.value,
        valid: this.checkValidity(
          e.target.value,
          this.state.controls[key].validation,
        ),
        touched: true,
      },
    }
    this.setState({ controls: updatedControls })
  }

  submitHandler = (e) => {
    e.preventDefault()
    this.props.onSignup(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup,
    )
  }

  switchModeHandler = () => {
    this.setState((prevState) => {
      return { isSignup: !prevState.isSignup }
    })
  }

  render() {
    const formElsArray = Object.keys(this.state.controls).map((key) => {
      const formEl = this.state.controls[key]
      return (
        <Input
          key={key}
          elType={formEl.elType}
          elConfig={formEl.elConfig}
          value={formEl.value}
          invalid={!formEl.valid}
          touched={formEl.touched}
          changed={(e) => this.inputChangedHandler(e, key)}
        />
      )
    })

    let header = <h3>Signup</h3>
    if (!this.state.isSignup) {
      header = <div><h3>Login</h3><p>Email: test@test.com</p><p>Password: 123456</p></div>
    }

    let errorMessage = null
    if (this.props.error) {
      const  errorMsg = this.props.error.message.split('_').join(' ')
      errorMessage = <p style={{'color': 'red'}}><strong>{errorMsg}</strong></p>
    }

    let form = <Spinner />
    if (!this.props.loading) {
      form = (
        <form onSubmit={this.submitHandler}>
          {formElsArray}
          <Button btnType="Success">Submit</Button>
        </form>
      )
    }
    return (
      <div className={classes.Auth}>
        {header}
        {errorMessage}
        {form}
        <Button btnType="Danger" clicked={this.switchModeHandler}>
          Switch to {this.state.isSignup ? 'Login' : 'Signup'}
        </Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSignup: (email, password, isSignup) =>
      dispatch(actionCreators.auth(email, password, isSignup)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
