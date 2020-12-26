import React from 'react'

import classes from './Input.module.css'

const input = (props) => {
  let el = null

  switch (props.elType) {
    case 'input':
      el = (
        <input
          className={classes.InputEl}
          {...props.elConfig}
          value={props.value}
        />
      )
      break
    case 'textarea':
      el = (
        <textarea
          className={classes.InputEl}
          {...props.elConfig}
          value={props.value}
        />
      )
      break
    default:
      el = (
        <input
          className={classes.InputEl}
          {...props.elConfig}
          value={props.value}
        />
      )
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {el}
    </div>
  )
}

export default input
