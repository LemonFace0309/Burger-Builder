import React, { Component } from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as burgerBuilderActionCreators from '../../store/actions/index'
import axios from '../../axios'

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  }

  componentDidMount() {
    this.props.onInitIngredients()
  }

  updatePurchaseState = () => {
    const totalIngredients = Object.keys(this.props.ingredients).reduce(
      (acc, key) => {
        return acc + this.props.ingredients[key]
      },
      0,
    )
    return totalIngredients > 0
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type]
  //   const newCount = oldCount + 1
  //   const updatedIngredients = { ...this.state.ingredients }
  //   updatedIngredients[type] = newCount
  //   const totalPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: totalPrice,
  //   })
  //   this.updatePurchaseState(updatedIngredients)
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type]
  //   if (oldCount > 0) {
  //     const newCount = oldCount - 1
  //     const updatedIngredients = { ...this.state.ingredients }
  //     updatedIngredients[type] = newCount
  //     const totalPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
  //     this.setState({
  //       ingredients: updatedIngredients,
  //       totalPrice: totalPrice,
  //     })
  //     this.updatePurchaseState(updatedIngredients)
  //   }
  // }

  purchasingHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinuedHandler = () => {
    // const queryParams = []
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) +
    //       '=' +
    //       encodeURIComponent(this.state.ingredients[i]),
    //   )
    // }
    // queryParams.push('price=' + this.state.totalPrice)
    // const queryString = queryParams.join('&')
    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: '?' + queryString,
    // })
    this.props.history.push('/checkout')
  }

  render() {
    const disabledInfo = { ...this.props.ingredients }
    for (let key in disabledInfo) {
      disabledInfo[key] = this.props.ingredients[key] <= 0
    }

    let orderSummary = null
    let burger = this.props.error ? (
      <p> Ingredients can't be loaded! </p>
    ) : (
      <Spinner style={{ marginTop: '100px' }} />
    )

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            price={this.props.totalPrice}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState()}
            ordered={this.purchasingHandler}
          />
        </Aux>
      )
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          totalPrice={this.props.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinuedHandler}
        />
      )
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    error: state.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ing) =>
      dispatch(burgerBuilderActionCreators.addIngredient(ing)),
    onIngredientRemoved: (ing) =>
      dispatch(burgerBuilderActionCreators.removeIngredient(ing)),
    onInitIngredients: () => dispatch(burgerBuilderActionCreators.initIngredients())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axios))
