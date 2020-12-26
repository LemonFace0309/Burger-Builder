import React, { Component } from 'react'

import axios from '../../axios'
import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  }

  componentDidMount() {
    axios
      .get('/orders.json')
      .then((res) => {
        const fetchedData = []
        for (let key in res.data) {
          fetchedData.push({
            ...res.data[key],
            id: key,
          })
        }
        this.setState({ loading: false, orders: fetchedData })
        console.log(this.state.orders)
      })
      .catch((err) => {})
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order) => {
          return (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          )
        })}
      </div>
    )
  }
}

export default withErrorHandler(Orders, axios)
