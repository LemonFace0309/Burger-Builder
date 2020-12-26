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
          onChange={props.changed}
        />
      )
      break
    case 'textarea':
      el = (
        <textarea
          className={classes.InputEl}
          {...props.elConfig}
          value={props.value}
          onChange={props.changed}
        />
      )
      break
    case 'select':
      el = (
        <select
          className={classes.InputEl}
          value={props.value}
          onChange={props.changed}
        >
          {props.elConfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            )
          })}
        </select>
      )
      break
    default:
      el = (
        <input
          className={classes.InputEl}
          {...props.elConfig}
          value={props.value}
          onChange={props.changed}
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
