import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 4,
  cheese: 1,
  meat: 5,
}

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGRREDIENTS:
      return updateObject(state, {
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        totalPrice: 4,
        error: false,
      })
    case actionTypes.SET_INGRREDIENTS_FAILED:
      return updateObject(state, { error: true })
    case actionTypes.ADD_INGREDIENT:
      const updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      }
      const updatedIngredients = updateObject(
        state.ingredients,
        updatedIngredient,
      )
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      }
      return updateObject(state, updatedState)
    case actionTypes.REMOVE_INGREDIENT:
      const r_updatedIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
      }
      const r_updatedIngredients = updateObject(
        state.ingredients,
        r_updatedIngredient,
      )
      const r_updatedState = {
        ingredients: r_updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      }
      return updateObject(state, r_updatedState)
    default:
      return state
  }
}

export default reducer
