import React from 'react'

import classes from './Order.module.css'

const order = (props) => {
  const ingredients = Object.keys(props.ingredients).map((key) => {
    return (
      <span
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 5px',
          border: '1px solid #ccc',
          padding: '5px',
        }}
      >
        {' '}
        {key + ' (' + props.ingredients[key] + ')'}{' '}
      </span>
    )
  })

  return (
    <div className={classes.Order}>
      <p>
        Ingredients: <strong>{ingredients}</strong>
      </p>
      <p>
        Price: <strong>CAD${Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  )
}

export default order
