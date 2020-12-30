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

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart())
    axios
      .post('/orders.json?auth=' + token, orderData)
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

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  }
}

export const fetchOrdersFail = (err) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: err,
  }
}

export const fetchOrdersStart = () => {
  return { type: actionTypes.FETCH_ORDERS_START }
}

export const fetchOrders = (token) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart())
    axios
      .get('/orders.json?auth=' + token)
      .then((res) => {
        const fetchedData = []
        for (let key in res.data) {
          fetchedData.push({
            ...res.data[key],
            id: key,
          })
        }
        dispatch(fetchOrdersSuccess(fetchedData))
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err))
      })
  }
}
