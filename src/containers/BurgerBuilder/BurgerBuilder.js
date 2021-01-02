import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionCreators from '../../store/actions/index'
import axios from '../../axios'


//export class BurgerBuilder extends Component
const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false)
  const {onInitIngredients} = props

  useEffect(() => {
    onInitIngredients()
  }, [onInitIngredients])

  const updatePurchaseState = () => {
    const totalIngredients = Object.keys(props.ingredients).reduce(
      (acc, key) => {
        return acc + props.ingredients[key]
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

  const purchasingHandler = () => {
    if (props.isAuth) {
      setPurchasing(true)
    } else {
      props.onSetAuthRedirectPath('/checkout')
      props.history.push('/auth')
    }
  }

  const purchaseCancelHandler = () => {
    setPurchasing(false)
  }

  const purchaseContinuedHandler = () => {
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
    props.onInitPurchased()
    props.history.push('/checkout')
  }

    const disabledInfo = { ...props.ingredients }
    for (let key in disabledInfo) {
      disabledInfo[key] = props.ingredients[key] <= 0
    }

    let orderSummary = null
    let burger = props.error ? (
      <p> Ingredients can't be loaded! </p>
    ) : (
      <Spinner style={{ marginTop: '100px' }} />
    )

    if (props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={props.ingredients} />
          <BuildControls
            price={props.totalPrice}
            ingredientAdded={props.onIngredientAdded}
            ingredientRemoved={props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={updatePurchaseState()}
            ordered={purchasingHandler}
            isAuth={props.isAuth}
          />
        </Aux>
      )
      orderSummary = (
        <OrderSummary
          ingredients={props.ingredients}
          totalPrice={props.totalPrice}
          purchaseCancelled={purchaseCancelHandler}
          purchaseContinued={purchaseContinuedHandler}
        />
      )
    }

    return (
      <Aux>
        <Modal
          show={purchasing}
          modalClosed={purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ing) => dispatch(actionCreators.addIngredient(ing)),
    onIngredientRemoved: (ing) =>
      dispatch(actionCreators.removeIngredient(ing)),
    onInitIngredients: () => dispatch(actionCreators.initIngredients()),
    onInitPurchased: () => dispatch(actionCreators.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(BurgerBuilder, axios))
