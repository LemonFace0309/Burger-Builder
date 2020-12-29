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

const setIngredients = (state, action) => {
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
}

const setIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true })
}

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  }
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
  }
  return updateObject(state, updatedState)
}

const removeIngredient = (state, action) => {
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
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INGRREDIENTS:
      return setIngredients(state, action)
    case actionTypes.SET_INGRREDIENTS_FAILED:
      return setIngredientsFailed(state, action)
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action)
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action)
    default:
      return state
  }
}

export default reducer
