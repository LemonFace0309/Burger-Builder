import * as actionTypes from './actionTypes'
import axios from '../../axios'

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  }
}

export const purchaseBurgerSuccess = (id, formData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    formData: formData,
  }
}

export const purchaseBurgerFail = (err) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: err,
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  }
}

export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart())
    axios
      .post('orders.json/', orderData)
      .then((res) => {
        console.log(res)
        dispatch(purchaseBurgerSuccess(res.data.name, orderData))
      })
      .catch((err) => {
        console.log(err)
        dispatch(purchaseBurgerFail(err))
      })
  }
}