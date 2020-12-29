import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  }
}

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGRREDIENTS,
    ingredients: ingredients,
  }
}

export const setIngredientsFailed = () => {
  return { type: actionTypes.SET_INGRREDIENTS_FAILED }
}

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get('ingredients.json')
      .then((res) => {
        dispatch(setIngredients(res.data))
      })
      .catch((error) => {
        dispatch(setIngredientsFailed())
      })
  }
}
