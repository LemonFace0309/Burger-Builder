import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Route } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
  // componentDidMount() {
  //   console.log(this.props)
  //   const query = new URLSearchParams(this.props.location.search)
  //   const ingredients = {}
  //   let price = 0
  //   for (let param of query.entries()) {
  //     if (param[0] === 'price') {
  //       price = param[1]
  //     } else {
  //       // ['meat', 1]
  //       ingredients[param[0]] = +param[1]
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, totalPrice: price })
  // }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          checkoutContinued={this.checkoutContinuedHandler}
          checkoutCancelled={this.checkoutCancelledHandler}
        />
        <Route
          path={this.props.match.url + '/contact-data'}
          component={ContactData}
          // render={(props) => (
          //   <ContactData
          //     ingredients={this.props.ingredients}
          //     totalPrice={this.props.totalPrice}
          //     {...props}
          //   />
          // )}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
  }
}

export default connect(mapStateToProps)(Checkout)
