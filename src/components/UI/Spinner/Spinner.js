import React from 'react';

import classes from './Spinner.module.css'

const spinner = (props) => {
    return (
        <div className={classes.Spinner}>Loading...</div>
        // Loading... is a fallback in base spinner isn't working
    )
};

export default spinner;