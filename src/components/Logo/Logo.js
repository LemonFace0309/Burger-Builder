import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png'
// This allows webpack to handle the image with a special moedule (similar to css modules),
// optomizing it. burgerLogo will then refer to a string with the destination for the optomized image
import classes from './Logo.module.css'

const logo = (props) => {
    return (
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={burgerLogo} alt="MyBurger" />
        </div>
    )
};

export default logo;