import React, { Component } from 'react'

import axios from '../../../axios'
import classes from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'

class Name extends Component {
  state = {
    name: '',
    email: '',
    addres: {
      street: '',
      postalCode: '',
    },
    loading: false,
  }

  orderHandler = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      // do not sent price data like this in production. Calculate total price on server;
      // user may try to modify totalPrice before request is sent.
      customer: {
        name: 'Charles',
        address: {
          street: '123 Main St.',
          postalCode: 'M1V 1B2',
          country: 'Canada',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'UberEats',
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
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className={classes.Input}
          type="text"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Your Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="Postal Code"
          placeholder="Postal Code"
        />
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
