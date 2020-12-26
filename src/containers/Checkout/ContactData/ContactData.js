import React, { Component } from 'react'

import axios from '../../../axios'
import classes from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

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

    this.state = {
      orderForm: {
        name: usersName,
        street: street,
        postalCode: postalCode,
        country: country,
        email: email,
        deliveryMethod: deliveryMethod,
      },
      loading: false,
    }
  }

  orderHandler = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      // do not sent price data like this in production. Calculate total price on server;
      // user may try to modify totalPrice before request is sent.
    }
    axios
      .post('orders.json/', order)
      .then((res) => {
        console.log(res)
        this.setState({ loading: false })
        this.props.history.push('/')
      })
      .catch((error) => {
        console.log(error)
        this.setState({ loading: false })
      })
    console.log(this.props.ingredients)
  }

  render() {
    const formElsArray = Object.keys(this.state.orderForm).map((key) => {
      return (
        <Input
          key={key}
          elType={this.state.orderForm[key].elType}
          elConfig={this.state.orderForm[key].elConfig}
          value={this.state.orderForm[key].value}
        />
      )
    })

    let form = (
      <form>
        {formElsArray}
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    )
    if (this.state.loading) {
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

export default Name
