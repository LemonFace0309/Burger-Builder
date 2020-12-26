import React from 'react'

import classes from './Input.module.css'

const input = (props) => {
  let el = null
  let validationError = null
  const inputClasses = [classes.InputEl]

  if (props.invalid && props.touched) {
    inputClasses.push(classes.Invalid)
    validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>
  }

  switch (props.elType) {
    case 'input':
      el = (
        <input
          className={inputClasses.join(' ')}
          {...props.elConfig}
          value={props.value}
          onChange={props.changed}
        />
      )
      break
    case 'textarea':
      el = (
        <textarea
          className={inputClasses.join(' ')}
          {...props.elConfig}
          value={props.value}
          onChange={props.changed}
        />
      )
      break
    case 'select':
      el = (
        <select
          className={inputClasses.join(' ')}
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
          className={inputClasses.join(' ')}
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
      {validationError}
    </div>
  )
}

export default input
