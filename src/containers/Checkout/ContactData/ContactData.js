import React, { useState } from 'react'
import { connect } from 'react-redux'

import axios from '../../../axios'
import classes from './ContactData.module.css'
import checkValidity from '../../../shared/checkValidity'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actionCreators from '../../../store/actions/index'

const ContactData = (props) => {
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
  deliveryMethod.value = 'fastest'
  deliveryMethod.valid = true

  const [orderForm, setOrderForm] = useState({
    name: usersName,
    street: street,
    postalCode: postalCode,
    country: country,
    email: email,
    deliveryMethod: deliveryMethod,
  })

  const [formIsValid, setFormIsValid] = useState(false)

  const orderHandler = (e) => {
    e.preventDefault()
    const formData = {}
    for (let key in orderForm) {
      formData[key] = orderForm[key].value
    }
    const order = {
      userId: props.userId,
      ingredients: props.ingredients,
      price: props.totalPrice,
      // do not sent price data like this in production. Calculate total price on server;
      // user may try to modify totalPrice before request is sent.
      orderData: formData,
    }
    props.onPurchaseBurger(order, props.token)
  }

  const inputChangedHandler = (e, key) => {
    const updatedOrderForm = {
      ...orderForm,
    }
    const updatedFormEl = { ...updatedOrderForm[key] }
    updatedFormEl.value = e.target.value
    updatedFormEl.valid = checkValidity(
      updatedFormEl.value,
      updatedFormEl.validation,
    )
    updatedFormEl.touched = true
    updatedOrderForm[key] = updatedFormEl

    let formIsValid = Object.keys(updatedOrderForm).reduce((acc, key) => {
      return acc && updatedOrderForm[key].valid
    }, true)

    setOrderForm(updatedOrderForm)
    setFormIsValid(formIsValid)
  }

  const formElsArray = Object.keys(orderForm).map((key) => {
    const formEl = orderForm[key]
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

  let form = (
    <form onSubmit={orderHandler}>
      {formElsArray}
      <Button btnType="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  )
  if (props.loading) {
    form = <Spinner />
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Information</h4>
      {form}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseBurger: (orderData, token) =>
      dispatch(actionCreators.purchaseBurger(orderData, token)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(ContactData, axios))
