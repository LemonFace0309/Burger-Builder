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
        dispatch(purchaseBurgerSuccess(res.data.name, orderData))
      })
      .catch((err) => {
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

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchOrdersStart())
    const queryParam = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
    axios
      .get('/orders.json' + queryParam)
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
