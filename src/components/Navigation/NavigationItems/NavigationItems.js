import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const navigationitems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="#" active>Burger Builder</NavigationItem>
            <NavigationItem link="#">Checkout</NavigationItem>
        </ul>
    )
};

export default navigationitems;