import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

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

  const ingredients = useSelector(state => state.burgerBuilder.ingredients)
  const totalPrice = useSelector(state => state.burgerBuilder.totalPrice)
  const error = useSelector(state => state.burgerBuilder.error)
  const isAuth = useSelector(state => state.auth.token !== null)

  const dispatch = useDispatch()

  const onIngredientAdded = (ing) => dispatch(actionCreators.addIngredient(ing))
  const onIngredientRemoved =  (ing) => dispatch(actionCreators.removeIngredient(ing))
  const onInitIngredients = useCallback(() => dispatch(actionCreators.initIngredients()), [dispatch])
  const onInitPurchased = () => dispatch(actionCreators.purchaseInit())
  const onSetAuthRedirectPath = (path) => dispatch(actionCreators.setAuthRedirectPath(path))

  useEffect(() => {
    onInitIngredients()
  }, [onInitIngredients])

  const updatePurchaseState = () => {
    const totalIngredients = Object.keys(ingredients).reduce(
      (acc, key) => {
        return acc + ingredients[key]
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
    if (isAuth) {
      setPurchasing(true)
    } else {
      onSetAuthRedirectPath('/checkout')
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
    onInitPurchased()
    props.history.push('/checkout')
  }

    const disabledInfo = { ...ingredients }
    for (let key in disabledInfo) {
      disabledInfo[key] = ingredients[key] <= 0
    }

    let orderSummary = null
    let burger = error ? (
      <p> Ingredients can't be loaded! </p>
    ) : (
      <Spinner style={{ marginTop: '100px' }} />
    )

    if (ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={ingredients} />
          <BuildControls
            price={totalPrice}
            ingredientAdded={onIngredientAdded}
            ingredientRemoved={onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={updatePurchaseState()}
            ordered={purchasingHandler}
            isAuth={isAuth}
          />
        </Aux>
      )
      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          totalPrice={totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios)

