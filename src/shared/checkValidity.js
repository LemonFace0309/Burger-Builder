const checkValidity = (value, rules) => {
  if (rules.required && value.trim() === '') {
    return false
  }

  if (rules.minLength && value.length < rules.minLength) {
    return false
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return false
  }

  const emailPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  if (rules.isEmail && !emailPattern.test(value)) {
    return false
  }

  const numericPatter = /^\d+$/
  if (rules.isNumeric && !numericPatter.test(value)) {
    return false
  }

  return true
}

export default checkValidity
