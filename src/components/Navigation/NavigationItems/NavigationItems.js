import React from 'react'

import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const navigationitems = (props) => {
  let authNavItems = <NavigationItem link="/auth">Login</NavigationItem>
  if (props.isAuth) {
    authNavItems = (
      <>
      <NavigationItem link="/orders">Orders</NavigationItem>
      <NavigationItem link="/logout">Logout</NavigationItem>
      </>
    )
  }
  
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      {authNavItems}
    </ul>
  )
}

export default navigationitems
