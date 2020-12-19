import React from 'react';

import Aux from '../../../hoc/Auxiliary'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(key => (
            <li key={key}>
                <span style={{textTransform: 'capitalize'}}>{key}</span>: {props.ingredients[key]}
            </li>
        ))

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the folloinw ginredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    )
};

export default orderSummary;