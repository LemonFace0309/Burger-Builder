import React, { useState } from 'react'
import { connect } from 'react-redux'

import classes from './Layout.module.css'
import Aux from '../Auxiliary/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const Layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false)
  

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false)
  }

  const sideDrawerToggleHandler = () => {
    // this.setState(
    //   (prevState) => ({ showSideDrawer: !prevState.showSideDrawer }),
    //   // function is asyncronous so needs prevState argument to avoid bugs
    // )
    setShowSideDrawer(!showSideDrawer)
  }

    return (
      <Aux>
        <Toolbar
          toggle={sideDrawerToggleHandler}
          isAuth={props.isAuth}
        />
        <SideDrawer
          open={showSideDrawer}
          closed={sideDrawerClosedHandler}
          isAuth={props.isAuth}
        />
        <main className={classes.Content}>{props.children}</main>
      </Aux>
    )

}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  }
}

export default connect(mapStateToProps)(Layout)
