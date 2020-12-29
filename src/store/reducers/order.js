import * as actionTypes from '../actions/actionTypes'

const initialState = {
  order: [],
  loading: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      }
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        id: action.orderId,
        ...action.formData,
      }
      return {
        ...state,
        loading: false,
        orders: state.order.concat(newOrder),
      }
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default reducer
