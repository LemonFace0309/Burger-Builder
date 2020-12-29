import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from '../../../axios'
import classes from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actionCreators from '../../../store/actions/index'

class Name extends Component {
  constructor() {
    super()
    const formField = {
      elType: 'input',
      elConfig: {
        type: 'text',
        placeholder: '',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    }
    const usersName = { ...formField }
    usersName.elConfig = {
      type: 'text',
      placeholder: 'Your Name',
    }
    const street = { ...formField }
    street.elConfig = {
      type: 'text',
      placeholder: 'Street',
    }
    const postalCode = { ...formField }
    postalCode.elConfig = {
      type: 'text',
      placeholder: 'Postal Code',
    }
    const country = { ...formField }
    country.elConfig = {
      type: 'text',
      placeholder: 'Country',
    }
    const email = { ...formField }
    email.elConfig = {
      type: 'text',
      placeholder: 'Email',
    }
    const deliveryMethod = { ...formField }
    deliveryMethod.elType = 'select'
    deliveryMethod.elConfig = {
      options: [
        { value: 'fastest', displayValue: 'Fastest' },
        { value: 'poor', displayValue: 'Poor' },
      ],
    }
    deliveryMethod.value = "fastest"
    deliveryMethod.valid = true

    this.state = {
      orderForm: {
        name: usersName,
        street: street,
        postalCode: postalCode,
        country: country,
        email: email,
        deliveryMethod: deliveryMethod,
      },
      formIsValid: false,
    }
  }

  orderHandler = (e) => {
    e.preventDefault()
    const formData = {}
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      // do not sent price data like this in production. Calculate total price on server;
      // user may try to modify totalPrice before request is sent.
      orderData: formData,
    }
    this.props.onPurchaseBurger(order)
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

    return true
  }

  inputChangedHandler = (e, key) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    }
    const updatedFormEl = { ...updatedOrderForm[key] }
    updatedFormEl.value = e.target.value
    updatedFormEl.valid = this.checkValidity(
      updatedFormEl.value,
      updatedFormEl.validation,
    )
    updatedFormEl.touched = true
    updatedOrderForm[key] = updatedFormEl
    console.log(updatedFormEl)

    let formIsValid = Object.keys(updatedOrderForm).reduce((acc, key) => {
      return acc && updatedOrderForm[key].valid
    }, true)

    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
  }

  render() {
    const formElsArray = Object.keys(this.state.orderForm).map((key) => {
      const formEl = this.state.orderForm[key]
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

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElsArray}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    )
    if (this.props.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Information</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseBurger: (orderData) => dispatch(actionCreators.purchaseBurger(orderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Name, axios))
