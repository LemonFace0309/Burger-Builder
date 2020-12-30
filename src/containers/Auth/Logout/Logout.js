import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import * as actionCreators from '../../../store/actions/index'

class Logout extends Component {
  componentDidMount () {
    this.props.onLogout();

  }
  
  render () {
    return <Redirect to="/" />
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actionCreators.logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout)