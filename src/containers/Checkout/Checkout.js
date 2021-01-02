import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

const Checkout = props => {

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

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data')
  }

  const checkoutCancelledHandler = () => {
    props.history.goBack()
  }

    let summary = <Redirect to="/" />
    if (props.ingredients) { 
      const purchasedRedirect = props.purchased ? props.history.push('/') : null
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={props.ingredients}
            checkoutContinued={checkoutContinuedHandler}
            checkoutCancelled={checkoutCancelledHandler}
          />
          <Route
            path={props.match.url + '/contact-data'}
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
    return summary
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  }
}


export default withRouter(connect(mapStateToProps)(Checkout))
