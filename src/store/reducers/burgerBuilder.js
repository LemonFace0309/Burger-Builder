import * as actionTypes from '../actions/actionTypes'

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
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
          // [] is an ES6 feature, ingredient[action.ingredientName] = state.ingredients[action.ingredientName] + 1 is the alternative
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
          // [] is an ES6 feature, ingredient[action.ingredientName] = state.ingredients[action.ingredientName] + 1 is the alternative
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      }
    case actionTypes.SET_INGRREDIENTS:
      return {
        ...state,
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        error: false,
      }
    case actionTypes.SET_INGRREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      }
    default:
      return state
  }
}

export default reducer
