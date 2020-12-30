import React, { Component } from 'react'
import { connect } from 'react-redux'

import classes from './Layout.module.css'
import Aux from '../Auxiliary/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state = {
    showSideDrawer: false,
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false })
  }

  sideDrawerToggleHandler = () => {
    this.setState(
      (prevState) => ({ showSideDrawer: !prevState.showSideDrawer }),
      // function is asyncronous so needs prevState argument to avoid bugs
    )
  }

  render() {
    return (
      <Aux>
        <Toolbar
          toggle={this.sideDrawerToggleHandler}
          isAuth={this.props.isAuth}
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          isAuth={this.props.isAuth}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  }
}

export default connect(mapStateToProps)(Layout)
