import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import * as actionCreators from '../../../store/actions/index'

const Logout = (props) => {
  useEffect(() => {
    props.onLogout()
  }, [])

  return <Redirect to="/" />
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actionCreators.logout()),
  }
}

export default connect(null, mapDispatchToProps)(Logout)
