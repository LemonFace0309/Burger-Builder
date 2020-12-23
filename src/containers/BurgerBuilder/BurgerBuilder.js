import React, { Component } from 'react';

import axios from '../../axios'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 1,
    meat: 5,
    bacon: 4,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
    }

    updatePurchaseState(ingredients) {
        const totalIngredients = Object.keys(ingredients).reduce((acc, key) => {
            return acc + ingredients[key]
        }, 0)
        this.setState({ purchasable: totalIngredients > 0 })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients }
        updatedIngredients[type] = newCount
        const totalPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: totalPrice,
        })
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
            const newCount = oldCount - 1;
            const updatedIngredients = { ...this.state.ingredients }
            updatedIngredients[type] = newCount
            const totalPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: totalPrice,
            })
            this.updatePurchaseState(updatedIngredients);
        }
    };

    purchasingHandler = () => {
        this.setState({ purchasing: true, })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false, })
    }

    purchaseContinuedHandler = () => {
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            // do not sent price data like this in production. Calculate total price on server;
            // user may try to modify totalPrice before request is sent.
            customer: {
                name: 'Charles',
                address: {
                    street: '123 Main St.',
                    postalCode: 'M1V 1B2',
                    country: 'Canada',
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'UberEats',
        }
        axios.post('orders.json/', order)
            .then(res => {
                console.log(res)
                this.setState({loading: false, purchasing: false})
            })
            .catch(error => {
                console.log(error)
                this.setState({loading: false, purchasing: false})
            })
    }

    render() {
        const disabledInfo = { ...this.state.ingredients }
        for (let key in disabledInfo) {
            disabledInfo[key] = this.state.ingredients[key] <= 0;
        };

        let orderSummary = (
            <OrderSummary
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinuedHandler} />
        )
        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchasingHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;